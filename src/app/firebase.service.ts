import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Recipe } from './model/Recipe';
import { Ingredient } from './model/Ingredient';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  constructor(private fireStore: AngularFirestore) { }

  /**
   * Récupération de tous les points de vente
   */
  public getSellers(): Observable<Recipe[]> {
    return this.fireStore.collection<Recipe>('seller').valueChanges({ idField: 'sellerId' });
  }

  /**
   * Récupération de toutes les recettes
   */
  public getRecipes(): Observable<Recipe[]> {
    return this.fireStore.collection<Recipe>('recipes').valueChanges({ idField: 'recipeId' });
  }

  /**
   * Récupération d'une recette par identifiant
   * @param id Identifiant de la recette
   */
  public getRecipeById(id: String):  Observable<Recipe> {
    return this.fireStore.doc<Recipe>('recipes/' + id).valueChanges( {idField: 'recipeId' });
  }


  /**
   * Récupération d'un ingrédient par identifiant
   * @param id l'identifiant de l'ingrédient
   */
  public getIngredientById(id : String) : Observable<Ingredient>{

    return this.fireStore.doc<Ingredient>('ingredients/' + id).valueChanges( {idField: 'ingredientId' });
  }
}
