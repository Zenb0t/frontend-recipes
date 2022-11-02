import { Time } from "../../app/utils";

export interface RecipeModel {

    title: string;
    description: string;
    totalTime: Time;
    ingredients: IngredientItem[];
    instructions: string[];
    imageUrl: string;
    favorite: boolean;
    id: string;
    cost: number;
}

export interface IngredientModel {
    name: string;
    amount: number;
    measuringUnit: string;
    cost: number;
    unitCost: number;
    id: string;
  }

export class IngredientItem {
    ingredient: IngredientModel;
    quantity: number;
    cost: number;
    constructor(ingredient: IngredientModel, quantity: number) {
      this.ingredient = ingredient;
      this.quantity = quantity;
      this.cost = this.calculateCost();
    }
    calculateCost(): number {
      let cost = this.ingredient.unitCost * this.quantity;
      return cost;
    }

    toString(): string {
      return `${this.quantity} ${this.ingredient.measuringUnit} ${this.ingredient.name}`;
    } 
  }