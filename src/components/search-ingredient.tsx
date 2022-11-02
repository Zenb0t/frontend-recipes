import { ChangeEvent, useState } from "react";
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
    useColorModeValue,
    Center,
    Icon,
} from "@chakra-ui/react";
import { IngredientItem, IngredientModel } from "../features/recipeBook/models";
import { MdSearch } from "react-icons/md";





//TODO: Refactor this component to use the store and be simpler
export function SearchIngredient(props: { list: IngredientModel[] }) {
    //TODO: Add to state the list of ingredients that are selected
    const [ingredientList, setIngredientList] = useState([] as IngredientItem[]);
    const [searchValue, setSeachValue] = useState("");
    const searchResults = searchValue === ""
        ? []
        : props.list.filter(
            (ing) => ing.name.toLowerCase().includes(searchValue.toLowerCase()) && !ingredientList.some((item) => item.ingredient.id === ing.id));

    const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
        setSeachValue(event.target.value);
    };

    const handleAddIngredient = (ingredient: IngredientModel, quantity: number) => {
        if (ingredientList.some((item) => item.ingredient.id === ingredient.id)) {
            return;
        }
        const newIngredient: IngredientItem = new IngredientItem(ingredient, quantity);
        const newIngredientList = [...ingredientList, newIngredient];
        setIngredientList(newIngredientList);
    };

    const handleRemoveIngredient = (ingredient: IngredientModel) => {
        const newIngredientList = ingredientList.filter((item) => item.ingredient.id !== ingredient.id);
        setIngredientList(newIngredientList);
    };

    const IngredientListItem = (props: { ing: IngredientModel; key: any }) => {
        const [quantity, setQuantity] = useState(0);
        return (
            <Flex key={props.key} p={2} alignItems="center">
                <Avatar name={props.ing.name} src="htto://" />
                <Text pl={2}>{props.ing.name}</Text>
                {ingredientList.some((item) => item.ingredient.id === props.ing.id) ?
                    <Flex ml='auto'>
                        <CloseButton onClick={() => handleRemoveIngredient(props.ing)} />
                    </Flex> :
                    <Flex ml='auto' >
                        <Input
                            textAlign={"right"}
                            w={20}
                            type="number"
                            value={quantity}
                            onChange={(e) => setQuantity(Number(e.target.value))}
                            onKeyUpCapture={(e) => {
                                e.key === "Enter" && handleAddIngredient(props.ing, quantity);
                            }}
                        />
                        <Center>
                            <Text verticalAlign={'middle'} minW={"30px"} pl={2}>{props.ing.measuringUnit}</Text>
                        </Center>
                        <Button
                            ml={4}
                            onClick={() => handleAddIngredient(props.ing, quantity)}
                        >
                            Add
                        </Button>
                    </Flex>
                }
            </Flex>
        );
    };

    const AddedIngredientItem = (props: { item: IngredientItem; key: any }) => {
        const item = props.item;
        return (
            <Flex key={props.key} p={2} alignItems="center">
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
                <Divider py={2} />
                <Center py={2}>
                    <Text fontSize="xl">Added Ingredients</Text>
                </Center>
                {ingredientList.map((item, i) => (
                    <AddedIngredientItem key={i} item={item} />
                ))}
            </Box>
        </Flex>
    );
}
