import { Rule, chain, apply, url, move, mergeWith, applyTemplates, filter, noop } from '@angular-devkit/schematics';
import { strings } from '@angular-devkit/core';
import { WordpressService } from './services/Php/Wordpress/WordpressService';
import { App } from '@nsilly/container';

export default function handler(options: any): Rule {
  const templateSource = apply(url('./files/slider'), [
    options.skipTests ? filter(path => !path.endsWith('.spec.ts.template')) : noop(),
    applyTemplates({
      ...strings,
      ...options
    }),
    move(options.path)
  ]);
  return chain([mergeWith(templateSource), App.make(WordpressService).declareInServiceProvider('app/Providers/BlockServiceProvider.php', `App\\Blocks\\FancyBoxBlock::class,`)]);
}
