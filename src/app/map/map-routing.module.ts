import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BottomSheetMapComponent } from '../bottom-sheet-map/bottom-sheet-map.component';

import { MapPage } from './map.page';

const routes: Routes = [
  {
    path: '',
    component: MapPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule, BottomSheetMapComponent],
})
export class MapPageRoutingModule { }
