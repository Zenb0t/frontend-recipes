import { Button, ButtonGroup, Stack, VStack } from "@chakra-ui/react";
import { useAppDispatch } from "./hooks";
import { demoList, genChickenSoupRecipe } from "../services/fake-data"
import { createRecipe, deleteAllRecipes, fetchRecipes } from '../features/recipeBook/recipe-slice';
import { createIngredient } from "../features/recipeBook/ingredient-slice";
import apiService from "../services/api";

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

export const DevButton = () => {

    const dispatch = useAppDispatch();


    async function create() {
        let result = await apiService().sendUser({username: 'alice', password: 'password'});
        console.log(result);
        return result;
    }

    async function fetch() {
        let result = await apiService().getRecipesByUserEmail("estudiopf@gmail.com");
        console.log(result);
        return result;
    }


    return (
        <Stack>
            <ButtonGroup colorScheme="purple">
                <Button  onClick={create}>
                    Create new User
                </Button>
                <Button  onClick={fetch}   >
                    Fetch User Data
                </Button>
            </ButtonGroup>
        </Stack>
    );

}





