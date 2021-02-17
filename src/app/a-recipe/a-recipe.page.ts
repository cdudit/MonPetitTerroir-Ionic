import { Component, OnInit, Input, DoCheck } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from '../model/Recipe';
import { FirebaseService } from '../firebase.service';
import { mergeMap, map } from 'rxjs/operators';
import { Ingredient } from '../model/Ingredient';


@Component({
  selector: 'app-a-recipe',
  templateUrl: './a-recipe.page.html',
  styleUrls: ['./a-recipe.page.scss'],
})
/**
 * page d'affichage d'une recette
 */
export class ARecipePage implements OnInit {

 

  /**
   * la recette affiché
   */
  recipeDisplay :Recipe ;

  /**
   * la liste des ingrédients de la recette
   */
  arrayIngredients : Array<Ingredient>;

  /**
   * le constructeur
   * @param route 
   *        la route, utile pour recuperer l'id du document firestore dans la recette 
   * @param serviceFirebase 
   *        le service faisant le lien avec firebase
   */
  constructor(private route: ActivatedRoute,private serviceFirebase : FirebaseService) { }

 

  /**
   * methode onInit, je vais rechercher dans le firestore la recette selon son id de document 
   * (recupere dans les parametres de la route)
   */
  ngOnInit() {

    //J'initialise ma liste d'ingrédient
    this.arrayIngredients=Array();
        
    //Si je n'ai pas déjà recupéré la recette
    if(!this.recipeDisplay){
      //alors je vais la chercher dans le firestore

      //j'initialise un tableau d'ingrédient à vide
      let listIng=Array();
      
      //je recupere l'id firestore de ma recette  
       this.route.queryParams.pipe(
        mergeMap(params=>{
          
          //je vais rechercher ma recette dans firestore
          return this.serviceFirebase.getRecipeById(params['idRecipe']).pipe(
            mergeMap(recipe=>{

              //Je recupere la recette 
              this.recipeDisplay=recipe;

              //je retourne sa liste d'id firestore d'ingrédient 
              return recipe.listIngredients
             
            }))
          
        })
        //pour chaque id d'ingredient
      ).forEach(idIngredient=>
                //je recherche l'objet ingrédient dans la base 
                this.serviceFirebase.getIngredientById(idIngredient).subscribe(element=>{
                  //je l'ajoute a notre liste d'ingrédient que l'on va afficher
                  //j'ai rajouté une condition qui vérifie que la liste d'ingrédient 
                  //n'est pas plus longue que la liste d'id d'ingrédient 
                  //car je me retrouve parfois dans le cas ou le dernier element s'ajoute deux fois
                  //un peu de manière aléatoire, cette condition bloque cela
                      if(this.arrayIngredients.length<this.recipeDisplay.listIngredients.length){
                        this.arrayIngredients.push(element)
                      }
                      }));
      
      
      
      
      
        

    }
 
  
  }

  /**
   * methode gerant les evenement sur le bouton "segment"(Ingrédients ou Recette)
   * @param $event 
   */
  segmentChanged($event){
   // console.log(event.detail.value);
   //TODO A FINIR
  }

  

}
