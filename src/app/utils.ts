import { object, string, number, date, array } from 'yup';
import { Ingredient } from '../types/ingredient';
import { IngredientItem } from '../types/recipe';

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
export function IngredientListBuilder(store: Ingredient[], ingredients: { ingredientId: string, quantity: number }[]) {
  let ingredientList = ingredients.map((item) => {
    let ingredient = store.find(ingredient => ingredient._id === item.ingredientId);
    if (ingredient) {
      const ingredientItem: IngredientItem = { ingredient: ingredient, quantity: item.quantity, measuringUnit: ingredient.measuringUnit };
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
  let idList = ingredients.map((item) => { return { ingredientId: item.ingredient._id, quantity: item.quantity }; });
  return idList;
}