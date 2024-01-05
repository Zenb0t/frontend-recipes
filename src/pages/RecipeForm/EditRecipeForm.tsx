import { Formik, Form } from "formik";
import {
  Box,
  Button,
  Flex,
  useColorModeValue,
  useToast,
  Divider,
} from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import {
  updateRecipe,
  selectRecipeById,
} from "../../features/recipeBook/recipeSlice";
import { useNavigate, useParams } from "react-router-dom";
import { selectIngredientList } from "../../features/recipeBook/ingredientSlice";
import { Recipe, recipeValidationSchema } from "../../types/recipe";
import RecipeInfoSection from "./RecipeInfoSection";
import { unwrapResult } from "@reduxjs/toolkit";
import IngredientsSection from "./IngredientsSection";
import InstructionsSection from "./InstructionsSection";
import TimingSection from "./TimingSection";

export function EditRecipePage() {
  let { recipeId } = useParams();
  //Hooks
  const dispatch = useAppDispatch();
  const recipe = useAppSelector((state) => selectRecipeById(state, recipeId!));
  const navigate = useNavigate();
  const toast = useToast();

  //Selectors
  const user = useAppSelector((state) => state.users.userInfo);

  const initialValues: Recipe = {
    _id: recipe?._id || "",
    title: recipe?.title || "",
    description: recipe?.description || "",
    totalTimeInMinutes: recipe?.totalTimeInMinutes || 0,
    ingredients: recipe?.ingredients || [],
    instructions: recipe?.instructions || [],
    imageUrl: recipe?.imageUrl || "",
    ownerId: recipe?.ownerId || user?._id || "",
    sourceUrl: recipe?.sourceUrl || "",
    servings: recipe?.servings || 0,
  };

  const handleSubmit = async (values: Recipe) => {
    console.log("Submitting recipe: ", values);
    console.log("User: ", user);
    try {
      if (!user?._id) {
        throw new Error("No user found");
      }
      values.ownerId = user._id;
      // Dispatch the action and wait for the result
      const resultAction = await dispatch(updateRecipe(values));
      const newRecipe: Recipe = unwrapResult(resultAction);

      // Show success toast
      toast({
        title: "Recipe updated",
        description: "Your recipe has been updated",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      // Navigate to the new recipe page, assuming newRecipe contains the ID
      navigate(`/dashboard/recipe/${newRecipe._id}`);
    } catch (err: any) {
      // Handle errors
      toast({
        title: "Failed to update recipe",
        description: err.message || "There was an error updating the recipe.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      bg={useColorModeValue("white", "gray.800")}
      py={{ base: 4, lg: 8 }}
      rounded="md"
      minW={{ base: 280, lg: 700 }}
      mx={{ base: 1, lg: 4 }}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={recipeValidationSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form>
            <RecipeInfoSection />
            <Box px={8}>
              <Divider />
            </Box>
            <IngredientsSection />
            <Box px={8}>
              <Divider />
            </Box>
            <InstructionsSection />
            <Box px={8}>
              <Divider />
            </Box>
            <TimingSection />
            <Flex justify="space-around" mt={2}>
              <Button type="submit" colorScheme="green">
                Submit
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
    </Box>
  );
}
