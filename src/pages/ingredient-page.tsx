import { Box, Button, FormControl, FormErrorMessage, FormLabel, Icon, Input, Tooltip, useColorModeValue, VStack } from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { IngredientListTable } from "../components/ingredient-table";
import { SearchIngredient } from "../components/search-ingredient";
import { demoList } from "../services/fake-data";
import { yup } from '../app/utils';
import { FaRegQuestionCircle } from "react-icons/fa";
import { IngredientItem, IngredientModel } from "../features/recipeBook/models";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { createIngredient, selectIngredientList } from "../features/recipeBook/ingredient-slice";

export function IngredientPage() {

    const storeIngredients = useAppSelector(selectIngredientList);

    return (
        <Box
            shadow="md"
            bg={useColorModeValue("white", "gray.800")}
            borderRadius="lg">
            <Box bg={useColorModeValue("white", "gray.800")} p={6} rounded="md" minW={{ base: 200, sm: 300, md: 440, lg: 700 }} mx={"auto"}>
                <IngredientListTable ingredients={storeIngredients} />
            </Box>
            <SearchIngredient list={storeIngredients} />
        </Box>
    );
}


export function AddIngredientForm({ onClose: handleClose}: { onClose: () => void }) {
    
    const dispatch = useAppDispatch();

    interface Values {
        name: string;
        amount: number;
        measuringUnit: string;
        cost: number;
        unitCost: number;
        id: string;
    }

    const initialValues: Values = {
        name: "",
        amount: 0,
        measuringUnit: "",
        cost: 0,
        unitCost: 0,
        id: ""
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
                onSubmit={(values) => {
                    values.unitCost = values.cost / values.amount;
                    const newIngredient: IngredientModel = {...values}
                    dispatch(createIngredient(newIngredient));
                    handleClose();
                }}
            >
                {({ handleSubmit, errors, touched }) => (
                    <VStack spacing={4} align="center">
                        <Form onSubmit={handleSubmit}>
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
                            <Button type="submit" colorScheme="green" width="full">
                                Submit
                            </Button>
                        </Form>
                    </VStack>
                )}
            </Formik>
        </Box>
    );
}