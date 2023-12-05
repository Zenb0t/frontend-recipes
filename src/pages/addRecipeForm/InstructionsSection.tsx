import React from 'react';
import { Field, FieldArray, FormikHelpers, useFormikContext } from 'formik';
import { Button, FormControl, FormLabel, Textarea, Box, Flex, IconButton } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
import { Recipe } from '../../types/recipe';

export interface InstructionsSectionProps {
	instructions: string[];
	setFieldValue: FormikHelpers<any>['setFieldValue'];
  }

  const InstructionsSection = () => {
    const { values, setFieldValue } = useFormikContext<Recipe>();

    return (
        <Box p={4}>
            <FormLabel>Instructions</FormLabel>
            <FieldArray name="instructions">
                {({ push, remove }) => (
                    <>
                        {values.instructions.map((instruction, index) => (
                            <Flex key={index} align="center" mb={4}>
                                {/* Instruction Text */}
                                <FormControl flex="1" mr={2}>
                                    <Field as={Textarea} name={`instructions[${index}]`} placeholder={`Step ${index + 1}`} />
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
                        <Button mt={2} onClick={() => push('')}>
                            Add Step
                        </Button>
                    </>
                )}
            </FieldArray>
        </Box>
    );
};

export default InstructionsSection;
