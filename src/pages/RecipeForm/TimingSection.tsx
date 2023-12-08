import React from "react";
import { useField } from "formik";
import {
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  FormErrorMessage,
  Box,
} from "@chakra-ui/react";

const TimingSection = () => {
  const [
    totalTimeInMinutesField,
    totalTimeInMinutesMeta,
    totalTimeInMinutesHelpers,
  ] = useField("totalTimeInMinutes");
  const [servingsField, servingsMeta, servingsHelpers] = useField("servings");

  return (
    <Box p={4}>
      {/* Total Time in Minutes */}
      <FormControl
        isRequired
        mb={4}
        isInvalid={
          totalTimeInMinutesMeta.touched && !!totalTimeInMinutesMeta.error
        }
      >
        <FormLabel htmlFor="totalTimeInMinutes">
          Total Time (in minutes)
        </FormLabel>
        <NumberInput
          id="totalTimeInMinutes"
          {...totalTimeInMinutesField}
          min={1}
          onChange={(val) => totalTimeInMinutesHelpers.setValue(parseInt(val))}
        >
          <NumberInputField />
        </NumberInput>
        <FormErrorMessage>{totalTimeInMinutesMeta.error}</FormErrorMessage>
      </FormControl>

      {/* Servings */}
      <FormControl
        isRequired
        mb={4}
        isInvalid={servingsMeta.touched && !!servingsMeta.error}
      >
        <FormLabel htmlFor="servings">Servings</FormLabel>
        <NumberInput
          id="servings"
          {...servingsField}
          min={1}
          onChange={(val) => servingsHelpers.setValue(parseInt(val))}
        >
          <NumberInputField />
        </NumberInput>
        <FormErrorMessage>{servingsMeta.error}</FormErrorMessage>
      </FormControl>
    </Box>
  );
};

export default TimingSection;
