import {NgModule, ModuleWithProviders} from '@angular/core';
import {MdPlatform} from './platform';

export * from './platform';
export * from './features';


@NgModule({})
export class PlatformModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: PlatformModule,
      providers: [MdPlatform],
    };
  }
}
