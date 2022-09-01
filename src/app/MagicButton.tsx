import { Button, ButtonGroup } from "@chakra-ui/react";
import { useAppDispatch } from "./hooks";
import genRecipe, { genChickenSoupRecipe } from "../services/FakeData"
import { createRecipe, deleteAllRecipes, fetchRecipes } from '../features/recipeBook/RecipeSlice';

export const MagicButton = () => {

    const dispatch = useAppDispatch();

    function add() {
        dispatch(createRecipe(genChickenSoupRecipe()));
    }
    function deleteAll() {
        dispatch(deleteAllRecipes());
    }
    function fetch() {
        dispatch(fetchRecipes());
    }


    const action = () => dispatch(createRecipe(genChickenSoupRecipe()));
    return (
        <ButtonGroup colorScheme="purple">
            <Button variant="ghost" onClick={action} onAuxClick={add}      >
                Generate Recipe!
            </Button>
            <Button variant="ghost" onClick={fetch}   >
                Fetch All
            </Button>
            <Button variant="ghost" onClick={deleteAll}   >
                Delete All
            </Button>
        </ButtonGroup>);
}




