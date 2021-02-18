import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListRecipePage } from './list-recipe.page';

const routes: Routes = [
  {
    path: '',
    component: ListRecipePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListRecipePageRoutingModule {}
