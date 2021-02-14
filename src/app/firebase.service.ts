import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Recipe } from './model/Recipe';

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
   * @param id Identifian de la recette
   */
  public getRecipeById(id: String) {
    return this.fireStore.doc<Recipe>('recipes/' + id);
  }
}
