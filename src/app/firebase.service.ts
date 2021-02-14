import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  constructor(private fireStore: AngularFirestore) { }

  /**
   * Récupération de tous les points de vente
   */
  public getSellers(): Observable<any[]> {
    return this.fireStore.collection<any>('seller').valueChanges({ idField: 'sellerId' });
  }

  /**
   * Récupération de toutes les recettes
   */
  public getRecipes(): Observable<any[]> {
    return this.fireStore.collection<any>('recipes').valueChanges({ idField: 'recipeId' });
  }

  /**
   * Récupération d'une recette par identifiant
   * @param id Identifian de la recette
   */
  public getRecipeById(id: String) {
    return this.fireStore.doc<any>('recipes/' + id);
  }
}
