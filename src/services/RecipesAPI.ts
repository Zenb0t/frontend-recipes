import axios from "axios";
import { RecipeModel } from "../features/recipeBook/RecipeBookModels";

function recipesAPI() {

    const http = axios.create({
        baseURL: "http://localhost:8000/",
        timeout: 1000,
        headers: {
            "Content-Type": "application/json"
        }
    });

    const createRecipe = (recipe: RecipeModel) => {
        return http.post(`api/recipes`, recipe);
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

    return {
        createRecipe,
        getRecipes,
        getRecipe,
        updateRecipe,
        deleteRecipe
    }
}

export default recipesAPI();