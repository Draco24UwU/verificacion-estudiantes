import { HttpHeaders, HttpParams } from '@angular/common/http';
import { WritableSignal } from '@angular/core';
import { FormGroup } from '@angular/forms';

export class RouteDefinition<T> {
  private readonly _brand = 'RouteDefinition';
  constructor(
    public url: string,
    public method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
    public data: T,
  ) {}
}

// Función helper para crear rutas con tipo seguro
export function Route<T>(definition: {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
}): RouteDefinition<T> {
  return new RouteDefinition(definition.url, definition.method, {} as T);
}

export interface CommonConfig {
  forms: Record<string, FormGroup>;
  routes: Record<string, RouteDefinition<any>>;
  baseState?: BaseState<any>;
}

export interface options {
  body?: any;
  queryParams?: HttpParams | Record<string, string | number | boolean>;
  pathParams?: Record<string, string | number | boolean>;
  headers?: HttpHeaders | Record<string, string | string[]>;
  responseType?: 'json';
  withCredentials?: boolean;
  context?: any;
}

export type CommonParams<T extends CommonConfig> = {
  [K in keyof T]: T[K];
};

export interface BaseState<T> {
  details: WritableSignal<State<T>>;
  loading: WritableSignal<boolean>;
  paginator: WritableSignal<PaginatorParams>;
}

interface State<T> {
  data: T[];
  buffer: Record<string, T>;
}

interface Paginator {
  totalRecords: number;
  first: number;
  rows: number;
  page: number;
}

interface PaginatorParams {
  first: number;
  rows: number;
  totalRecords: number;
  page: number;
}

export interface User {
  name: string;
  email: string;
  password: string;
}

// * Dynamic Table Interface.

export interface DynamicTableConfig<N> {
  route: RouteDefinitionDynamicTable;
  columns: DynamicTableColumn<keyof N>[];
  actions?: DynamicTableAction<N>[];
}

export type RouteDefinitionDynamicTable =
  | {
      method: 'GET';
      url: string;
      filters?: {
        queryParams: Record<
          string,
          {
            defaultValue: string | number | boolean;
            filterType: 'term' | 'select' | 'paginator';
          }
        >;
      };
    }
  | {
      method: 'POST';
      url: string;
      filters?: {
        body: Record<
          string,
          {
            defaultValue: string | number | boolean;
            filterType: 'term' | 'select' | 'paginator';
          }
        >;
      };
    };

interface DynamicTableAction<T> {
  name: string;
  icon: string;
  callback: (data: T) => void;
  disabled?: (data: T) => boolean;
}

interface DynamicTableColumn<T> {
  field: T;
  header: string;
  type: 'text' | 'number' | 'date' | 'boolean' | 'currency' | 'percentage';
  sortable?: boolean;
  filterable?: boolean;
}
