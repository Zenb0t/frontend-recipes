import { RecipeCard } from "../components/recipe-card";
import { RecipeModel } from "../features/recipeBook/models";
import { Text, SimpleGrid, Box } from "@chakra-ui/react";
import { Recipe } from "../types/recipe";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { useEffect } from "react";
import { fetchRecipes } from "../features/recipeBook/recipe-slice";

export default function RecipeCardListPage() {
  const recipes = useAppSelector((state) => state.recipeBook.recipeList);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchRecipes());
  }, []);

  if (!recipes) {
    return (
      <Text p={6} mb={4} variant="h5" align="center">
        Loading...
      </Text>
    );
  }

  return (
    <SimpleGrid
      p="4"
      minChildWidth="200px"
      spacing="24px"
      justifyItems="center"
    >
      {recipes.length === 0 ? (
        <Text p={6} mb={4} variant="h5" align="center">
          No recipes found. Create a new Recipe or Generate one!
        </Text>
      ) : (
        recipes.map((recipe: Recipe) => (
          <Box key={recipe._id}>
            <RecipeCard recipe={recipe} />
          </Box>
        ))
      )}
    </SimpleGrid>
  );
}
