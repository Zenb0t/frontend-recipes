import { Field, useField } from "formik";
import {
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Box,
  Stack,
  useBreakpointValue,
  FormErrorMessage,
} from "@chakra-ui/react";
import { ImageURLFormField } from "../../components/fileUpload";

const RecipeInfoSection = () => {
  const isStacked = useBreakpointValue({ base: true, md: false });

  // UseField hooks for each field
  const [titleField, titleMeta] = useField("title");
  const [descriptionField, descriptionMeta] = useField("description");
  const [sourceUrlField, sourceUrlMeta] = useField("sourceUrl");
  const [imageUrlField, imageUrlMeta] = useField("imageUrl");

  return (
    <Stack direction={isStacked ? "column" : "row"} spacing={4} p={4}>
      <Box flex="1">
        {/* Title Field */}
        <FormControl
          isRequired
          mb={4}
          isInvalid={titleMeta.touched && !!titleMeta.error}
        >
          <FormLabel htmlFor="title">Title</FormLabel>
          <Field
            {...titleField}
            as={Input}
            id="title"
            placeholder="Enter recipe title"
          />
          <FormErrorMessage>{titleMeta.error}</FormErrorMessage>
        </FormControl>

        {/* Description Field */}
        <FormControl
          isRequired
          mb={4}
          isInvalid={descriptionMeta.touched && !!descriptionMeta.error}
        >
          <FormLabel htmlFor="description">Description</FormLabel>
          <Field
            {...descriptionField}
            as={Textarea}
            id="description"
            placeholder="Enter recipe description"
          />
          <FormErrorMessage>{descriptionMeta.error}</FormErrorMessage>
        </FormControl>

        {/* Source URL Field */}
        <FormControl
          mb={4}
          isInvalid={sourceUrlMeta.touched && !!sourceUrlMeta.error}
        >
          <FormLabel htmlFor="sourceUrl">Source URL</FormLabel>
          <Field
            {...sourceUrlField}
            as={Input}
            id="sourceUrl"
            placeholder="Enter source URL"
          />
          <FormErrorMessage>{sourceUrlMeta.error}</FormErrorMessage>
        </FormControl>
      </Box>

      <Box flex="1">
        {/* Image URL Field */}
        <FormControl
          mb={4}
          isInvalid={imageUrlMeta.touched && !!imageUrlMeta.error}
        >
          <FormLabel htmlFor="imageUrl">Image URL</FormLabel>
          <Field
            {...imageUrlField}
            component={ImageURLFormField}
            id="imageUrl"
            variant="filled"
          />
          <FormErrorMessage>{imageUrlMeta.error}</FormErrorMessage>
        </FormControl>
      </Box>
    </Stack>
  );
};

export default RecipeInfoSection;
