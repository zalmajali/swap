import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LatestversionPageRoutingModule } from './latestversion-routing.module';

import { LatestversionPage } from './latestversion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LatestversionPageRoutingModule
  ],
  declarations: [LatestversionPage]
})
export class LatestversionPageModule {}
