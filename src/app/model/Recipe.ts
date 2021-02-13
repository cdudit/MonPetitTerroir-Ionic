/**
 * notre interface representant des recettes
 */
export interface Recipe{

/**
 * le nom de la recette
 */

 name : String;

 /**
  * la liste des ingredients
  */
listIngredients : Array<String>;

 /**
  * la liste des etapes de la recettes
  */
 listStep : Array<String>;

 /**
  * le lien de l'image associé
  */
 srcPic : String;

}