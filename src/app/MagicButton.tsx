import { Button, ButtonGroup, VStack } from "@chakra-ui/react";
import { useAppDispatch } from "./hooks";
import genRecipe, { demoList, genChickenSoupRecipe } from "../services/fake-data"
import { createRecipe, deleteAllRecipes, fetchRecipes } from '../features/recipeBook/recipe-slice';
import { createIngredient } from "../features/recipeBook/ingredient-slice";

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

    function populate() {
        demoList.forEach((ing) => {
            dispatch(createIngredient(ing));
        })
    }

    const action = () => dispatch(createRecipe(genChickenSoupRecipe()));
    return (
        <VStack>
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
            </ButtonGroup>
            <ButtonGroup colorScheme="purple">
                <Button variant="ghost" onClick={populate}   >
                    Populate Ingredients
                </Button>
            </ButtonGroup>
        </VStack>
    );
}




