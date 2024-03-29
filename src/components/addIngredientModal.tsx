import { useDisclosure, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, useColorModeValue, Center } from "@chakra-ui/react";
import { AddIngredientForm } from "../pages/addIngredientForm";
import { Ingredient } from "../types/ingredient";

interface AddIngredientModalProps {
    handleAddIngredient?: (ingredient: Ingredient, quantity: number) => void;
}
/***
 * Modal for adding a new ingredient
 * 
  */
export default function AddIngredientModal({ handleAddIngredient }: AddIngredientModalProps) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <Center pb={2}>
            <Button onClick={onOpen} colorScheme="green">Add new ingredient</Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent bg={useColorModeValue("white", "gray.800")}>
                    <ModalHeader>Add new ingredient</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <AddIngredientForm handleAddIngredient={handleAddIngredient} onClose={onClose} />
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Center>
    )
}