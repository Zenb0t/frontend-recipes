import axios from "axios";
import sanitizedConfig from "../config";
import { RecipeModel } from "../features/recipeBook/models";

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
        console.log(res.data);
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


    return {
        createRecipe,
        getRecipes,
        getRecipe,
        updateRecipe,
        deleteRecipe,
        deleteAllRecipes,
    }
}

export default recipesAPI();