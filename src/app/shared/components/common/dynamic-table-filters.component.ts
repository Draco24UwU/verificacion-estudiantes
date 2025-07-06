import { Component, computed, inject, input, OnInit } from '@angular/core';
import { DynamicTableService } from './services/dynamic-table.service';
import { ReactiveFormsModule } from '@angular/forms';
import { RouteDefinitionDynamicTable } from '../../types/common';
import { CommonModule } from '@angular/common';

@Component({
  imports: [ReactiveFormsModule, CommonModule],
  selector: 'app-dynamic-table-filters',
  template: ` <ng-container>
    @if (_DynamicTableService.filterForm) {
      <form [formGroup]="_DynamicTableService.filterForm">
        @for (filter of $filters(); track $index) {
          @let key = filter[0];
          @let value = filter[1];
          @switch (value.filterType) {
            @case ('term') {
              <section class="flex items-stretch justify-start gap-2 p-4">
                <fieldset>
                  <legend>Buscador</legend>
                  <input
                    (keydown.enter)="callTermSearch(key)"
                    [formControlName]="key"
                    type="search"
                    class="bg-white text-black rounded-lg p-1"
                  />
                </fieldset>
                <div class="flex items-end justify-between gap-2">
                  <button
                    type="button"
                    (click)="callTermSearch(key)"
                    class="cursor-pointer bg-blue-500 hover:bg-blue-600 active:opacity-75 transition-all duration-200 ease-in-out px-2.5 py-1 rounded-xl text-lg"
                  >
                    <i class="fa-solid fa-magnifying-glass"></i>
                  </button>
                  <button
                    type="button"
                    (click)="clearTearmSearch(key)"
                    class="cursor-pointer bg-red-500 hover:bg-red-600 active:opacity-75 transition-all duration-200 ease-in-out px-2.5 py-1 rounded-xl text-lg"
                    id="clearBtn"
                  >
                    <i class="fa-solid fa-x"></i>
                  </button>
                </div>
              </section>
            }
          }
        }
        fieldset
      </form>
    }
  </ng-container>`,
})
export class DynamicTableFiltersComponent implements OnInit {
  // * Inyecciones de dependencias.
  public readonly _DynamicTableService = inject(DynamicTableService);

  // * Atributos del componente.
  public $routeDefinition = input.required<RouteDefinitionDynamicTable>({
    alias: 'routeDefinition',
  });
  public $filters = computed(() => {
    const filters = this.$routeDefinition().filters;
    if (!filters) return [];
    if (this.$routeDefinition().method === 'GET' && 'queryParams' in filters) {
      return Object.entries(filters.queryParams || {});
    } else if (this.$routeDefinition().method === 'POST' && 'body' in filters) {
      return Object.entries(filters.body || {});
    }
    return [];
  });

  ngOnInit(): void {
    console.log(this.$routeDefinition());

    this._DynamicTableService.filterForm?.valueChanges.subscribe((v) =>
      console.log(v)
    );
  }

  // * Metodos del componente.
  public callTermSearch(key: string) {
    const control = this._DynamicTableService.filterForm?.controls[key]!;
    if (control.value) {
      this._DynamicTableService.callPaginator();
    }
  }
  public clearTearmSearch(key: string) {
    const control = this._DynamicTableService.filterForm?.controls[key]!;
    if (control.value === '') return;
    control.setValue('');
    this._DynamicTableService.callPaginator();
  }
}
