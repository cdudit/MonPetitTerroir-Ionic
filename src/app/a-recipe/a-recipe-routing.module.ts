import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ARecipePage } from './a-recipe.page';

const routes: Routes = [
  {
    path: '',
    component: ARecipePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ARecipePageRoutingModule {}
