import { Button } from "@mui/material";
import { useAppDispatch } from "./hooks";
import  genRecipe, { genChickenSoupRecipe }  from "./FakeData"
import { addRecipe } from '../features/recipeBook/RecipeSlice';

export const MagicButton = () => {

    const dispatch = useAppDispatch();

    const add = () => dispatch(addRecipe(genRecipe(1)));

    const action = () => dispatch(addRecipe(genChickenSoupRecipe()));
    return (
        <Button variant="contained" onClick={action}  onAuxClick={add}      >
            Generate Recipe!
        </Button>);
}
