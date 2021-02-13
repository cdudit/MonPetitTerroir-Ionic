import { Component, OnInit } from '@angular/core';
import { Recipe } from '../model/Recipe';


@Component({
  selector: 'app-list-recipe',
  templateUrl: './list-recipe.page.html',
  styleUrls: ['./list-recipe.page.scss'],
})
export class ListRecipePage implements OnInit {

/**
 * je mets une recette en dur pour le moment, cela changera lorsqu'on aura fais le lien avec firebase
 */
  liste:Array<Recipe>=[{
    name :"Bannane Pomme" , 
    listIngredients : ["Pomme", "Bannane"],
    listStep:["Couper les pommes", "Couper les bannanes"],
    srcPic:"assets/images/image.jpg"
  },
  {
    name :"Bannane Pomme" , 
    listIngredients : ["Pomme", "Bannane"],
    listStep:["Couper les pommes", "Couper les bannanes"],
    srcPic:"assets/images/image.jpg"
  },
  {
    name :"Bannane Pomme" , 
    listIngredients : ["Pomme", "Bannane"],
    listStep:["Couper les pommes", "Couper les bannanes"],
    srcPic:"assets/images/image.jpg"
  }]

  constructor() { }
  

  ngOnInit() {
  }

}
