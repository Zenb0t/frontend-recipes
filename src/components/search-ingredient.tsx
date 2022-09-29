import { ChangeEvent, useState, useEffect } from "react";
import {
    Avatar,
    Box,
    Button,
    Divider,
    Flex,
    Input,
    InputGroup,
    InputLeftElement,
    Text,
    CloseButton,
    HStack,
    useNumberInput,
    VStack
} from "@chakra-ui/react";
import { IngredientItem, IngredientModel } from "../features/recipeBook/models";
import { MdSearch } from "react-icons/md";



//TODO: List should come from the store, when fully implemented
export function SearchIngredient(props: { list: IngredientModel[] }) {
    //TODO: Add to state the list of ingredients that are selected
    const [ingredientList, setIngredientList] = useState([] as IngredientModel[]); //TODO: Change to IngredientItem[]
    const [searchValue, setSeachValue] = useState("");

    const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
        setSeachValue(event.target.value);
    };

    const handleAddIngredient = (ingredient: IngredientModel) => {
        if (ingredientList.some((item) => item.id === ingredient.id)) {
            return;
        }
        const newIngredientList = [...ingredientList, ingredient];
        setIngredientList(newIngredientList);
    };

    const handleRemoveIngredient = (ingredient: IngredientModel) => {
        const newIngredientList = ingredientList.filter((item) => item.id !== ingredient.id);
        setIngredientList(newIngredientList);
    };

    //TODO: Add to state the quantity of the ingredient
    function QuantityButton() {
        const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
            useNumberInput({
                step: 1,
                defaultValue: 0,
                min: 1,
                max: 99,
                precision: 2,
                onChange(valueAsString, valueAsNumber) {
                    console.log(valueAsString, valueAsNumber);
                },
            })

        const inc = getIncrementButtonProps()
        const dec = getDecrementButtonProps()
        const input = getInputProps()

        return (
            <VStack maxW={100}>
                < Input {...input} />
                < HStack >
                    <Button {...dec}>-</Button>
                    <Button {...inc}>+</Button>
                </HStack >
            </VStack >
        )
    }

    const IngredientItem = (props: { ing: IngredientModel; key: any }) => {
        return (
            <Flex key={props.key} p={2} alignItems="center">
                <Avatar name={props.ing.name} src="htto://" />
                <Text pl={2}>{props.ing.name}</Text>
                {/**Show either the add or the close button */}
                {ingredientList.some((item) => item.id === props.ing.id) ? (
                    <Flex ml='auto'>
                        <QuantityButton />
                        <CloseButton onClick={() => handleRemoveIngredient(props.ing)} />
                    </Flex>
                ) : (
                    <Button ml='auto' onClick={() => handleAddIngredient(props.ing)}>Add</Button>
                )}
            </Flex>
        );
    };

    const AddedIngredientItem = (props: { ing: IngredientModel; key: any }) => {
        return (
            <Flex key={props.key} p={2} alignItems="center">
                <Avatar name={props.ing.name} src="htto://" />
                <Text pl={2}>{props.ing.name}</Text>
                <Flex ml='auto'>
                    <CloseButton onClick={() => handleRemoveIngredient(props.ing)} />
                </Flex>
            </Flex>
        );
    }

    const filteredList = props.list.filter((ing) => ing.name.toLowerCase().includes(searchValue.toLowerCase()));

    return (
        <Flex pt={4} bg="gray.100" align="center" justify="center">
            <Box bg="white" p={6} rounded="md" w="md">
                <InputGroup size="md">
                    <InputLeftElement pointerEvents="none" children={<MdSearch />} />
                    <Input
                        type="text"
                        placeholder="Search Ingredients"
                        value={searchValue}
                        onChange={handleSearch}
                    />
                </InputGroup>
                <Divider py={2} />
                {filteredList.map((ing, i) => (
                    <IngredientItem key={i} ing={ing} />
                ))}
                <Divider py={2} />
                {ingredientList.map((ing, i) => (
                    <AddedIngredientItem key={i} ing={ing} />
                ))}
            </Box>
        </Flex>
    );
}
