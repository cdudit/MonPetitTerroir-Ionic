import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '/map',
    loadChildren: () => import('./map/map.module').then(m => m.MapPageModule)
  },
  {
    path: '',
    loadChildren: () => import('./list-recipe/list-recipe.module').then(m => m.ListRecipePageModule)
  }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
