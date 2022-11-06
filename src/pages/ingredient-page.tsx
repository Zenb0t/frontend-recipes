import { Box,  Input, InputGroup, InputLeftElement, useColorModeValue } from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";
import { MdSearch } from "react-icons/md";
import { useAppSelector } from "../app/hooks";
import { IngredientListTable } from "../components/ingredient-table";

import { selectIngredientList } from "../features/recipeBook/ingredient-slice";

export function IngredientPage() {

    const storeIngredients = useAppSelector(selectIngredientList);

    //State
    const [searchValue, setSeachValue] = useState("");
    const searchResults = searchValue === ""
        ? storeIngredients
        : storeIngredients.filter(
            (ing) => {
                //filter by all fields
                return ing.name.toLowerCase().includes(searchValue.toLowerCase())
                    || ing.amount.toString().toLowerCase().includes(searchValue.toLowerCase())
                    || ing.measuringUnit.toLowerCase().includes(searchValue.toLowerCase())
                    || ing.cost.toString().toLowerCase().includes(searchValue.toLowerCase())
            });
    // Handlers

    const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
        setSeachValue(event.target.value);
    };

    return (
        <Box
            shadow="md"
            bg={useColorModeValue("white", "gray.800")}
            borderRadius="lg">
            <Box p={4}>
                <InputGroup size="md">
                    <InputLeftElement pointerEvents="none" children={<MdSearch />} />
                    <Input
                        type="text"
                        placeholder="Search Ingredients"
                        value={searchValue}
                        onChange={handleSearch}
                        variant="filled"
                    />
                </InputGroup>
            </Box>
            <Box bg={useColorModeValue("white", "gray.800")} p={6} rounded="md" minW={{ base: 200, sm: 300, md: 440, lg: 700 }} mx={"auto"}>
                <IngredientListTable ingredients={searchResults} />
            </Box>
        </Box>
    );
}