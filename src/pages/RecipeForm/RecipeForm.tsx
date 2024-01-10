import React from "react";
import { Formik, Form } from "formik";
import {
  ParsedRecipe,
  Recipe,
  recipeValidationSchema,
} from "../../types/recipe";
import RecipeInfoSection from "./RecipeInfoSection";
import IngredientsSection from "./IngredientsSection";
import InstructionsSection from "./InstructionsSection";
import TimingSection from "./TimingSection";
import {
  Box,
  Button,
  Divider,
  Flex,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import * as Yup from "yup";
import {
  Ingredient,
  MEASURING_UNITS_MAPPING,
  MeasuringUnit,
  ParsedIngredient,
} from "../../types/ingredient";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import {
  createRecipe,
  fetchRecipeById,
} from "../../features/recipeBook/recipeSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";

const initialValues: ParsedRecipe = {
  title: "",
  description: "",
  totalTimeInMinutes: 0,
  ingredients: [],
  instructions: [""],
  imageUrl: "",
  ownerId: "", // This should be set based on the user's session or similar
  sourceUrl: "",
};

const RecipeForm = () => {
  const dispatch = useAppDispatch();
  const toast = useToast();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.users.userInfo);

  const handleSubmit = async (values: ParsedRecipe) => {
    console.log("Submitting recipe: ", values);
    console.log("User: ", user);
    try {
      if (!user?._id) {
        throw new Error("No user found");
      }
      values.ownerId = user._id;

      const newRecipe: Recipe = {
        title: values.title,
        description: values.description,
        totalTimeInMinutes: values.totalTimeInMinutes,
        ingredients: convertParsedIngredientsToIngredients(values.ingredients),
        instructions: values.instructions,
        imageUrl: values.imageUrl as string, // Coerce to string to satisfy type checker
        ownerId: values.ownerId,
        sourceUrl: values.sourceUrl,
        servings: values.servings,
      };

      // Dispatch the action and wait for the result
      const resultAction = await dispatch(createRecipe(newRecipe));
      const resultRecipe: Recipe = unwrapResult(resultAction);

      // Show success toast
      toast({
        title: "Recipe created",
        description: "Your recipe has been created",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      // Fetch the new recipe
      if (!resultRecipe._id) {
        throw new Error("No recipe ID found");
      }
      await dispatch(fetchRecipeById(resultRecipe._id));
      // Navigate to the new recipe page
      navigate(`/dashboard/recipe/${newRecipe._id}`);
    } catch (err: any) {
      // Handle errors
      toast({
        title: "Failed to create recipe",
        description: err.message || "There was an error creating the recipe.",
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
};

function convertParsedIngredientsToIngredients(
  parsedIngredients: ParsedIngredient[]
) {
  return parsedIngredients.map((parsedIngredient) => {
    const ingredient: Ingredient = {
      name: parsedIngredient.name,
      amount: parsedIngredient.amount || 0,
      measuringUnit:
        MEASURING_UNITS_MAPPING[
          parsedIngredient.unit as keyof typeof MEASURING_UNITS_MAPPING
        ], // Type Gymnastics
    };
    return ingredient;
  });
}

export default RecipeForm;
