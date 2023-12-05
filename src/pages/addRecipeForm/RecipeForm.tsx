import React from "react";
import { Formik, Form } from "formik";
import { Recipe, IngredientItem } from "../../types/recipe";
import RecipeInfoSection from "./RecipeInfoSection";
import IngredientsSection from "./IngredientsSection";
import InstructionsSection from "./InstructionsSection";
import TimingSection from "./TimingSection";
import {
  Box,
  Button,
  Divider,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";
import * as Yup from "yup";
import { MeasuringUnit } from "../../types/ingredient";

const initialValues: Recipe = {
  title: "",
  description: "",
  totalTimeInMinutes: 0,
  ingredients: [
    {
      ingredient: {
        name: "",
        measuringUnit: MeasuringUnit.TEASPOON,
        amount: 0,
      },
      quantity: 1,
      measuringUnit: MeasuringUnit.TEASPOON,
    },
  ],
  instructions: [""],
  imageUrl: "",
  ownerId: "", // This should be set based on the user's session or similar
  sourceUrl: "",
};

const validationSchema = Yup.object({
  title: Yup.string().required("Required"),
  description: Yup.string().required("Required"),
  totalTimeInMinutes: Yup.number()
    .required("Required")
    .positive("Must be positive"),
  ingredients: Yup.array().of(
    Yup.object({
      ingredient: Yup.object({
        name: Yup.string().required("Required"),
        measuringUnit: Yup.string().required("Required"),
        amount: Yup.number().required("Required").positive("Must be positive"),
      }),
    })
  ),
  instructions: Yup.array().of(Yup.string().required("Required")),
  imageUrl: Yup.string().required("Required"),
  ownerId: Yup.string().required("Required"),
  sourceUrl: Yup.string().url("Must be a valid URL"),
});

const RecipeForm = () => {
  const handleSubmit = (values: Recipe) => {
    // API call or state update
    console.log(values);
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
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue }) => (
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

export default RecipeForm;
