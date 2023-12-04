import { Ingredient } from "./ingredient";

export interface Recipe {
	_id?: string;
	title: string;
	description: string;
	totalTimeInMinutes: number;
	cost?: number;
	ingredients: IngredientItem[];
	instructions: string[];
	imageUrl: string;
	ownerId: string;
	sourceUrl?: string;
}

export interface IngredientItem {
	ingredient: Ingredient;
	quantity: number;
	measuringUnit: string;
}
