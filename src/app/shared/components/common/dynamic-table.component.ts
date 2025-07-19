import {
  Component,
  computed,
  effect,
  inject,
  input,
  OnInit,
} from '@angular/core';
import { DynamicTableConfig } from '../../types/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { CommonModule } from '@angular/common';
import { DynamicTableService } from './services/dynamic-table.service';
import { DynamicTableFiltersComponent } from './dynamic-table-filters.component';

@Component({
  selector: 'app-dynamic-table',
  providers: [DynamicTableService],
  imports: [
    TableModule,
    ButtonModule,
    PaginatorModule,
    CommonModule,
    DynamicTableFiltersComponent,
  ],
  template: `
    @let tableConfig = $tableConfig(); @let paginator = $paginator();
    @let data = $data();
    <ng-container *ngIf="tableConfig">
      <app-dynamic-table-filters [routeDefinition]="tableConfig.route" />
      <p-table [value]="data">
        <ng-template #header>
          <tr>
            @for (column of tableConfig.columns; track $index) {
              <th>{{ column.header }}</th>
            }
            <th *ngIf="tableConfig.actions">Acciones</th>
          </tr>
        </ng-template>
        <ng-template #body let-element>
          <tr>
            @for (column of tableConfig.columns; track $index) {
              <td>{{ element[column.field] }}</td>
            }
            <td
              *ngIf="tableConfig.actions"
              class="flex items-center justify-start gap-2"
            >
              @for (action of tableConfig.actions; track $index) {
                <p-button
                  [icon]="action.icon"
                  (click)="
                    _DynamicTableService.actionTable(action.callback, element)
                  "
                  [disabled]="action.disabled?.(element) ?? false"
                />
              }
            </td>
          </tr>
        </ng-template>
      </p-table>
      <p-paginator
        [rows]="10"
        [rowsPerPageOptions]="[10, 20, 30]"
        [totalRecords]="paginator.totalRecords * paginator.rows"
        (onPageChange)="_DynamicTableService.onPageChange($event)"
      />
    </ng-container>
  `,
})
export class DynamicTableComponent<T> implements OnInit {
  // * Inyecciones de dependencias.
  public readonly _DynamicTableService = inject(DynamicTableService);

  // * Atributos del componente.
  public readonly $tableConfig = input.required<DynamicTableConfig<T>>({
    alias: 'tableConfig',
  });
  public $data = computed(
    () => this._DynamicTableService.baseState.details().data,
  );
  public $loading = computed(() =>
    this._DynamicTableService.baseState.loading(),
  );
  public $paginator = computed(() =>
    this._DynamicTableService.baseState.paginator(),
  );

  // constructor() {
  //   this.$tableConfig().route.
  // }
  // * Metodos del componente.
  ngOnInit(): void {
    this._DynamicTableService.initializeTable(this.$tableConfig());
  }
}
