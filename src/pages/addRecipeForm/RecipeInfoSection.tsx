import { Field } from "formik";
import {
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Box,
  Flex,
  Stack,
  useBreakpointValue,
} from "@chakra-ui/react";
import { ImageURLFormField } from "../../components/fileUpload";

const RecipeInfoSection = () => {
  const isStacked = useBreakpointValue({ base: true, md: false });

  return (
    <Stack direction={isStacked ? "column" : "row"} spacing={4} p={4}>
      <Box flex="1">
        {/* Title Field */}
        <FormControl isRequired mb={4}>
          <FormLabel htmlFor="title">Title</FormLabel>
          <Field
            as={Input}
            id="title"
            name="title"
            placeholder="Enter recipe title"
          />
        </FormControl>

        {/* Description Field */}
        <FormControl isRequired mb={4}>
          <FormLabel htmlFor="description">Description</FormLabel>
          <Field
            as={Textarea}
            id="description"
            name="description"
            placeholder="Enter recipe description"
          />
        </FormControl>

        {/* Source URL Field */}
        <FormControl mb={4}>
          <FormLabel htmlFor="sourceUrl">Source URL</FormLabel>
          <Field
            as={Input}
            id="sourceUrl"
            name="sourceUrl"
            placeholder="Enter source URL"
          />
        </FormControl>
      </Box>

      <Box flex="1">
        {/* Image URL Field */}
        <FormControl mb={4}>
          <FormLabel htmlFor="imageUrl">Image URL</FormLabel>
          <Field
            component={ImageURLFormField}
            id="imageUrl"
            name="imageUrl"
            variant="filled"
          />
        </FormControl>
      </Box>
    </Stack>
  );
};

export default RecipeInfoSection;
