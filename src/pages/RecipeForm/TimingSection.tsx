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
  const [totalTimeInMinutesField, totalTimeInMinutesMeta, totalTimeInMinutesHelpers] = useField("totalTimeInMinutes");
  const [costField, costMeta, costHelpers] = useField("cost");

  return (
    <Box p={4}>
      {/* Total Time in Minutes */}
      <FormControl isRequired mb={4} isInvalid={totalTimeInMinutesMeta.touched && !!totalTimeInMinutesMeta.error}>
        <FormLabel htmlFor="totalTimeInMinutes">Total Time (in minutes)</FormLabel>
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

      {/* Cost (Optional) */}
      {/* <FormControl mb={4} isInvalid={costMeta.touched && !!costMeta.error}>
        <FormLabel htmlFor="cost">Cost (Optional)</FormLabel>
        <NumberInput
          id="cost"
          {...costField}
          min={0}
          onChange={(val) => costHelpers.setValue(val)}
        >
          <NumberInputField />
        </NumberInput>
        <FormErrorMessage>{costMeta.error}</FormErrorMessage>
      </FormControl> */}
    </Box>
  );
};

export default TimingSection;
