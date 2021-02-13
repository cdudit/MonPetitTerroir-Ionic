import { Component, OnInit,Input  } from '@angular/core';
import { Recipe } from '../model/Recipe';

@Component({
  selector: 'recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss'],
})
/**
 * composant de la recette 
 */
export class RecipeComponent implements OnInit {

  @Input() aRecipe: Recipe; 




  constructor() { }

  ngOnInit() {
    
  }

}
