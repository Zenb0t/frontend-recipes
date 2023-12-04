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
import { yup } from '../app/utils';
import { IngredientItem, RecipeModel } from "../features/recipeBook/models";
import { ImageURLFormField } from "../components/fileUpload";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { selectIngredientList } from "../features/recipeBook/ingredient-slice";
import { createRecipe } from "../features/recipeBook/recipe-slice";
import AddIngredientField from "../components/add-ingredient-field";
import { useNavigate } from "react-router-dom";
import AddInstructionField from "../components/add-instruction-field";


export function AddRecipePage() {

    //Hooks
    const dispatch = useAppDispatch();
    const storeIngredients = useAppSelector(selectIngredientList);
    const navigate = useNavigate();
    const toast = useToast();

    interface Values {
        title: string;
        description: string;
        hours: number;
        minutes: number;
        ingredients: { ingredientId: string, quantity: number }[];
        instructions: [];
        imageUrl: string;
        favorite: boolean;
        id: string;
        cost: number;
    }

    const initialValues: Values = {
        title: '',
        description: '',
        hours: 0,
        minutes: 0,
        ingredients: [],
        instructions: [],
        imageUrl: '',
        favorite: false,
        id: '',
        cost: 0,
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
        instructions: yup.array().of(yup.string().required('Required')),
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
 * Helper functions to build the ingredientList object from a list of values
 */
    function IngredientListBuilder(ingredients: { ingredientId: string, quantity: number }[]) {
        let ingredientList = ingredients.map((item) => {
            let ingredient = storeIngredients.find(ingredient => ingredient.id === item.ingredientId);
            if (ingredient) {
                let ingredientItem = new IngredientItem(ingredient, item.quantity);
                return ingredientItem;
            } else {
                throw new Error("Ingredient not found");
            }
        }
        );
        return ingredientList;
    }

    /***
     * Helper function to build the recipe object from a list of values
     */

    function buildRecipe(values: Values): RecipeModel {
        const ingredientList = IngredientListBuilder(values.ingredients);
        values.cost = ingredientList.reduce((sum, ing) => sum + ing.cost, 0);
        const time = { hours: values.hours, minutes: values.minutes };
        return { ...values, ingredients: ingredientList, totalTime: time, };
    }

    return (
        <Flex align="center" justify="center">
            <Box bg={useColorModeValue("white", "gray.800")} p={6} rounded="md" minW={{ base: 200, sm: 300, md: 440, lg: 700 }} mx={"auto"}>
                <Formik
                    initialValues={initialValues}
                    validationSchema={recipeValidation}
                    onSubmit={(values) => {
                        const newRecipe = buildRecipe(values);
                        dispatch(createRecipe(newRecipe)).then((res) => {
                            const id = res.meta.arg.id;
                            const requestStatus = res.meta.requestStatus;
                            if (requestStatus === "fulfilled") {
                                toast({
                                    title: "Recipe created",
                                    description: "Your recipe has been created",
                                    status: "success",
                                    duration: 5000,
                                    isClosable: true,
                                });
                                //Should navigate to the new recipe, not the list.
                                navigate(`/dashboard/${id}`, { replace: true });
                            } else if (requestStatus === "rejected") {
                                toast({
                                    title: "Error",
                                    description: "There was an error creating your recipe, please try again",
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
                                <Flex direction={{ base: "column", md: "row" }} justify="space-between" gap={4}>
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
                                    </VStack>
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
                                </Flex>
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
                                <FormControl isInvalid={!!errors.instructions && touched.instructions as boolean | undefined}>
                                    <FormLabel htmlFor="instructions">Instructions</FormLabel>
                                    <Field
                                        component={AddInstructionField}
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

