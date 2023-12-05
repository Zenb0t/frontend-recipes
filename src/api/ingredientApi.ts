  // Ingredient API calls

import { Ingredient } from "../types/ingredient";
import http from "./api";

 export const createIngredient = async (ingredient: Ingredient) => {
	const res = await http.post(`/ingredients`, ingredient);
	return res;
}

export const fetchIngredients = async () => {
	const res = await http.get(`/ingredients`);
	return res;
}

export const fetchIngredient = (id: string) => {
	return http.get(`/ingredients/${id}`);
}

export const updateIngredient = (id: string, ingredient: Ingredient) => {
	return http.put(`/ingredients/${id}`, ingredient);
}

export const deleteIngredient = (id: string) => {
	return http.delete(`/ingredients/${id}`);
}