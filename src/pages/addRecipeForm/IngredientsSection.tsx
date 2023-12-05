import React from 'react';
import { Field, FieldArray, useFormikContext } from 'formik';
import { Button, FormControl, FormLabel, Input, Select, Box, Flex, IconButton } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
import { Recipe, IngredientItem } from '../../types/recipe';
import { MeasuringUnit, Ingredient } from '../../types/ingredient';

const IngredientsSection = () => {
    const { values, setFieldValue } = useFormikContext<Recipe>();

    return (
        <Box p={4}>
            <FormLabel>Ingredients</FormLabel>
            <FieldArray name="ingredients">
                {({ push, remove }) => (
                    <>
                        {values.ingredients.map((ingredient, index) => (
                            <Flex key={index} align="center" mb={4}>
                                {/* Ingredient Name */}
                                <FormControl mr={2}>
                                    <Field as={Input} name={`ingredients[${index}].ingredient.name`} placeholder="Ingredient name" />
                                </FormControl>

                                {/* Quantity */}
                                <FormControl mr={2}>
                                    <Field as={Input} type="number" name={`ingredients[${index}].quantity`} placeholder="Quantity" />
                                </FormControl>

                                {/* Measuring Unit */}
                                <FormControl mr={2}>
                                    <Field as={Select} name={`ingredients[${index}].measuringUnit`}>
                                        {Object.values(MeasuringUnit).map(unit => (
                                            <option key={unit} value={unit}>{unit}</option>
                                        ))}
                                    </Field>
                                </FormControl>

                                {/* Remove Button */}
                                <IconButton
                                    aria-label="Remove ingredient"
                                    icon={<CloseIcon />}
                                    onClick={() => remove(index)}
                                />
                            </Flex>
                        ))}

                        {/* Add Ingredient Button */}
                        <Button mt={2} onClick={() => push({ ingredient: { name: '', measuringUnit: MeasuringUnit.GRAM, amount: 0 }, quantity: 1, measuringUnit: 'gram' })}>
                            Add Ingredient
                        </Button>
                    </>
                )}
            </FieldArray>
        </Box>
    );
};

export default IngredientsSection;
