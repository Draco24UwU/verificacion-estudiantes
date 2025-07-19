import { Component, input } from '@angular/core';
import { ButtonModule } from 'primeng/button';

export interface ButtonData {
  method: () => void;
  label?: string;
  icon?: string;
}

@Component({
  selector: 'app-buttons',
  imports: [ButtonModule],
  template: ` <ng-container>
    <section class="w-full flex items-center justify-end gap-4">
      @if ($onReject()?.method) {
        <p-button
          [label]="$onReject()?.label || 'Rechazar'"
          [icon]="$onReject()?.icon || ''"
          severity="secondary"
          class="hover:scale-105 transition-all duration-200 ease-in-out"
          rounded="true"
          (onClick)="$onReject()!.method()"
        />
      }
      <p-button
        [label]="$onConfirm().label || 'Confirmar'"
        [icon]="$onConfirm().icon || ''"
        severity="contrast"
        class="hover:scale-105 transition-all duration-200 ease-in-out active:opacity-75"
        rounded="true"
        (onClick)="$onConfirm().method()"
      />
    </section>
  </ng-container>`,
})
export class ButtonsComponent {
  public readonly $onConfirm = input.required<ButtonData>({
    alias: 'onConfirm',
  });
  public readonly $onReject = input<ButtonData | null>(null, {
    alias: 'onReject',
  });
}
