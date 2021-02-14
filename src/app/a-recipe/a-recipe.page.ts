import { Component, OnInit, Input, DoCheck } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from '../model/Recipe';
import { FirebaseService } from '../firebase.service';
import { mergeMap } from 'rxjs/operators';

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
   * le constructeur
   * @param route 
   *        la route, utile pour recuperer l'id du document firestore dans la recette 
   * @param serviceFirebase 
   *        le service faisant le lien avec firebase
   */
  constructor(private route: ActivatedRoute,private serviceFirebase : FirebaseService) { }

 

  /**
   * methode onInit, je vais rechercher dans le firestore la recette selon son id de document
   */
  ngOnInit() {

        
    if(!this.recipeDisplay){
  

      this.route.queryParams.pipe(
        mergeMap(params=>{
          
          
          return this.serviceFirebase.getRecipeById(params['idRecipe'])
        })
      ).subscribe(value=>{
        console.log(value);
        
       this.recipeDisplay=value;
       
     
      })

    }
 
  
  }

}
