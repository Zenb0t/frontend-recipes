import { useColorModeValue, VStack, FormControl, FormLabel, Input, FormErrorMessage, Tooltip, Icon, ButtonGroup, Button, Box, } from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import { FaRegQuestionCircle } from "react-icons/fa";
import { useAppDispatch } from "../hooks/reduxHooks";
import { yup } from "../app/utils";
import { createIngredient } from "../features/recipeBook/ingredient-slice";

import { v4 as uuid } from 'uuid';
import { Ingredient, MeasuringUnit } from "../types/ingredient";

interface AddIngredientFormProps {
    onClose?: () => void;
    handleAddIngredient?: (ingredient: Ingredient, quantity: number) => void;
}

/***
 * Form to add a new ingredient to the store list
 * Accepts an onClose function to close the containing modal.
 * if need to capture the ingredient after submission, pass in a handleAddIngredient function.
 */
export function AddIngredientForm({ onClose, handleAddIngredient }: AddIngredientFormProps) {

    //Redux
    const dispatch = useAppDispatch();

   //Formik
    const initialValues: Ingredient = {
        name: "",
        amount: 0,
        measuringUnit: MeasuringUnit.CUP,
    };

    const ingredientValidation = yup.object().shape({
        name: yup.string().required("Required"),
        amount: yup.number().required("Required").positive("Must be positive"),
        measuringUnit: yup.string().required("Required"),
    });

    return (
        <Box bg={useColorModeValue("white", "gray.800")}>
            <Formik
                initialValues={initialValues}
                validationSchema={ingredientValidation}
                onSubmit={(values, actions) => {
                    // const newIngredient: Ingredient = { ...values }
                    // dispatch(createIngredient(newIngredient));
                    // if (handleAddIngredient) {
                    //     handleAddIngredient(newIngredient, values.quantity);
                    // } 
                    if (onClose) {
                        onClose();
                    }
                    actions.resetForm();
                }}
            >
                {({ handleSubmit, errors, touched }) => (
                    <Form onSubmit={handleSubmit}>
                        <VStack spacing={4} align="center">
                            <FormControl isInvalid={!!errors.name && touched.name}>
                                <FormLabel htmlFor="name">Ingredient Name</FormLabel>
                                <Field
                                    as={Input}
                                    id="name"
                                    name="name"
                                    type="name"
                                    variant="filled"
                                />
                                <FormErrorMessage>{errors.name}</FormErrorMessage>
                            </FormControl>
                            <FormControl isInvalid={!!errors.amount && touched.amount}>
                                <Tooltip placement="top" label="Amount of ingredient in the package">
                                    <FormLabel htmlFor="amount">
                                        Amount
                                        <Icon ml={2} as={FaRegQuestionCircle} />
                                    </FormLabel>
                                </Tooltip>
                                <Field
                                    as={Input}
                                    id="amount"
                                    name="amount"
                                    type="amount"
                                    variant="filled"
                                    textAlign={"right"}
                                />
                                <FormErrorMessage>{errors.amount}</FormErrorMessage>
                            </FormControl>
                            <FormControl isInvalid={!!errors.measuringUnit && touched.measuringUnit}>
                                <FormLabel htmlFor="measuringUnit">Measuring Unit</FormLabel>
                                <Field
                                    as={Input}
                                    id="measuringUnit"
                                    name="measuringUnit"
                                    type="measuringUnit"
                                    variant="filled"
                                />
                                <FormErrorMessage>{errors.measuringUnit}</FormErrorMessage>
                            </FormControl>
                            <FormControl isInvalid={!!errors.costPerUnit && touched.costPerUnit}>
                                <FormLabel htmlFor="costPerUnit">Cost Per Unit</FormLabel>
                                <Field
                                    as={Input}
                                    id="cost"
                                    name="cost"
                                    type="cost"
                                    variant="filled"
                                    textAlign={"right"}
                                />
                                <FormErrorMessage>{errors.costPerUnit}</FormErrorMessage>
                            </FormControl>
                            <ButtonGroup spacing={4} >
                                <Button py={2} type="submit" colorScheme="green">
                                    Submit
                                </Button>
                                {onClose && <Button py={2} onClick={onClose} colorScheme="red"> Cancel </Button>}
                            </ButtonGroup>
                        </VStack>
                    </Form>
                )}
            </Formik>
        </Box>
    );
}