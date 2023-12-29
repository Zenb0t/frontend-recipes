import { Formik, Form, Field, useField } from "formik";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Button } from "@chakra-ui/button";
import { Box, Flex } from "@chakra-ui/layout";
import { useColorModeValue } from "@chakra-ui/color-mode";

const ImportRecipe = () => {
  const handleSubmit = (values: any) => {
    // Handle form submission here
    console.log(values);
  };

  return (
    <Box
      bg={useColorModeValue("white", "gray.800")}
      py={{ base: 4, lg: 8 }}
      rounded="md"
      minW={{ base: 280, lg: 700 }}
      mx={{ base: 1, lg: 4 }}
	  px={{ base: 4, lg: 8 }}
    >
      <Formik initialValues={{ recipeUrl: "" }} onSubmit={handleSubmit}>
        <Form>
          <Field name="Url">
            {({ field, form }: any) => (
              <FormControl
                isInvalid={form.errors.recipeUrl && form.touched.recipeUrl}
              >
                <FormLabel htmlFor="recipe">Recipe Url</FormLabel>
                <Input {...field} id="recipe" placeholder="Enter recipe URL" />
                <FormErrorMessage>{form.errors.recipeUrl}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Flex justify="space-around" mt={2}>
            <Button type="submit" colorScheme="green">
              Submit
            </Button>
          </Flex>
        </Form>
      </Formik>
    </Box>
  );
};

export default ImportRecipe;
