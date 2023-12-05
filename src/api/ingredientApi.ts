  // Ingredient API calls

import { Ingredient } from "../types/ingredient";
import http from "./api";

  const createIngredient = async (ingredient: Ingredient) => {
	const res = await http.post(`/ingredients`, ingredient);
	return res;
}

const fetchIngredients = async () => {
	const res = await http.get(`/ingredients`);
	return res;
}

const fetchIngredient = (id: string) => {
	return http.get(`/ingredients/${id}`);
}

const updateIngredient = (id: string, ingredient: Ingredient) => {
	return http.put(`/ingredients/${id}`, ingredient);
}

const deleteIngredient = (id: string) => {
	return http.delete(`/ingredients/${id}`);
}