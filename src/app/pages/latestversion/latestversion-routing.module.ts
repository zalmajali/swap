import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LatestversionPage } from './latestversion.page';

const routes: Routes = [
  {
    path: '',
    component: LatestversionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LatestversionPageRoutingModule {}
