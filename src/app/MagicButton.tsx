import { Button, ButtonGroup, Stack, VStack } from "@chakra-ui/react";
import { useAppDispatch } from "./hooks";
import { demoList, genChickenSoupRecipe } from "../services/fake-data"
import { createRecipe, deleteAllRecipes, fetchRecipes } from '../features/recipeBook/recipe-slice';
import { createIngredient } from "../features/recipeBook/ingredient-slice";
import recipesAPI from "../services/recipes-api";

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

const token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InlYRFJUN2Itci1RdEk5X2xkOEFQbyJ9.eyJpc3MiOiJodHRwczovL3plbmJvdC51cy5hdXRoMC5jb20vIiwic3ViIjoiRklDSmNMZDhEWE1OWFJ1U0pEMHZ2UndBZFNsME1FcDFAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vcGFuZWxhLmFwcC9hcGkiLCJpYXQiOjE2NzE1NTkwNzMsImV4cCI6MTY3MTY0NTQ3MywiYXpwIjoiRklDSmNMZDhEWE1OWFJ1U0pEMHZ2UndBZFNsME1FcDEiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.iRmuBiSoRZRSF_IHYc4H_xVXbBJbfmvkGb1osnxCowdI9WTZIwFd9mfpZtiphYLpKOUIF2mkcROQOypbNnsbh9V6IHtk_3CRnSRiaMyFlsJa8DJ9urvn7P0MqrCwsKXGs5O6NoGzBpEb-elPMiVUPfc-3UqVZUcynGs7HUF0ytvozlXteGO96nGj6mRCqHGdEXHGbmA1RiJsRVwfY1su5MjwYzLqJ0X9BhbNAca5XlAt2q6acer_MPx0s8s9xrU3-LNnrKV4i9XPYQelPSwh5A41C7wekLfyUB7_g3qm7HWSBzBKUFWK1pjpB976WQHFb0LxEJHUj_FR0hzs9apPOg"

export const DevButton = () => {

    const dispatch = useAppDispatch();



    async function fetch() {
        let result = await recipesAPI(token).getRecipesByUser('alice');
        console.log(result);
        return result;
    }


    return (
        <Stack>
            <ButtonGroup colorScheme="purple">
                <Button  onClick={() => {}}>
                    Gen Recipe
                </Button>
                <Button  onClick={fetch}   >
                    Fetch User Recipes
                </Button>
            </ButtonGroup>
        </Stack>
    );

}





