import { store } from "../app/store";
import { Recipe } from "../types/recipe";
import http from "./api";

const currentUser = store.getState().users.userInfo;

const createRecipe = async (recipe: Recipe) => {
  const res = await http.post(`/recipes`, recipe, {
    params: { userId: currentUser!._id },
  });
  return res;
};

const getRecipes = async () => {
  const res = await http.get(`/recipes`);
  return res;
};

const getRecipesByUser = async (userId: string) => {
  const res = await http.get(`/recipes/all`, { params: { userId: userId } });
  return res;
};

const getRecipesByUserEmail = async (email: string) => {
  const res = await http.get(`/recipes`, { params: { email: email } });
  return res;
};

const getRecipe = (id: string) => {
  return http.get(`/recipes/${id}`);
};

const updateRecipe = (id: string, recipe: Recipe) => {
  return http.put(`/recipes/${id}`, recipe);
};

const deleteRecipe = (id: string) => {
  return http.delete(`/recipes/${id}`);
};

const deleteAllRecipes = () => {
  return http.delete(`/recipes`);
};
