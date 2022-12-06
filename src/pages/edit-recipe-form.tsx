import { Formik, Field, Form, } from "formik";
import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input,
    VStack,
    Textarea,
    useColorModeValue,
    useToast,
} from "@chakra-ui/react";
import { IngredientListBuilder, yup } from '../app/utils';
import { IngredientItem, RecipeModel } from "../features/recipeBook/models";
import { ImageURLFormField } from "../components/fileUpload";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { updateRecipe, selectRecipeById } from "../features/recipeBook/recipe-slice";
import AddIngredientField from "../components/add-ingredient-field";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { selectIngredientList } from "../features/recipeBook/ingredient-slice";


export function EditRecipePage() {

    let { recipeId } = useParams();

    //Hooks
    const dispatch = useAppDispatch();
    const recipe = useAppSelector((state) => selectRecipeById(state, recipeId!));
    const navigate = useNavigate();
    const toast = useToast();

    //Selectors

    const ingredients = useAppSelector(selectIngredientList);


    interface Values {
        title: string;
        description: string;
        hours: number;
        minutes: number;
        ingredients: { ingredientId: string, quantity: number }[];
        instructions: string;
        imageUrl: string;
        favorite: boolean;
        id: string;
        cost: number;
    }

    const initialValues: Values = {
        title: recipe!.title,
        description: recipe!.description,
        hours: recipe!.totalTime.hours,
        minutes: recipe!.totalTime.minutes,
        ingredients: IngredientIdListBuilder(recipe!.ingredients),
        //Split instructions into an array of strings
        instructions: recipe!.instructions.join(" "),
        imageUrl: recipe!.imageUrl,
        favorite: recipe!.favorite,
        id: recipe!.id,
        cost: recipe!.cost,
    };

    const recipeValidation = yup.object({
        title: yup.string().required('Required'),
        description: yup.string().required('Required'),
        hours: yup.number().required('Required').max(24, 'Must be less than 24').min(-1, 'Must be positive'),
        minutes: yup.number().required('Required'),
        ingredients: yup.array().of(yup.object().shape({
            ingredientId: yup.string().required('Required'),
            quantity: yup.number().moreThan(0, 'Must be greater than 0').required('Required'),
        })),
        instructions: yup.string().required('Must provide instructions'),
        imageUrl: yup.string().required('Required'),
    });

    function validateIngredients(ingredients: { ingredientId: string, quantity: number }[]) {
        if (ingredients.length === 0) {
            return 'Must provide at least one ingredient';
        } else if (ingredients.some(ingredient => ingredient.ingredientId === '')) {
            return 'Must provide an ingredient';
        } else if (ingredients.some(ingredient => ingredient.quantity <= 0)) {
            return 'Must provide a quantity greater than 0';
        } else {
            return undefined;
        }
    }

       /***
     * Helper function to get a id Ingredient list from the recipe
     */

    function IngredientIdListBuilder(ingredients: IngredientItem[]) {
        let idList = ingredients.map((item) => { return { ingredientId: item.ingredient.id, quantity: item.quantity }; });
        return idList;
    }

    /***
     * Helper function to build the recipe object from the form values
     */

    function buildRecipe(values: Values): RecipeModel {
        const ingredientList = IngredientListBuilder(ingredients, values.ingredients);
        values.cost = ingredientList.reduce((sum, ing) => sum + ing.cost, 0);
        const time = { hours: values.hours, minutes: values.minutes };
        const instructions = values.instructions.split('\r\n');
        return { ...values, ingredients: ingredientList, totalTime: time, instructions: instructions, };
    }

    //Log the form values to the console
    useEffect (() => {
        console.log(initialValues);
    }, []);


    return (
        <Flex align="center" justify="center">
            <Box bg={useColorModeValue("white", "gray.800")} p={6} rounded="md" minW={{ base: 200, sm: 300, md: 440, lg: 700 }} mx={"auto"}>
                <Formik
                    initialValues={initialValues}
                    validationSchema={recipeValidation}
                    onSubmit={(values) => {
                        console.log("Submitting");
                        console.log(values);
                        const updatedRecipe = buildRecipe(values);
                        dispatch(updateRecipe(updatedRecipe)).then((status) => {
                            if (status) {
                                toast({
                                    title: "Recipe Updated",
                                    description: "Your recipe has been updated",
                                    status: "success",
                                    duration: 5000,
                                    isClosable: true,
                                });
                                navigate(`/recipes/${updatedRecipe.id}`, { replace: true });
                            } else {
                                toast({
                                    title: "Error",
                                    description: "There was an error updating your recipe",
                                    status: "error",
                                    duration: 5000,
                                    isClosable: true,
                                });
                            }
                        });
                    }}
                >
                    {({ handleSubmit, errors, touched }) => (
                        <Form onSubmit={handleSubmit}>
                            <VStack spacing={4} align="flex-start">
                                <FormControl isInvalid={!!errors.title && touched.title}>
                                    <FormLabel htmlFor="title">Recipe Title</FormLabel>
                                    <Field
                                        as={Input}
                                        id="title"
                                        name="title"
                                        type="title"
                                        variant="filled"
                                    />
                                    <FormErrorMessage>{errors.title}</FormErrorMessage>
                                </FormControl>
                                <FormControl isInvalid={!!errors.imageUrl && touched.imageUrl}>
                                    <FormLabel htmlFor="imageUrl">Image URL</FormLabel>
                                    <Field
                                        component={ImageURLFormField}
                                        id="imageUrl"
                                        name="imageUrl"
                                        variant="filled"
                                    />
                                    <FormErrorMessage>{errors.imageUrl}</FormErrorMessage>
                                </FormControl>
                                <FormControl isInvalid={!!errors.description && touched.description}>
                                    <FormLabel htmlFor="Description">Description</FormLabel>
                                    <Field
                                        as={Textarea}
                                        id="description"
                                        name="description"
                                        type="description"
                                        variant="filled"
                                    />
                                    <FormErrorMessage>{errors.description}</FormErrorMessage>
                                </FormControl>
                                <Flex gap={4}>
                                    <FormControl isInvalid={!!errors.hours && touched.hours}>
                                        <FormLabel htmlFor="Hours">Hours</FormLabel>
                                        <Field
                                            as={Input}
                                            id="hours"
                                            name="hours"
                                            type="hours"
                                            variant="filled"
                                        />
                                        <FormErrorMessage>{errors.hours}</FormErrorMessage>
                                    </FormControl>
                                    <FormControl isInvalid={!!errors.minutes && touched.minutes}>
                                        <FormLabel htmlFor="Minutes">Minutes</FormLabel>
                                        <Field
                                            as={Input}
                                            id="minutes"
                                            name="minutes"
                                            type="minutes"
                                            variant="filled"
                                        />
                                        <FormErrorMessage>{errors.minutes}</FormErrorMessage>
                                    </FormControl>
                                </Flex>
                                <FormControl isInvalid={!!errors.instructions && touched.instructions}>
                                    <FormLabel htmlFor="instructions">Instructions</FormLabel>
                                    <Field
                                        as={Textarea}
                                        id="instructions"
                                        name="instructions"
                                        type="instructions"
                                        variant="filled"
                                    />
                                    <FormErrorMessage>{errors.instructions}</FormErrorMessage>
                                </FormControl>
                                <FormControl isInvalid={!!errors.ingredients && touched.ingredients as boolean | undefined}>
                                    <FormLabel htmlFor="ingredients">Ingredients</FormLabel>
                                    <Field
                                        component={AddIngredientField}
                                        id="ingredients"
                                        name="ingredients"
                                        type="ingredients"
                                        variant="filled"
                                        validate={validateIngredients}
                                    />
                                    <FormErrorMessage>{errors.ingredients as string | undefined}</FormErrorMessage>
                                </FormControl>
                                <Button type="submit" colorScheme="green" width="full">
                                    Submit
                                </Button>
                            </VStack>
                        </Form>
                    )}
                </Formik>
            </Box>
        </Flex>
    );
}
