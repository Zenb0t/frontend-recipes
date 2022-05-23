import { Button } from "@mui/material";
import { useAppDispatch } from "./hooks";
import  genRecipe, { genChickenSoupRecipe }  from "../services/FakeData"
import { addRecipe, fetchRecipes } from '../features/recipeBook/RecipeSlice';

export const MagicButton = () => {

    const dispatch = useAppDispatch();

    const add = () => dispatch(addRecipe(genRecipe(1)));

    const fetch = () => console.log(dispatch(fetchRecipes()));

    const action = () => dispatch(addRecipe(genChickenSoupRecipe()));
    return (
        <Button variant="contained" onClick={action}  onAuxClick={fetch}      >
            Generate Recipe!
        </Button>);
}
