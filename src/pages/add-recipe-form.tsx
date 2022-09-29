import { Formik, Field } from "formik";
import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input,
    VStack,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper
} from "@chakra-ui/react";
import { yup } from '../app/utils';
import { IngredientModel } from "../features/recipeBook/models";

export function AddRecipePage() {

    interface Values {
        title: string;
        description: string;
        totalTime: string;
        ingredients: IngredientModel[];
        instructions: string[];
        imageUrl: string;
        favorite: boolean;
        id: string;
        cost: number;
    }

    const initialValues: Values = {
        title: '',
        description: '',
        totalTime: '',
        ingredients: [] as IngredientModel[],
        instructions: [] as string[],
        imageUrl: '',
        favorite: false,
        id: '',
        cost: 0,
    };

    const recipeValidation = yup.object({
        title: yup.string().required('Required'),
        description: yup.string().required('Required'),
        totalTime: yup.string().required('Required'),
        ingredients: yup.array().of(yup.object({
            name: yup.string().required('Required'),
            amount: yup.string().required('Required'),
            unit: yup.string().required('Required'),
        })).required('At least one ingredient is required'),
        instructions: yup.array().of(yup.string().required('Required')),
        imageUrl: yup.string().required('Required').url('Invalid URL'),
        cost: yup.number().required('Required').min(0, 'Must be greater than 0'),
    });

    return (
        <Flex bg="gray.100" align="center" justify="center">
            <Box bg="white" p={6} rounded="md" w="md">
                <Formik
                    initialValues={initialValues}
                    validationSchema={recipeValidation}
                    onSubmit={(values) => {
                        alert(JSON.stringify(values, null, 2));
                    }}
                >
                    {({ handleSubmit, errors, touched }) => (
                        <form onSubmit={handleSubmit}>
                            <VStack spacing={4} align="flex-start">
                                <FormControl>
                                    <FormLabel htmlFor="title">Recipe Title</FormLabel>
                                    <Field
                                        as={Input}
                                        id="title"
                                        name="title"
                                        type="title"
                                        variant="filled"
                                    />
                                </FormControl>
                                <Flex gap={4}>
                                    <FormControl>
                                        <FormLabel htmlFor="Hours">Hours</FormLabel>
                                        <NumberInput variant="filled" max={50} min={0}>
                                            <Field
                                                as={NumberInputField}
                                                id="hours"
                                                name="hours"
                                                type="hours"
                                                inputMode="numeric"
                                            />
                                            <NumberInputStepper>
                                                <NumberIncrementStepper />
                                                <NumberDecrementStepper />
                                            </NumberInputStepper>
                                        </NumberInput>
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel htmlFor="Hours">Min</FormLabel>
                                        <NumberInput variant="filled" max={59} min={0}>
                                            <Field
                                                as={NumberInputField}
                                                id="minutes"
                                                name="minutes"
                                                type="minutes"
                                                inputMode="numeric"
                                            />
                                            <NumberInputStepper>
                                                <NumberIncrementStepper />
                                                <NumberDecrementStepper />
                                            </NumberInputStepper>
                                        </NumberInput>
                                    </FormControl>
                                </Flex>
                                {/* <FormControl>
                                    <FormLabel htmlFor="email">Email Address</FormLabel>
                                    <Field
                                        as={Input}
                                        id="email"
                                        name="email"
                                        type="email"
                                        variant="filled"
                                    />
                                </FormControl>
                                <FormControl isInvalid={!!errors.password && touched.password}>
                                    <FormLabel htmlFor="password">Password</FormLabel>
                                    <Field
                                        as={Input}
                                        id="password"
                                        name="password"
                                        type="password"
                                        variant="filled"
                                        validate={(value) => {
                                            let error;

                                            if (value.length < 5) {
                                                error = "Password must contain at least 6 characters";
                                            }

                                            return error;
                                        }}
                                    />
                                    <FormErrorMessage>{errors.password}</FormErrorMessage>
                                </FormControl> */}
                                <Button type="submit" colorScheme="green" width="full">
                                    Login
                                </Button>
                            </VStack>
                        </form>
                    )}
                </Formik>
            </Box>
        </Flex>
    );
}
