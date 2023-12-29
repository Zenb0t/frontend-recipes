import React from "react";
import { Formik, Form } from "formik";
import { Recipe } from "../../types/recipe";
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
import { MeasuringUnit } from "../../types/ingredient";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { createRecipe, fetchRecipeById } from "../../features/recipeBook/recipe-slice";
import { unwrapResult } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";

const initialValues: Recipe = {
  title: "",
  description: "",
  totalTimeInMinutes: 0,
  ingredients: [
    {
      ingredient: {
        name: "",
        measuringUnit: MeasuringUnit.TEASPOON,
        amount: 1,
        costPerUnit: 0,
      },
      quantity: 0,
      measuringUnit: MeasuringUnit.TEASPOON,
    },
  ],
  instructions: [""],
  imageUrl: "",
  ownerId: "", // This should be set based on the user's session or similar
  sourceUrl: "",
};

const validationSchema = Yup.object({
  title: Yup.string().required("Required"),
  description: Yup.string().required("Required"),
  totalTimeInMinutes: Yup.number()
    .required("Required")
    .positive("Must be positive"),
  ingredients: Yup.array().of(
    Yup.object({
      ingredient: Yup.object({
        name: Yup.string().required("Required"),
        measuringUnit: Yup.string().required("Required"),
        amount: Yup.number().required("Required").positive("Must be positive"),
      }),
      quantity: Yup.number().required("Required").positive("Must be positive"),
      measuringUnit: Yup.string().required("Required"),
    })
  ),
  instructions: Yup.array().of(Yup.string().required("Required")),
  imageUrl: Yup.string().required("Required"),
  sourceUrl: Yup.string().url("Must be a valid URL"),
});

const RecipeForm = () => {
  const dispatch = useAppDispatch();
  const toast = useToast();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.users.userInfo);

  const handleSubmit = async (values: Recipe) => {
    console.log("Submitting recipe: ", values);
    console.log("User: ", user);
    try {
      if (!user?._id) {
        throw new Error("No user found");
      }
      values.ownerId = user._id;
      // Dispatch the action and wait for the result
      const resultAction = await dispatch(createRecipe(values));
      const newRecipe: Recipe = unwrapResult(resultAction);
      console.log("New recipe: ", newRecipe);

      // Show success toast
      toast({
        title: "Recipe created",
        description: "Your recipe has been created",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      // Fetch the new recipe
      if (!newRecipe._id) {
        throw new Error("No recipe ID found");
      }
      await dispatch(fetchRecipeById(newRecipe._id));
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
        validationSchema={validationSchema}
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

export default RecipeForm;
