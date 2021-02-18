import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  /**{
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },*/
  {
    path: '',
    loadChildren: () => import('./list-recipe/list-recipe.module').then( m => m.ListRecipePageModule)
  },
  {
    path: 'a-recipe',
    loadChildren: () => import('./a-recipe/a-recipe.module').then( m => m.ARecipePageModule)
  },
  {
    path: 'map',
    loadChildren: () => import('./map/map.module').then(m => m.MapPageModule)
  },


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}


