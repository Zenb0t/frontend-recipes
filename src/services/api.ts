import axios from "axios";
import sanitizedConfig from "../config";
import { IngredientModel, RecipeModel } from "../features/recipeBook/models";
import { store } from "../app/store";
import { User } from "@auth0/auth0-react";

/***
 * This service handles all the API calls to the backend
 * It is used by the redux store to fetch data from the backend
 * 
 */
export default function apiService() {

    const currentUser = store.getState().users.userInfo;
    const token = store.getState().users.userToken;

    const http = axios.create({
        baseURL: sanitizedConfig.API_URL,
        timeout: 1000,
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        }
    });

    // User API calls

    /**
     * Send the current User from auth service to the backend. If the user already exists, the backend will 
     * return 200 OK and the user information from the database, else it will create a new user and return it.
     */
    const sendUser = async (user: User) => {
        const res = await http.post(`api/u/`, user);
        console.log(res);
        return res;
    }

    /**
     * Get the current user from the backend, using id as query paramenter.
     */ 
    const getUser = (id: string) => {
        return http.get(`api/u/`,{ params: { userId: id }});
    }

    const getUserByEmail = (email: string) => {
        return http.get(`api/u/`, { params: { email: email } });
    }

    // Recipe API calls

    const createRecipe = async (recipe: RecipeModel) => {
        const res = await http.post(`api/recipes`, recipe, {params: {userId: currentUser!.id}});
        return res;
    }

    const getRecipes = async () => {
        const res = await http.get(`api/recipes`, );
        return res;
    }

    const getRecipesByUser = async (userId: string) => {
        const res = await http.get(`api/recipes/all`, { params: { userId: userId} });
        return res;
    }

    const getRecipesByUserEmail = async (email: string) => {
        const res = await http.get(`api/recipes`, { params: { email: email } });
        return res;
    }

    const getRecipe = (id: string) => {
        return http.get(`api/recipes/${id}`);
    }

    const updateRecipe = (id: string, recipe: RecipeModel) => {
        return http.put(`api/recipes/${id}`, recipe);
    }

    const deleteRecipe = (id: string) => {
        return http.delete(`api/recipes/${id}`);
    }

    const deleteAllRecipes = () => {
        return http.delete(`api/recipes`);
    }

    // Ingredient API calls

    const createIngredient = async (ingredient: IngredientModel) => {
        const res = await http.post(`api/ingredients`, ingredient);
        return res;
    }

    const fetchIngredients = async () => {
        const res = await http.get(`api/ingredients`);
        return res;
    }

    const fetchIngredient = (id: string) => {
        return http.get(`api/ingredients/${id}`);
    }

    const updateIngredient = (id: string, ingredient: IngredientModel) => {
        return http.put(`api/ingredients/${id}`, ingredient);
    }

    const deleteIngredient = (id: string) => {
        return http.delete(`api/ingredients/${id}`);
    }

    return {
        sendUser,
        getUser,
        getUserByEmail,
        createRecipe,
        getRecipes,
        getRecipe,
        getRecipesByUserEmail,
        updateRecipe,
        deleteRecipe,
        deleteAllRecipes,
        createIngredient,
        fetchIngredients,
        fetchIngredient,
        updateIngredient,
        deleteIngredient,
        getRecipesByUser
    }
}