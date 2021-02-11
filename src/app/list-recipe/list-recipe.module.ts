import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListRecipePageRoutingModule } from './list-recipe-routing.module';

import { ListRecipePage } from './list-recipe.page';

import {RecipeComponent} from '../recipe/recipe.component'


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListRecipePageRoutingModule,

  ],
  declarations: [ListRecipePage, RecipeComponent]
})
export class ListRecipePageModule {}
