import { RecipeCard } from "../components/recipe-card";
import { RecipeModel } from "../features/recipeBook/models";
import { Text, SimpleGrid, Box } from "@chakra-ui/react";


export default function RecipeCardListPage(props: { recipes: RecipeModel[] }) {

    const recipes = props.recipes;

    return (
        <SimpleGrid p="4" minChildWidth='200px' spacing="24px" justifyItems="center" >

            {recipes.length === 0 ? <Text p={6} mb={4} variant="h5" align="center">No recipes found. Create a new Recipe or Generate one!</Text> :

                recipes.map((recipe: RecipeModel) => (
                    <Box key={recipe.id}>
                        <RecipeCard recipe={recipe} />
                    </Box>
                ))
            }
        </SimpleGrid>
    );
}