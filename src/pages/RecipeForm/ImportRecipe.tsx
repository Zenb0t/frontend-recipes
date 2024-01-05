import { Formik, Form, Field, useField } from "formik";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Button } from "@chakra-ui/button";
import { Box, Flex } from "@chakra-ui/layout";
import { useColorModeValue } from "@chakra-ui/color-mode";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { scrapeRecipe } from "../../features/recipeBook/scrapperSlice";
import { useEffect } from "react";
import RecipeInfoSection from "./RecipeInfoSection";
import { useToast, Divider } from "@chakra-ui/react";
import { unwrapResult } from "@reduxjs/toolkit";
import { useParams, useNavigate } from "react-router-dom";
import { updateRecipe } from "../../api/recipeApi";
import {
  createRecipe,
  selectRecipeById,
} from "../../features/recipeBook/recipeSlice";
import { Recipe, recipeValidationSchema } from "../../types/recipe";
import IngredientsSection from "./IngredientsSection";
import InstructionsSection from "./InstructionsSection";
import TimingSection from "./TimingSection";

const ImportRecipe = () => {
  const dispatch = useAppDispatch();
  const scrapedRecipe = useAppSelector((state) => state.scrapper.recipe);

  const handleSubmit = (values: any) => {
    console.log(values);
    dispatch(scrapeRecipe(values.recipeUrl));
    // Handle form submission here
  };

  useEffect(() => {
    console.log(scrapedRecipe);
  }, [scrapedRecipe]);

  return (
    <>
      <Box
        bg={useColorModeValue("white", "gray.800")}
        py={{ base: 4, lg: 8 }}
        rounded="md"
        minW={{ base: 280, lg: 700 }}
        mx={{ base: 1, lg: 4 }}
        px={{ base: 4, lg: 8 }}
      >
        <Formik initialValues={{ recipeUrl: "" }} onSubmit={handleSubmit}>
          <Form>
            <Field name="recipeUrl">
              {({ field, form }: any) => (
                <FormControl
                  isInvalid={form.errors.recipeUrl && form.touched.recipeUrl}
                >
                  <FormLabel htmlFor="recipe">Recipe Url</FormLabel>
                  <Input
                    {...field}
                    id="recipe"
                    placeholder="Enter recipe URL"
                  />
                  <FormErrorMessage>{form.errors.recipeUrl}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Flex justify="space-around" mt={2}>
              <Button type="submit" colorScheme="green">
                Submit
              </Button>
            </Flex>
          </Form>
        </Formik>
      </Box>
      {scrapedRecipe && <EditImportedRecipeForm recipe={scrapedRecipe} />}
    </>
  );
};

interface EditRecipeFormProps {
  recipe: Partial<Recipe>;
}

const EditImportedRecipeForm = ({ recipe }: EditRecipeFormProps) => {
  console.log("Recipe: ", recipe);
  //Hooks
  const dispatch = useAppDispatch();
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
    imageUrl: recipe?.imageUrl[0] || "",
    ownerId: recipe?.ownerId || "",
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
      const resultAction = await dispatch(createRecipe(values));
      const newRecipe: Recipe = unwrapResult(resultAction);

      // Show success toast
      toast({
        title: "Imported Recipe saved!",
        description: "Your recipe has been saved",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      // Navigate to the new recipe page, assuming newRecipe contains the ID
      navigate(`/dashboard/recipe/${newRecipe._id}`);
    } catch (err: any) {
      // Handle errors
      toast({
        title: "Failed to save recipe",
        description: err.message || "There was an error saving the recipe.",
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

export default ImportRecipe;
