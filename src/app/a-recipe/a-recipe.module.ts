import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ARecipePageRoutingModule } from './a-recipe-routing.module';

import { ARecipePage } from './a-recipe.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ARecipePageRoutingModule
  ],
  declarations: [ARecipePage]
})
export class ARecipePageModule {}
