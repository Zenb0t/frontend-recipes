import {
    Flex,
    Avatar,
    CloseButton,
    Input,
    Center,
    Button,
    useColorModeValue,
    InputGroup,
    InputLeftElement,
    Icon,
    Divider,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    Text,
    Box,
    Stack,
} from "@chakra-ui/react";
import { FieldProps } from "formik";
import { useState, ChangeEvent, useEffect } from "react";
import { MdSearch } from "react-icons/md";
import { useAppSelector } from "../app/hooks";
import { selectIngredientList } from "../features/recipeBook/ingredient-slice";
import { IngredientItem, IngredientModel } from "../features/recipeBook/models";
import { AddIngredientForm } from "../pages/add-ingredient-form";


/***
 * Adds a list of ingredients id and quantities to the [Formik] form field.
 * 
 */
export default function AddIngredientField({ field, form }: FieldProps) {

    type IdList = { ingredientId: string, quantity: number }[];

    //Selectors

    const ingredients = useAppSelector(selectIngredientList);

    //State

    const [ingredientList, setIngredientList] = useState<IngredientItem[]>([]);
    const [searchValue, setSeachValue] = useState("");
    const [ingredientIdList, setIngredientIdList] = useState<IdList>([]);
    const searchResults = searchValue === ""
        ? []
        : ingredients.filter(
            (ing) => ing.name.toLowerCase().includes(searchValue.toLowerCase()) && !ingredientIdList.some((item) => item.ingredientId === ing.id));

    // Handlers

    const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
        setSeachValue(event.target.value);
    };

    const handleAddToIdList = (ingredients: IngredientItem[]) => {
        let idList = ingredients.map((item) => {
            let value = { ingredientId: item.ingredient.id, quantity: item.quantity };
            return value;
        });
        setIngredientIdList(idList);
    };

    const handleAddIngredient = (ingredient: IngredientModel, quantity: number) => {
        if (ingredientList.some((item) => item.ingredient.id === ingredient.id)) {
            console.log("Ingredient already in the list"); //TODO: Replace with toast?
            return;
        }
        const newIngredient: IngredientItem = new IngredientItem(ingredient, quantity);
        const newIngredientList = [...ingredientList, newIngredient];
        setIngredientList(newIngredientList);
        handleAddToIdList(newIngredientList);
    };

    const handleRemoveIngredient = (ingredient: IngredientModel) => {
        const newIngredientList = ingredientList.filter((item) => item.ingredient.id !== ingredient.id);
        setIngredientList(newIngredientList);
        handleAddToIdList(newIngredientList);
    };


    //Disabled linting as form should not cause a change in this component and field.name is constant
    useEffect(() => {
        form.setFieldValue(field.name, ingredientIdList);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ingredientIdList]);


    // Local UI Components

    const IngredientListItem = (props: { ing: IngredientModel, key: any }) => {
        const [quantity, setQuantity] = useState(0);
        const [errorMsg, setErrorMsg] = useState<string | undefined>(undefined)

        const handleQuantityChange = (e: ChangeEvent<HTMLInputElement>) => {
            const value = Number(e.target.value);
            if (value < 0) {
                setErrorMsg("Quantity must be greater than 0");
                return;
            }
            setErrorMsg(undefined);
            setQuantity(value);
        };

        const handleAdd = () => {
            if (quantity > 0) {
                setErrorMsg("");
                handleAddIngredient(props.ing, quantity);
            } else {
                setErrorMsg("Quantity must be greater than 0");
            }
        };

        return (
            <Box>
                <Flex p={2} alignItems="center" >
                    <Avatar name={props.ing.name} src="htto://" />
                    <Text pl={2}>{props.ing.name}</Text>
                    {ingredientList.some((item) => item.ingredient.id === props.ing.id) ?
                        <Flex ml='auto'>
                            <CloseButton onClick={() => handleRemoveIngredient(props.ing)} />
                        </Flex> :
                        <Flex ml='auto' >
                            <Input
                                isInvalid={!!errorMsg}
                                textAlign={"right"}
                                w={20}
                                type="number"
                                value={quantity}
                                onChange={handleQuantityChange}
                                onKeyUpCapture={(e) => {
                                    if (e.key === "Enter") handleAdd();
                                }}
                            />
                            <Center>
                                <Text verticalAlign={'middle'} minW={"30px"} pl={2}>{props.ing.measuringUnit}</Text>
                            </Center>
                            <Button
                                ml={4}
                                onClick={handleAdd}
                            >
                                Add
                            </Button>
                        </Flex>
                    }
                </Flex >
                {errorMsg && <Text color="red.500">{errorMsg}</Text>}
            </Box>
        );
    };

    const AddedIngredientItem = (props: { item: IngredientItem; key: any }) => {
        const item = props.item;
        return (
            <Flex p={2} alignItems="center">
                <Avatar name={item.ingredient.name} src="htto://" />
                <Text pl={2}>{item.ingredient.name}</Text>
                <Flex ml='auto'>
                    <Center>
                        <Text>{item.quantity}</Text>
                        <Text verticalAlign={'middle'} minW={"30px"} ml={2}>{item.ingredient.measuringUnit}</Text>
                    </Center>
                    <CloseButton ml={2} onClick={() => handleRemoveIngredient(item.ingredient)} />
                </Flex>
            </Flex>
        );
    }


    //TODO: Review UI and style of the component
    return (
        <Flex pt={4} align="center" justify="center" bg={useColorModeValue("white", "gray.800")} rounded="md">
            <Stack>
                <InputGroup size="md">
                    <InputLeftElement pointerEvents="none" children={<Icon as={MdSearch} zIndex={1} />} />
                    <Input
                        type="text"
                        placeholder="Search Ingredients"
                        value={searchValue}
                        onChange={handleSearch}
                        variant="filled"
                    />
                </InputGroup>
                {searchResults.map((ing) => (
                    <IngredientListItem key={ing.id} ing={ing} />
                ))}
                <AddIngredientModal handleAddIngredient={handleAddIngredient}/>
                <Divider py={2} />
                <Center py={2}>
                    <Text fontSize="xl">Added Ingredients</Text>
                </Center>
                {ingredientList.map((item, i) => (
                    <AddedIngredientItem key={item.ingredient.id} item={item} />
                ))}
            </Stack>
        </Flex>
    );

}

interface AddIngredientModalProps {
    handleAddIngredient: (ingredient: IngredientModel, quantity: number) => void;
}
/***
 * Modal for adding a new ingredient to the database
 * 
  */
function AddIngredientModal({ handleAddIngredient }: AddIngredientModalProps) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <Box pb={2}>
            <Button onClick={onOpen} colorScheme="green" width="full">Add new ingredient</Button>
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
        </Box>
    )
}