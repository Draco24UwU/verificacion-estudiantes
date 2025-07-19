import { Component, inject } from '@angular/core';
import { ColorsService } from '../../shared/services/colors.service';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { color } from '../../shared/services/colors.service';

@Component({
  selector: 'app-about-use',
  imports: [ButtonModule, CommonModule],
  template: `
    <section class="flex flex-wrap">
      @for (
        color of _colorsService.colors.data;
        track trackById($index, color)
      ) {
        <div
          class="w-20 h-20 flex items-center justify-center opacity-0 fade-in-up"
          [style.background-color]="color.hex"
          [style.animationDelay]="$index * 50 + 'ms'"
        >
          {{ color.hex }}
        </div>
      }
      <p-button
        (onClick)="_colorsService.generateColors('warm', 10)"
        label="Generar"
      />
    </section>
  `,
  styles: [
    `
      @layer utilities {
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .fade-in-up {
          animation: fade-in-up 0.4s ease forwards;
        }
      }
    `,
  ],
})
export class AboutUseComponent {
  public readonly _colorsService = inject(ColorsService);

  trackById(index: number, color: color): string {
    return color.hex; // Identificador único por color
  }
}
