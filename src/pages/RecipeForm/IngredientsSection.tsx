import React from "react";
import { Field, FieldArray, useFormikContext } from "formik";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Box,
  Flex,
  IconButton,
  FormErrorMessage,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { Recipe, IngredientItem } from "../../types/recipe";
import { MeasuringUnit, Ingredient } from "../../types/ingredient";

const IngredientsSection = () => {
  const { values, setFieldValue, errors, touched } = useFormikContext<Recipe>();

  const getIngredientError = (index: number, field: string) => {
    const touchedField = touched.ingredients?.[index] as any;
    const errorsField = errors.ingredients?.[index] as any;
    return touchedField?.[field] && errorsField?.[field]
      ? errorsField[field]
      : null;
  };

  return (
    <Box p={4}>
      <FormLabel>Ingredients</FormLabel>
      <FieldArray name="ingredients">
        {({ push, remove }) => (
          <>
            {values.ingredients.map((ingredient, index) => (
              <Flex key={index} align="center" mb={4}>
                {/* Quantity */}
                <FormControl
                  isInvalid={!!getIngredientError(index, "quantity")}
                  mr={2}
                >
                  <Field
                    as={Input}
                    type="number"
                    name={`ingredients[${index}].quantity`}
                    placeholder="Quantity"
                  />
                  <FormErrorMessage>
                    {getIngredientError(index, "quantity")}
                  </FormErrorMessage>
                </FormControl>

                {/* Measuring Unit */}
                <FormControl
                  isInvalid={!!getIngredientError(index, "measuringUnit")}
                  mr={2}
                >
                  <Field
                    as={Select}
                    name={`ingredients[${index}].measuringUnit`}
                  >
                    {Object.values(MeasuringUnit).map((unit) => (
                      <option key={unit} value={unit}>
                        {unit}
                      </option>
                    ))}
                  </Field>
                  <FormErrorMessage>
                    {getIngredientError(index, "measuringUnit")}
                  </FormErrorMessage>
                </FormControl>

                {/* Ingredient Name */}
                <FormControl
                  isInvalid={!!getIngredientError(index, "ingredient.name")}
                  mr={2}
                >
                  <Field
                    as={Input}
                    name={`ingredients[${index}].ingredient.name`}
                    placeholder="Ingredient name"
                  />
                  <FormErrorMessage>
                    {getIngredientError(index, "ingredient.name")}
                  </FormErrorMessage>
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
            <Button
              mt={2}
              onClick={() =>
                push({
                  ingredient: {
                    name: "",
                    measuringUnit: MeasuringUnit.GRAM,
                    amount: 1,
                  },
                  quantity: 1,
                  measuringUnit: "gram",
                })
              }
            >
              Add Ingredient
            </Button>
          </>
        )}
      </FieldArray>
    </Box>
  );
};

export default IngredientsSection;
