import { useDisclosure, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Box, Center } from "@chakra-ui/react";
import { IngredientModel } from "../features/recipeBook/models";
import { AddIngredientForm } from "../pages/add-ingredient-form";

interface AddIngredientModalProps {
    handleAddIngredient: (ingredient: IngredientModel, quantity: number) => void;
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
                <ModalContent>
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