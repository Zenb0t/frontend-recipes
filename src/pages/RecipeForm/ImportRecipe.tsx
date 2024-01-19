import { Formik, Form, Field, useFormikContext } from "formik";
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
import { clearRecipe, scrapeRecipe } from "../../features/recipeBook/scrapperSlice";
import { useEffect } from "react";
import RecipeInfoSection from "./RecipeInfoSection";
import { useToast, Divider, Spinner } from "@chakra-ui/react";
import { unwrapResult } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
import { createRecipe } from "../../features/recipeBook/recipeSlice";
import {
  ParsedRecipe,
  Recipe,
  recipeValidationSchema,
} from "../../types/recipe";
import IngredientsSection from "./IngredientsSection";
import InstructionsSection from "./InstructionsSection";
import TimingSection from "./TimingSection";
import { ReduxStatus } from "../../consts";
import {
  Ingredient,
  MEASURING_UNITS_MAPPING,
  ParsedIngredient,
} from "../../types/ingredient";

const ImportRecipe = () => {
  const dispatch = useAppDispatch();
  const scrapedRecipe = useAppSelector((state) => state.scrapper.recipe);
  const status = useAppSelector((state) => state.scrapper.status);

  const isReady = scrapedRecipe && status === ReduxStatus.SUCCESS;
  const isLoading = status === ReduxStatus.LOADING;

  const handleSubmit = (values: any) => {
    dispatch(scrapeRecipe(values.recipeUrl));
    // Handle form submission here
  };

  return (
    <>
      <Box
        bg={useColorModeValue("white", "gray.800")}
        py={{ base: 4, lg: 8 }}
        rounded={isReady ? "none" : "md"}
        borderTopRadius="md"
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
            <Flex justify="space-around" mt={2} py={4}>
              {isLoading ? (
                <Spinner size="xl" color="green" />
              ) : (
                <Button type="submit" colorScheme="green">
                  Submit
                </Button>
              )}
            </Flex>
          </Form>
        </Formik>
      </Box>
      {isReady && <EditImportedRecipeForm recipe={scrapedRecipe} />}
    </>
  );
};

interface EditRecipeFormProps {
  recipe: Partial<ParsedRecipe>;
}

const EditImportedRecipeForm = ({ recipe }: EditRecipeFormProps) => {
  //Hooks
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const toast = useToast();


  //Selectors
  const user = useAppSelector((state) => state.users.userInfo);

  const convertedIngredients = convertParsedIngredientsToIngredients(
    recipe?.ingredients || []
  );

  const imageUrl = recipe.imageUrl?.[0] ?? "";

  const initialValues: Recipe = {
    _id: recipe?._id || "",
    title: recipe?.title || "",
    description: recipe?.description || "",
    totalTimeInMinutes: recipe?.totalTimeInMinutes || 0,
    ingredients: convertedIngredients,
    instructions: recipe?.instructions || [],
    imageUrl: imageUrl,
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

      const newRecipe: Recipe = {
        title: values.title,
        description: values.description,
        totalTimeInMinutes: values.totalTimeInMinutes,
        ingredients: values.ingredients,
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
        title: "Imported Recipe saved!",
        description: "Your recipe has been saved",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      // Clear the form
      dispatch(clearRecipe());

      // Navigate to the new recipe page, assuming newRecipe contains the ID
      navigate(`/dashboard/recipe/${resultRecipe._id}`);
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
      borderBottomRadius="md"
      minW={{ base: 280, lg: 700 }}
      mx={{ base: 1, lg: 4 }}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={recipeValidationSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <>
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
          </>
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

export default ImportRecipe;
