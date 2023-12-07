import { RecipeCard } from "../components/RecipeCard";
import { RecipeModel } from "../features/recipeBook/models";
import { Text, SimpleGrid, Box, Center, Spinner, Wrap, WrapItem } from "@chakra-ui/react";
import { Recipe } from "../types/recipe";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { useEffect } from "react";
import { fetchRecipes } from "../features/recipeBook/recipe-slice";

export default function RecipeCardListPage() {
  const { recipeList, status } = useAppSelector((state) => state.recipeBook);
  const dispatch = useAppDispatch();

  function fetchData() {
    dispatch(fetchRecipes());
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (recipeList.length === 0 && status !== "idle") {
      fetchData();
    }
  }, [recipeList, status]);

  if (recipeList.length === 0) {
    return (
      <Center w={"full"} h={"50vh"}>
        <Text fontSize={"lg"} color={"gray.600"}>
          Loading...
        </Text>
        <Spinner size="xl" color={"green.500"} />
      </Center>
    );
  }

  return (
    // <SimpleGrid
    //   p={4}
    //   columns={{ base: 1, md: 3 }}
    //   spacingX="40px"
    //   spacingY="20px"
    //   justifyItems="flex-start"
    //   border="1px"
    //   borderColor="red.500"
    // >
    <Wrap p={4} spacingX={8} spacingY={8}>
      {recipeList.length === 0 ? (
        <Text p={6} mb={4} variant="h5" align="center">
          No recipes found. Create a new Recipe or Generate one from a url!
        </Text>
      ) : (
        recipeList.map((recipe: Recipe) => (
          // add a red border to the box
          <WrapItem>
          <Box minW="200px" key={recipe._id} >
            <RecipeCard recipe={recipe} />
          </Box>
          </WrapItem>
        ))
      )}
    </Wrap>
    // </SimpleGrid>
  );
}
