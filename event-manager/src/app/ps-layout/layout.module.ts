import { LayoutModule } from '@angular/cdk/layout';
import { NgModule } from '@angular/core';

import { AmmModule } from '../core/amm/amm.module';

import { NavigationComponent } from './navigation/navigation.component';

@NgModule({
  declarations: [NavigationComponent],
  exports: [NavigationComponent],
  imports: [AmmModule, LayoutModule]
})
export class PSLayoutModule {}
