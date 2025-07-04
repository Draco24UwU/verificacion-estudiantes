import { PaginatorState } from "primeng/paginator";
import { DynamicTableConfig } from "../types/common";

export abstract class DynamicTable<T> {
  // * Metodos abstractos del componente.
  abstract initializeTable(config: DynamicTableConfig<T>): Promise<void>;
  abstract onPageChange(event: PaginatorState): void;
  abstract actionTable(action: Function, data: T): void;
  abstract callPaginator(): void;
}
