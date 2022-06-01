import { Button } from "@mui/material";
import { useAppDispatch } from "./hooks";
import genRecipe, { genChickenSoupRecipe } from "../services/FakeData"
import { createRecipe, deleteAllRecipes, fetchRecipes } from '../features/recipeBook/RecipeSlice';

export const MagicButton = () => {

    const dispatch = useAppDispatch();

    const add = () => dispatch(createRecipe(genRecipe(1)));
    const deleteAll = () => dispatch(deleteAllRecipes());
    const fetch = () => console.log(dispatch(fetchRecipes()));

    const action = () => dispatch(createRecipe(genChickenSoupRecipe()));
    return (
        <>
            <Button variant="contained" onClick={action} onAuxClick={add}      >
                Generate Recipe!
            </Button>
            <Button variant="contained" onClick={fetch}   >
                Fetch All
            </Button>
            <Button variant="contained" onClick={deleteAll}   >
                Delete All
            </Button>
        </>);
}
