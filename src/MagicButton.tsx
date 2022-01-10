import { Button } from "@mui/material";
import { useAppDispatch } from "./app/hooks";
import  genRecipe, { genChickenSoupRecipe }  from "./fakeData";
import { addRecipe } from './features/recipeBook/RecipeSlice';

export const MagicButton = () => {

    const dispatch = useAppDispatch();

    const add = () => dispatch(addRecipe(genRecipe(1)));

    const action = () => dispatch(addRecipe(genChickenSoupRecipe()));
    return (
        <Button variant="contained" onClick={action}  onAuxClick={add}      >
            Generate Recipe!
        </Button>);
}