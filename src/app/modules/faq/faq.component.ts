import { Component } from '@angular/core';
import { ModulesSection } from '../layout/modules.section.component';
import { AccordionModule } from 'primeng/accordion';

@Component({
  selector: 'app-faq',
  imports: [ModulesSection, AccordionModule],
  template: `
    <section class="flex flex-col gap-4">
      <app-section class="text-center">
        <h1 class="font-bold">Preguntas frecuentes</h1>
        <p>
          Aqui podras revisar varias de nuestras preguntas mas frecuentes las
          cuales se nos realizan sobre todos nuestros productos, marca, y
          quienes somos.
        </p>
      </app-section>
      <app-section>
        <p-accordion value="0">
          <p-accordion-panel value="0">
            <p-accordion-header>
              ¿Usan ingredientes naturales?
            </p-accordion-header>
            <p-accordion-content>
              <p class="m-0">
                Sí, en nuestra panadería utilizamos ingredientes 100% naturales
                y frescos. No usamos conservadores ni saborizantes artificiales.
                Nuestra prioridad es ofrecerte un pan saludable y delicioso.
              </p>
            </p-accordion-content>
          </p-accordion-panel>

          <p-accordion-panel value="1">
            <p-accordion-header>
              ¿Tienen opciones sin gluten?
            </p-accordion-header>
            <p-accordion-content>
              <p class="m-0">
                Actualmente ofrecemos algunas opciones sin gluten bajo pedido.
                Aunque tomamos precauciones, nuestras instalaciones no están
                certificadas como libres de gluten, por lo que podrían existir
                trazas.
              </p>
            </p-accordion-content>
          </p-accordion-panel>

          <p-accordion-panel value="2">
            <p-accordion-header>
              ¿Hacen entregas a domicilio?
            </p-accordion-header>
            <p-accordion-content>
              <p class="m-0">
                Sí, contamos con servicio de entrega a domicilio en zonas
                seleccionadas. Puedes hacer tu pedido por teléfono, WhatsApp o
                directamente en nuestra página web.
              </p>
            </p-accordion-content>
          </p-accordion-panel>

          <p-accordion-panel value="3">
            <p-accordion-header>
              ¿A qué hora abren y cierran?
            </p-accordion-header>
            <p-accordion-content>
              <p class="m-0">
                Nuestro horario es de lunes a sábado de 7:00 am a 8:00 pm, y los
                domingos de 8:00 am a 2:00 pm. Horarios especiales pueden
                aplicar en días festivos.
              </p>
            </p-accordion-content>
          </p-accordion-panel>

          <p-accordion-panel value="4">
            <p-accordion-header>
              ¿Ofrecen pasteles personalizados?
            </p-accordion-header>
            <p-accordion-content>
              <p class="m-0">
                ¡Claro! Podemos hacer pasteles personalizados para cumpleaños,
                eventos y celebraciones especiales. Solo necesitamos al menos 48
                horas de anticipación para coordinar todos los detalles.
              </p>
            </p-accordion-content>
          </p-accordion-panel>
        </p-accordion>
      </app-section>
    </section>
  `,
})
export class FaqComponent {}
