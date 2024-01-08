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
import { Recipe } from "../../types/recipe";
import { Ingredient, MeasuringUnit } from "../../types/ingredient";

const IngredientsSection = () => {
  const { values, setFieldValue, errors, touched } = useFormikContext<Recipe>();

  const getIngredientError = (index: number, field: string) => {
    const touchedField = touched.ingredients?.[index] as any;
    const errorsField = errors.ingredients?.[index] as any;
    return touchedField?.[field] && errorsField?.[field]
      ? errorsField[field]
      : null;
  };

  const renderIngredient = (index: number, remove: any) => {
    return (
      <Flex key={index} align="flex-start" mb={4}>
        {/* amount */}
        <FormControl isInvalid={!!getIngredientError(index, "amount")} mr={2}>
          <Field
            as={Input}
            type="number"
            name={`ingredients[${index}].amount`}
            placeholder="amount"
          />
          <FormErrorMessage>
            {getIngredientError(index, "amount")}
          </FormErrorMessage>
        </FormControl>

        {/* Measuring Unit */}
        <FormControl isInvalid={!!getIngredientError(index, "unit")} mr={2}>
          <Field as={Select} name={`ingredients[${index}].unit`}>
            {Object.values(MeasuringUnit).map((unit) => (
              <option key={unit} value={unit}>
                {unit}
              </option>
            ))}
          </Field>
          <FormErrorMessage>
            {getIngredientError(index, "unit")}
          </FormErrorMessage>
        </FormControl>

        {/* Ingredient Name */}
        <FormControl isInvalid={!!getIngredientError(index, "name")} mr={2}>
          <Field
            as={Input}
            name={`ingredients[${index}].name`}
            placeholder="Ingredient name"
          />
          <FormErrorMessage>
            {getIngredientError(index, "name")}
          </FormErrorMessage>
        </FormControl>

        {/* Remove Button */}
        <IconButton
          aria-label="Remove ingredient"
          icon={<CloseIcon />}
          onClick={() => remove(index)}
        />
      </Flex>
    );
  };

  return (
    <Box p={4}>
      <FormLabel>Ingredients</FormLabel>
      <FieldArray name="ingredients">
        {({ push, remove }) => (
          <>
            {values.ingredients.map((_, index) =>
              renderIngredient(index, remove)
            )}
            {/* Add Ingredient Button */}
            <Button
              mt={2}
              onClick={() =>
                push({
                  name: "",
                  measuringUnit: MeasuringUnit.TEASPOON,
                  amount: 1,
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
