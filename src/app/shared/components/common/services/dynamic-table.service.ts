import { effect, inject, Injectable, signal } from '@angular/core';
import { BaseState, DynamicTableConfig, RouteDefinition, RouteDefinitionDynamicTable } from '../../../types/common';
import { DynamicTable } from '../../../interfaces/dynamic-table';
import { PaginatorState } from 'primeng/paginator';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';


@Injectable()
export class DynamicTableService<T> implements DynamicTable<T> {
  // * Inyeccion de dependencias.
  private readonly _http = inject(HttpClient);
  private readonly _fb = inject(FormBuilder);

  // * Atributos del componente.
  private $route = signal<RouteDefinitionDynamicTable | null>(null);
  private $filterForm = signal<FormGroup | null>(null);
  private $baseState = signal<BaseState<T>>({
    details: signal({ data: [], buffer: {} }),
    loading: signal(false),
    paginator: signal({
      first: 0,
      rows: 10,
      totalRecords: 0,
      page: 0,
    }),
  });

  constructor() {
    effect(() => {
      const form = this.filterForm;
    });
  }

  async initializeTable(config: DynamicTableConfig<T>) {
    // * 1- Se asigna la configuracion de la ruta.
    this.route = config.route;
    // * 2- Se asigna el formulario de filtros.
    this.initializeFilterForm();
    // * 3- Se llama al paginador.
    this.callPaginator();
  }

  onPageChange(event: PaginatorState): void {
    console.log('onPageChange', event);

    this.baseState.paginator.update((prev) => {
      return {
        ...prev,
        page: event.page!,
        per_page: event.rows!,
      };
    });

    this.callPaginator();
  }

  actionTable(action: Function, data: T): void {
    action(data);
  }

  async callPaginator() {
    const state = this.baseState;
    const route = this.route;
    if (!state || !route) return;

    this.baseState.loading.set(true);

    const paginatorParams = state.paginator();
    const params = new URLSearchParams();
    Object.entries(paginatorParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.set(key, value.toString());
      }
    });

    if (route.method === 'GET') {
      const data = await firstValueFrom(
        this._http.get<T[]>(route.url, {
          params: this.filterForm?.value,
        })
      );
      this.baseState.details.set({ data, buffer: {} });
    } else if (route.method === 'POST') {
      const data = await firstValueFrom(
        this._http.post<T[]>(route.url, {
          params: this.filterForm?.value,
        })
      );
      this.baseState.details.set({ data, buffer: {} });
    }
    this.baseState.loading.set(false);
  }

  public initializeFilterForm() {
    const route = this.route;
    if (!route || !route.filters) {
      this.filterForm = null;
      return;
    }
    const formGroupConfig: Record<string, any> = {};

    if(route.method === 'GET'){
      Object.entries(route.filters.queryParams).forEach(([key, value]) => {
        formGroupConfig[key] = [value.defaultValue];
      });
    }else{
      Object.entries(route.filters.body).forEach(([key, value]) => {
        formGroupConfig[key] = [value.defaultValue];
      });
    }

    this.filterForm = this._fb.group(formGroupConfig);
    console.log('Filter Form Initialized:', this.filterForm);
  }


  // * Getters y Setters.
  get baseState() {
    return this.$baseState();
  }
  set baseState(state: BaseState<T>) {
    this.$baseState.set(state);
  }
  get route() {
    return this.$route();
  }
  set route(route: RouteDefinitionDynamicTable | null) {
    this.$route.set(route);
  }
  get filterForm() {
    return this.$filterForm();
  }
  set filterForm(form: FormGroup | null) {
    this.$filterForm.set(form);
  }
}
