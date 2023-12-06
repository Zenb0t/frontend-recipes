import { Recipe } from "../types/recipe";
import http from "./api";

export const createRecipe = async (recipe: Recipe) => {
  try {
    const res = await http.post(`/u/recipes`, recipe);
    return res;
  } catch (error) {
    console.error(error);
  }
};

export const getRecipes = async () => {
  try {
    const res = await http.get(`/u/recipes`);
    return res;
  } catch (error) {
    console.error(error);
  }
};

export const getRecipesByUser = async (userId: string) => {
  try {
    const res = await http.get(`/u/recipes/all`, { params: { userId: userId } });
    return res;
  } catch (error) {
    console.error(error);
  }
};

export const getRecipesByUserEmail = async (email: string) => {
  try {
    const res = await http.get(`/u/recipes`, { params: { email: email } });
    return res;
  } catch (error) {
    console.error(error);
  }
};

export const getRecipe = async (id: string) => {
  try {
    return await http.get(`/u/recipes/${id}`);
  } catch (error) {
    console.error(error);
  }
};

export const updateRecipe = async (id: string, recipe: Recipe) => {
  try {
    return await http.put(`/u/recipes/${id}`, recipe);
  } catch (error) {
    console.error(error);
  }
};

export const deleteRecipe = async (id: string) => {
  try {
    return await http.delete(`/u/recipes/${id}`);
  } catch (error) {
    console.error(error);
  }
};

export const deleteAllRecipes = async () => {
  try {
    return await http.delete(`/u/recipes`);
  } catch (error) {
    console.error(error);
  }
};

export const RecipeApi = {
  createRecipe,
  getRecipes,
  getRecipesByUser,
  getRecipesByUserEmail,
  getRecipe,
  updateRecipe,
  deleteRecipe,
  deleteAllRecipes,
};
