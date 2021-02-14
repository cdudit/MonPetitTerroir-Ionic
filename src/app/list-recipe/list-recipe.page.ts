import { Component, OnInit } from '@angular/core';
import { Recipe } from '../model/Recipe';
import { Router } from '@angular/router';
import { FirebaseService } from '../firebase.service';


@Component({
  selector: 'app-list-recipe',
  templateUrl: './list-recipe.page.html',
  styleUrls: ['./list-recipe.page.scss'],
})
export class ListRecipePage implements OnInit {

/**
 * la liste des recette proposé
 */
  list:Array<Recipe>;

  /**
   * constructeur
   * @param router 
   *        le routeur nous permettant de naviguer vers l'affichage d'une recette
   * @param serviceFirebase
   *        le service faisant le lien avec firebase
   */
  constructor(private router : Router, private serviceFirebase : FirebaseService) { }

  
  
/**
 * methode onInit
 */
  ngOnInit() {

    //ici on recupere les recettes de firebase
    if(!this.list){
      this.serviceFirebase.getRecipes().subscribe(items=>this.list=items );
     
    }

  }

  /**
   * methode navigant vers l'affichage d'une recette
   * @param idRecipe
   *          id de la recette que l'on va afficher
   */
  goRecipe(idRecipe: String) : void{

      this.router.navigate(["a-recipe"],{queryParams : {"idRecipe" : idRecipe}});
      

  }
}
