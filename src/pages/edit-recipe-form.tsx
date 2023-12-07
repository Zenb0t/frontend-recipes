import { Formik, Form, } from "formik";
import {
    Box,
    Button,
    Flex,
    useColorModeValue,
    useToast,
    Divider,
} from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { updateRecipe, selectRecipeById } from "../features/recipeBook/recipe-slice";
import { useNavigate, useParams } from "react-router-dom";
import { selectIngredientList } from "../features/recipeBook/ingredient-slice";
import { Recipe, recipeValidationSchema } from "../types/recipe";
import RecipeInfoSection from "./RecipeForm/RecipeInfoSection";
import { unwrapResult } from "@reduxjs/toolkit";
import IngredientsSection from "./RecipeForm/IngredientsSection";
import InstructionsSection from "./RecipeForm/InstructionsSection";
import TimingSection from "./RecipeForm/TimingSection";


export function EditRecipePage() {

    let { recipeId } = useParams();
    //Hooks
    const dispatch = useAppDispatch();
    const recipe = useAppSelector((state) => selectRecipeById(state, recipeId!));
    const navigate = useNavigate();
    const toast = useToast();

    //Selectors

    const initialValues: Recipe = {
        title: recipe?.title || "",
        description: recipe?.description || "",
        totalTimeInMinutes: recipe?.totalTimeInMinutes || 0,
        ingredients: recipe?.ingredients || [],
        instructions: recipe?.instructions || [],
        imageUrl: recipe?.imageUrl || "",
        ownerId: recipe?.ownerId || "", // This should be set based on the user's session or similar
        sourceUrl: recipe?.sourceUrl || "",
    };

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
            navigate(`/recipes/${newRecipe._id}`);
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
};

