import { NgModule } from '@angular/core';
import { NB_TIME_PICKER_CONFIG, NbMenuModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    MiscellaneousModule,
  ],
  declarations: [
    PagesComponent,
  ],
  providers: [
    {
      provide: NB_TIME_PICKER_CONFIG,
      useValue: {},
    },
  ],
})
export class PagesModule {
}
