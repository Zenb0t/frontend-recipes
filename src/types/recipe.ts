import { Ingredient } from "./ingredient";
import * as Yup from "yup";

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
	servings?: number;
	sourceUrl?: string;
}

export interface IngredientItem {
	ingredient: Ingredient;
	quantity: number;
	measuringUnit: string;
}

export const recipeValidationSchema = Yup.object({
	title: Yup.string().required("Required"),
	description: Yup.string().required("Required"),
	totalTimeInMinutes: Yup.number()
	  .required("Required")
	  .positive("Must be positive"),
	ingredients: Yup.array().of(
	  Yup.object({
		ingredient: Yup.object({
		  name: Yup.string().required("Required"),
		  measuringUnit: Yup.string().required("Required"),
		  amount: Yup.number().required("Required").positive("Must be positive"),
		}),
		quantity: Yup.number().required("Required").positive("Must be positive"),
		measuringUnit: Yup.string().required("Required"),
	  })
	),
	instructions: Yup.array().of(Yup.string().required("Required")),
	imageUrl: Yup.string().required("Required"),
	sourceUrl: Yup.string().url("Must be a valid URL"),
  });
