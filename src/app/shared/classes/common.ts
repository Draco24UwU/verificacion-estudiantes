import { HttpClient } from '@angular/common/http';
import { inject, Signal, signal } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { CommonConfig, options, RouteDefinition } from '../types/common';
import { firstValueFrom } from 'rxjs';

export abstract class Common<T extends CommonConfig> {
  // * Inyeccion de dependencias.
  private readonly _http = inject(HttpClient);
  protected readonly _fb = inject(FormBuilder);

  // * Atributos del componente.
  private $routes = signal<T['routes']>({});
  private $forms = signal<T['forms']>({});
  private $baseState = signal<T['baseState']>({
    details: signal({ data: [], buffer: {} }),
    loading: signal(false),
    paginator: signal({
      first: 0,
      rows: 10,
      totalRecords: 0,
      page: 0,
    }),
  });

  constructor(config: T) {
    this.routes = config.routes;
    this.forms = config.forms;
    this.baseState = config.baseState || this.$baseState();
  }

  // * Metodos de la clase common.
  protected APIrequest<K extends keyof T['routes']>(
    routeKey: K,
    options?: options
  ): Promise<T['routes'][K]['data']> {
    const { method, url: baseUrl } = this.routes[routeKey];

    //* Procesar pathParams
    const url = options?.pathParams
      ? Object.entries(options.pathParams).reduce(
          (url, [key, value]) =>
            url.replace(`/:${key}`, `/${encodeURIComponent(value)}`),
          baseUrl
        )
      : baseUrl;

    //* Configurar opciones de la petición
    const httpOptions = {
      ...options,
      ...(options?.queryParams && { params: options.queryParams }),
      ...(options?.body && { body: options.body }),
    };

    const response = firstValueFrom(
      this._http.request(method, url, httpOptions)
    );

    return response as T['routes'][K]['data'];
  }

  protected getForm<K extends keyof T['forms']>(formName: K) {
    const formGroup = this.forms[formName] as FormGroup;

    //* Tipos derivados dinámicamente:
    //* - FormType representa el tipo del formulario específico (por ejemplo, FormGroup<{...}>)
    //* - ControlNames representa las llaves de los controles del formulario (por ejemplo, 'nombre' | 'email')
    type FormType = T['forms'][K];
    type ControlNames = keyof FormType['controls'];

    //* Creamos un objeto con cada control del formulario junto a su nombre
    const controlsMap: Record<
      ControlNames,
      { value: ControlNames; control: AbstractControl }
    > = Object.keys(formGroup.controls).reduce(
      (acc, key) => {
        const controlName = key as ControlNames;
        acc[controlName] = {
          value: controlName,
          control: formGroup.controls[key],
        };
        return acc;
      },
      {} as Record<
        ControlNames,
        { value: ControlNames; control: AbstractControl }
      >
    );

    //* Retornamos el formulario y el mapa de controles
    return {
      form: formGroup,
      keys: controlsMap,
    };
  }

  protected getRoute(route: keyof T['routes']) {
    return this.routes[route];
  }

  // * Getters y Setters de la clase.
  get routes(): T['routes'] {
    return this.$routes();
  }
  set routes(routes: T['routes']) {
    this.$routes.set(routes);
  }
  get forms(): T['forms'] {
    return this.$forms();
  }
  set forms(forms: T['forms']) {
    this.$forms.set(forms);
  }
  get baseState(): T['baseState'] {
    return this.$baseState();
  }
  set baseState(baseState: T['baseState']) {
    this.$baseState.set(baseState);
  }
}
