import { FormBuilder } from '@angular/forms';
import { CommonConfig, Route } from './common';

const fb = new FormBuilder();

export const ColorsCommonConfig = {
  forms: { '': fb.group({}) },
  routes: {
    test: Route<string[]>({ url: '/xd', method: 'POST' }),
  },
} satisfies CommonConfig;
