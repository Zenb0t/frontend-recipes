import { useColorModeValue, Textarea, Box, Text, Flex, Button, Stack, Avatar, Spacer, } from "@chakra-ui/react";
import { FieldProps } from "formik";
import { useState, useEffect } from "react";


/***
 * Adds a list of instructions to the [Formik] form field.
 */

export default function AddInstructionField({ field, form }: FieldProps) {

    //State

    const [instructionList, setInstructionList] = useState<string[]>(form.values.instructions);
    const [instruction, setInstruction] = useState("");

    useEffect(() => {
        form.setFieldValue(field.name, instructionList);
    }, [instructionList]);

    const handleAddInstruction = () => {
        if (instruction.trim() === "") return;
        setInstructionList([...instructionList, instruction]);
        setInstruction("");
    };


    return (
        <>
            <Stack p={1}>
                <Textarea
                    variant="filled"
                    value={instruction}
                    onChange={(e) => {
                        setInstruction(e.target.value);
                    }}
                    onKeyDown={(event) => {
                        if (event.key === "Enter") {
                            handleAddInstruction();
                        }
                    }}
                />
                <Button
                    onClick={() => {
                        handleAddInstruction();
                    }}
                >
                    Add
                </Button>
            </Stack>
            {instructionList.map((instruction, index) => {

                let stepNumber = index + 1;

                return (
                    <Flex p={2} alignItems="center" wrap="wrap" >
                        <Box alignItems="center">
                            {/* eslint-disable-next-line react-hooks/rules-of-hooks */}
                            <Avatar name={stepNumber.toString()} bg={useColorModeValue("black", "gray.200")} color={useColorModeValue("white", "gray.800")} />
                            <Text pl={2} flexGrow={5} key={index}>{instruction}</Text>
                        </Box>
                        <Spacer />
                        <Button
                            ml='auto'
                            onClick={() => {
                                setInstructionList(instructionList.filter((item) => item !== instruction));
                            }}
                        >
                            X
                        </Button>
                    </Flex>
                );
            })}
        </>

    );
}