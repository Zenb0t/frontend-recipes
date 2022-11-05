import { ChangeEvent, useState } from "react";
import {
    Avatar,
    Box,
    Flex,
    Input,
    InputGroup,
    InputLeftElement,
    Text,
    useColorModeValue,
    Icon,
} from "@chakra-ui/react";
import { IngredientModel } from "../features/recipeBook/models";
import { MdSearch } from "react-icons/md";
import { useAppSelector } from "../app/hooks";
import { selectIngredientList } from "../features/recipeBook/ingredient-slice";


export function SearchIngredientsFromStore() {

    //Selectors
    const ingredients = useAppSelector(selectIngredientList);

    //State
    const [searchValue, setSeachValue] = useState("");
    const searchResults = searchValue === ""
        ? []
        : ingredients.filter(
            (ing) => ing.name.toLowerCase().includes(searchValue.toLowerCase()));

    // Handlers

    const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
        setSeachValue(event.target.value);
    };

    const IngredientListItem = (props: { ing: IngredientModel; key: any }) => {
        return (
            <Flex p={2} alignItems="center">
                <Avatar name={props.ing.name} src="htto://" />
                <Text pl={2}>{props.ing.name}</Text>
            </Flex>
        );
    };

    return (
        <Flex pt={4} align="center" justify="center">
            <Box bg={useColorModeValue("white", "gray.800")} p={6} rounded="md" w="md">
                <InputGroup size="md">
                    <InputLeftElement pointerEvents="none" children={<Icon as={MdSearch} zIndex={1} />} />
                    <Input
                        type="text"
                        placeholder="Search Ingredients"
                        value={searchValue}
                        onChange={handleSearch}
                    />
                </InputGroup>
                {searchResults.map((ing, i) => (
                    <IngredientListItem key={i} ing={ing} />
                ))}
            </Box>
        </Flex>
    );
}