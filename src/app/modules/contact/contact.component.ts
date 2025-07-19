import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule, InputTextModule, ButtonModule],
  template: `
    <section
      class="w-full flex sm:flex-row flex-col items-center justify-center gap-4 bg-bread-800 rounded-2xl p-4"
    >
      <div class="flex-2">
        <h1 class="font-bold">
          Tienes dudas o preguntas con algo? Contactanos!
        </h1>
        <p>
          Tus dudas y sugerencias son muy apreciadas contamos con servicio todos
          los dias de 9am a 8pm.
        </p>
      </div>
      <form
        [formGroup]="form"
        class="bg-bread-100 rounded-2xl p-4 text-black flex-1"
      >
        <fieldset>
          <legend>Nombre</legend>
          <input
            pInputText
            type="text"
            class="w-full bg-bread-50! text-black!"
          />
        </fieldset>
        <fieldset>
          <legend>Email</legend>
          <input
            pInputText
            type="text"
            class="w-full bg-bread-50! text-black!"
          />
        </fieldset>
        <fieldset>
          <legend>Numero</legend>
          <input
            pInputText
            type="text"
            class="w-full bg-bread-50! text-black!"
          />
        </fieldset>
        <fieldset>
          <legend>Mensaje</legend>
          <textarea
            pInputText
            [rows]="5"
            class="w-full bg-bread-50! text-black!"
          ></textarea>
        </fieldset>
        <fieldset class="w-full flex items-center justify-end">
          <button pButton severity="secondary">Enviar</button>
        </fieldset>
      </form>
    </section>
  `,
})
export class ContactComponent {
  private readonly _fb = inject(FormBuilder);

  public form = this._fb.group({
    nombre: [],
    email: [],
    numero: [],
    mensaje: [],
  });
}
