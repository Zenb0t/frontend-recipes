import { Recipe } from "../types/recipe";
import http from "./api";


export const createRecipe = async (recipe: Recipe) => {
  try {
    const res = await http.post(`/recipes`, recipe);
    return res;
  } catch (error) {
    console.error(error);
  }
};

export const getRecipes = async () => {
  try {
    const res = await http.get(`/recipes`);
    return res;
  } catch (error) {
    console.error(error);
  }
};

export const getRecipesByUser = async (userId: string) => {
  try {
    const res = await http.get(`/recipes/all`, { params: { userId: userId } });
    return res;
  } catch (error) {
    console.error(error);
  }
};

export const getRecipesByUserEmail = async (email: string) => {
  try {
    const res = await http.get(`/recipes`, { params: { email: email } });
    return res;
  } catch (error) {
    console.error(error);
  }
};

export const getRecipe = async (id: string) => {
  try {
    return await http.get(`/recipes/${id}`);
  } catch (error) {
    console.error(error);
  }
};

export const updateRecipe = async (id: string, recipe: Recipe) => {
  try {
    return await http.put(`/recipes/${id}`, recipe);
  } catch (error) {
    console.error(error);
  }
};

export const deleteRecipe = async (id: string) => {
  try {
    return await http.delete(`/recipes/${id}`);
  } catch (error) {
    console.error(error);
  }
};

export const deleteAllRecipes = async () => {
  try {
    return await http.delete(`/recipes`);
  } catch (error) {
    console.error(error);
  }
};