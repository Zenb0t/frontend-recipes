import axios from "axios";
import sanitizedConfig from "../config";
import { IngredientModel, RecipeModel } from "../features/recipeBook/models";

/***
 * This is a service that handles all the API calls to the backend
 * It is used by the redux store to fetch data from the backend
 * 
 */
function recipesAPI() {

    const http = axios.create({
        baseURL: sanitizedConfig.API_URL,
        timeout: 1000,
        headers: {
            "Content-Type": "application/json"
        }
    });

    const createRecipe = async (recipe: RecipeModel) => {
        const res = await http.post(`api/recipes`, recipe);
        return res;
    }

    const getRecipes = async () => {
        const res = await http.get(`api/recipes`);
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
        createRecipe,
        getRecipes,
        getRecipe,
        updateRecipe,
        deleteRecipe,
        deleteAllRecipes,
        createIngredient,
        fetchIngredients,
        fetchIngredient,
        updateIngredient,
        deleteIngredient
    }
}

export default recipesAPI();