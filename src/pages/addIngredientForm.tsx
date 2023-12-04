import { useColorModeValue, VStack, FormControl, FormLabel, Input, FormErrorMessage, Tooltip, Icon, ButtonGroup, Button, Box, } from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import { FaRegQuestionCircle } from "react-icons/fa";
import { useAppDispatch } from "../app/hooks";
import { yup } from "../app/utils";
import { createIngredient } from "../features/recipeBook/ingredient-slice";
import { IngredientModel } from "../features/recipeBook/models";
import { v4 as uuid } from 'uuid';

interface AddIngredientFormProps {
    onClose?: () => void;
    handleAddIngredient?: (ingredient: IngredientModel, quantity: number) => void;
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
    interface Values {
        name: string;
        amount: number;
        measuringUnit: string;
        cost: number;
        unitCost: number;
        id: string;
        quantity: number;
    }

    const initialValues: Values = {
        name: "",
        amount: 0,
        measuringUnit: "",
        cost: 0,
        unitCost: 0,
        id: uuid(),
        quantity: 0,
    };

    const ingredientValidation = yup.object().shape({
        name: yup.string().required("Name is required"),
        amount: yup.number().required("Amount is required").moreThan(0, "Amount must be greater than 0"),
        measuringUnit: yup.string().required("Measuring unit is required"),
        cost: yup.number().required("Cost is required").moreThan(0, "Amount must be greater than 0"),
    });

    return (
        <Box bg={useColorModeValue("white", "gray.800")}>
            <Formik
                initialValues={initialValues}
                validationSchema={ingredientValidation}
                onSubmit={(values, actions) => {
                    values.unitCost = values.cost / values.amount;
                    const newIngredient: IngredientModel = { ...values }
                    dispatch(createIngredient(newIngredient));
                    if (handleAddIngredient) {
                        handleAddIngredient(newIngredient, values.quantity);
                    } 
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
                            <FormControl isInvalid={!!errors.cost && touched.cost}>
                                <FormLabel htmlFor="cost">Cost</FormLabel>
                                <Field
                                    as={Input}
                                    id="cost"
                                    name="cost"
                                    type="cost"
                                    variant="filled"
                                    textAlign={"right"}
                                />
                                <FormErrorMessage>{errors.cost}</FormErrorMessage>
                            </FormControl>
                            {handleAddIngredient && (
                                <FormControl isInvalid={!!errors.quantity && touched.quantity}>
                                    <FormLabel htmlFor="quantity">Quantity</FormLabel>
                                    <Field
                                        as={Input}
                                        id="quantity"
                                        name="quantity"
                                        type="quantity"
                                        variant="filled"
                                        textAlign={"right"}
                                    />
                                    <FormErrorMessage>{errors.quantity}</FormErrorMessage>
                                </FormControl>
                            )}
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