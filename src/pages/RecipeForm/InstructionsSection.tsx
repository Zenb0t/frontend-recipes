import React from "react";
import { Field, FieldArray, useFormikContext } from "formik";
import {
  Button,
  FormControl,
  FormLabel,
  Textarea,
  Box,
  Flex,
  IconButton,
  FormErrorMessage,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { Recipe } from "../../types/recipe";

const InstructionsSection = () => {
  const { values, errors, touched } = useFormikContext<Recipe>();

  const getInstructionError = (index: number) => {
    const touchedInstructions = touched.instructions as boolean[] | undefined;
    const errorsInstructions = errors.instructions as string[] | undefined;

    const touchedInstruction = touchedInstructions
      ? touchedInstructions[index]
      : false;
    const errorsInstruction = errorsInstructions
      ? errorsInstructions[index]
      : null;

    return touchedInstruction && errorsInstruction ? errorsInstruction : null;
  };

  return (
    <Box p={4}>
      <FormLabel>Instructions</FormLabel>
      <FieldArray name="instructions">
        {({ push, remove }) => (
          <>
            {values.instructions.map((instruction, index) => (
              <Flex key={index} align="center" mb={4}>
                {/* Instruction Text */}
                <FormControl
                  isInvalid={!!getInstructionError(index)}
                  flex="1"
                  mr={2}
                >
                  <Field
                    as={Textarea}
                    name={`instructions[${index}]`}
                    placeholder={`Step ${index + 1}`}
                  />
                  <FormErrorMessage>
                    {getInstructionError(index)}
                  </FormErrorMessage>
                </FormControl>

                {/* Remove Button */}
                <IconButton
                  aria-label="Remove instruction"
                  icon={<CloseIcon />}
                  onClick={() => remove(index)}
                />
              </Flex>
            ))}

            {/* Add Instruction Button */}
            <Button mt={2} onClick={() => push("")}>
              Add Step
            </Button>
          </>
        )}
      </FieldArray>
    </Box>
  );
};

export default InstructionsSection;
