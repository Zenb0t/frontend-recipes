import React from "react";
import { useField } from "formik";
import {
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  Box,
} from "@chakra-ui/react";

const TimingSection = () => {
  const [totalTimeInMinutesField, , totalTimeInMinutesHelpers] = useField("totalTimeInMinutes");
  const [costField, , costHelpers] = useField("cost");

  return (
    <Box p={4}>
      {/* Total Time in Minutes */}
      <FormControl isRequired mb={4}>
        <FormLabel htmlFor="totalTimeInMinutes">Total Time (in minutes)</FormLabel>
        <NumberInput
          id="totalTimeInMinutes"
          {...totalTimeInMinutesField}
          min={1}
          onChange={(val) => totalTimeInMinutesHelpers.setValue(val)}
        >
          <NumberInputField />
        </NumberInput>
      </FormControl>

      {/* Cost (Optional) */}
      {/* <FormControl mb={4}>
        <FormLabel htmlFor="cost">Cost (Optional)</FormLabel>
        <NumberInput
          id="cost"
          {...costField}
          min={0}
          onChange={(val) => costHelpers.setValue(val)}
        >
          <NumberInputField />
        </NumberInput>
      </FormControl> */}
    </Box>
  );
};

export default TimingSection;
