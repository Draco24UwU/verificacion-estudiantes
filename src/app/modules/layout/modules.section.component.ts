import { Component, input } from '@angular/core';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-section',
  imports: [CardModule],
  template: `
    <p-card>
      <section>
        <ng-content />
      </section>
    </p-card>
  `,
})
export class ModulesSection {
  public readonly $header = input('', { alias: 'header' });
}
