import { object, string, number, date, array } from 'yup';
import { IngredientItem, IngredientModel } from '../features/recipeBook/models';

// yup validation schema
export const yup = { object, string, number, date, array };

export function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}


//Wrapper around a Time object
export interface Time {
  hours: number;
  minutes: number;
}

//**Returns in Time in the format h mm */
export function timeToStringShort(time: Time): string {
  return `${time.hours} h ${time.minutes} min`;
}

//Builder Functions

/***
* Helper functions to build the ingredient list from the form values
*/
export function IngredientListBuilder(store: IngredientModel[] , ingredients: { ingredientId: string, quantity: number }[]) {
  let ingredientList = ingredients.map((item) => {
    let ingredient = store.find(ingredient => ingredient.id === item.ingredientId);
    if (ingredient) {
      let ingredientItem = new IngredientItem(ingredient, item.quantity);
      return ingredientItem;
    } else {
      throw new Error("Ingredient not found");
    }
  }
  );
  return ingredientList;
}

/***
 * Helper functions to build the id list from the IngredientItem list
 */

export function IngredientIdListBuilder(ingredients: IngredientItem[]) {
  let idList = ingredients.map((item) => { return { ingredientId: item.ingredient.id, quantity: item.quantity }; });
  return idList;
}
