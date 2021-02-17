/**
 * notre interface representant des recettes
 */
export interface Recipe{

/**
* l'id firebase de la recette
*/
recipeId : String;

/**
 * le nom de la recette
 */

 name : String;

 /**
  * la liste des ingredients lié a la quantié
  * dictionnaire id d'ingrédient -> quantité 
  */
listIngredients : Map<String,BigInteger>;

 /**
  * la liste des etapes de la recettes
  */
 listSteps : Array<String>;

 /**
  * le lien de l'image associé
  */
 srcPic : String;

}