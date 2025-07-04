import { HttpHeaders, HttpParams } from "@angular/common/http";
import { WritableSignal } from "@angular/core";
import { FormGroup } from "@angular/forms";

export interface RouteDefinition<T = any> {
  url: `${string}`;
  method: 'GET' | 'PUT' | 'POST' | 'PATCH' | 'DELETE';
  data: T
}

export interface CommonConfig {
  forms: Record<string, FormGroup>;
  routes: Record<string, RouteDefinition>;
  baseState?: BaseState<any>;
}

export type CommonParams<T extends CommonConfig> = {
  [K in keyof T]: T[K];
};

export interface options {
  body?: any;
  queryParams?: HttpParams | { [param: string]: string | number | boolean };
  pathParams?: Record<string, string | number | boolean>;
  headers?: HttpHeaders | { [header: string]: string | string[] };
  responseType?: 'json';
  withCredentials?: boolean;
  context?: any;
}

export interface BaseState<T> {
  details: WritableSignal<State<T>>;
  loading: WritableSignal<boolean>;
  paginator: WritableSignal<PaginatorParams>;
}

interface State<T> {
  data: T[],
  buffer: Record<string, T>,
}

interface Paginator{
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
  name: string,
  email: string,
  password: string,
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
        queryParams: {
          [key: string]: {
            defaultValue: string | number | boolean;
            filterType: 'term' | 'select' | 'paginator';
          };
        };
      };
    }
  | {
      method: 'POST';
      url: string;
      filters?: {
        body: {
          [key: string]: {
            defaultValue: string | number | boolean;
            filterType: 'term' | 'select' | 'paginator';
          };
        };
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


