import { Formik, Field, FieldProps, Form, } from "formik";
import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input,
    VStack,
    Textarea,
    useColorModeValue,
    Avatar,
    Center,
    CloseButton,
    Divider,
    Icon,
    InputGroup,
    InputLeftElement,
    Text,
    useToast,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure,
} from "@chakra-ui/react";
import { yup } from '../app/utils';
import { IngredientItem, IngredientModel, RecipeModel } from "../features/recipeBook/models";
import FileUpload from "../components/fileUpload";
import { useState, ChangeEvent, useEffect } from "react";
import { MdSearch } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { selectIngredientList } from "../features/recipeBook/ingredient-slice";
import { createRecipe } from "../features/recipeBook/recipe-slice";
import { AddIngredientForm } from "./ingredient-page";


export function AddRecipePage() {

    const dispatch = useAppDispatch();
    const storeIngredients = useAppSelector(selectIngredientList);

    const toast = useToast();

    interface Values {
        title: string;
        description: string;
        hours: number;
        minutes: number;
        ingredients: { ingredientId: string, quantity: number }[];
        instructions: string;
        imageUrl: string;
        favorite: boolean;
        id: string;
        cost: number;
    }

    const initialValues: Values = {
        title: '',
        description: '',
        hours: 0,
        minutes: 0,
        ingredients: [],
        instructions: '',
        imageUrl: '',
        favorite: false,
        id: '',
        cost: 0,
    };

    const recipeValidation = yup.object({
        title: yup.string().required('Required'),
        description: yup.string().required('Required'),
        hours: yup.number().required('Required').max(24, 'Must be less than 24').min(-1, 'Must be positive'),
        minutes: yup.number().required('Required'),
        ingredients: yup.array().of(yup.object().shape({
            ingredientId: yup.string().required('Required'),
            quantity: yup.number().moreThan(0, 'Must be greater than 0').required('Required'),
        })),
        instructions: yup.string().required('Must provide instructions'),
        imageUrl: yup.string().required('Required'),
        // cost: yup.number().required('Required').min(0, 'Must be greater than 0'),
    });

    function validateIngredients(ingredients: { ingredientId: string, quantity: number }[]) {
        console.log("Validating ingredients");
        if (ingredients.length === 0) {
            console.log("No ingredients");
            return 'Must provide at least one ingredient';
        } else if (ingredients.some(ingredient => ingredient.ingredientId === '')) {
            console.log("Empty ingredient");
            return 'Must provide an ingredient';
        } else if (ingredients.some(ingredient => ingredient.quantity <= 0)) {
            console.log("Invalid quantity");
            return 'Must provide a quantity greater than 0';
        } else {
            console.log("Ingredients are valid");
        }
    }

    /***
 * Helper functions to build the ingredient list from the form values
 */
    function IngredientListBuilder(ingredients: { ingredientId: string, quantity: number }[]) {
        let ingredientList = ingredients.map((item) => {
            let ingredient = storeIngredients.find(ingredient => ingredient.id === item.ingredientId);
            if (ingredient) {
                let ingredientItem = new IngredientItem(ingredient, item.quantity);
                return ingredientItem;
            } else {
                throw new Error("Ingredient not found");
            }
        }
        );
        return ingredientList;
    }

    /***
     * Helper function to build the recipe object from the form values
     */

    function buildRecipe(values: Values): RecipeModel {
        const ingredientList = IngredientListBuilder(values.ingredients);
        values.cost = ingredientList.reduce((sum, ing) => sum + ing.cost, 0);
        const time = { hours: values.hours, minutes: values.minutes };
        const instructions = values.instructions.split('\r\n');
        return { ...values, ingredients: ingredientList, totalTime: time, instructions: instructions };
    }

    return (
        <Flex align="center" justify="center">
            <Box bg={useColorModeValue("white", "gray.800")} p={6} rounded="md" minW={{ base: 200, sm: 300, md: 440, lg: 700 }} mx={"auto"}>
                <Formik
                    initialValues={initialValues}
                    validationSchema={recipeValidation}
                    onSubmit={(values) => {
                        console.log("Submitting");
                        const newRecipe = buildRecipe(values);
                        dispatch(createRecipe(newRecipe)).then((status) => {
                            if (status) {
                                toast({
                                    title: "Recipe created",
                                    description: "Your recipe has been created",
                                    status: "success",
                                    duration: 5000,
                                    isClosable: true,
                                });
                            } else {
                                toast({
                                    title: "Error",
                                    description: "There was an error creating your recipe",
                                    status: "error",
                                    duration: 5000,
                                    isClosable: true,
                                });
                            }
                        });
                    }}
                >
                    {({ handleSubmit, errors, touched }) => (
                        <Form onSubmit={handleSubmit}>
                            <VStack spacing={4} align="flex-start">
                                <FormControl isInvalid={!!errors.title && touched.title}>
                                    <FormLabel htmlFor="title">Recipe Title</FormLabel>
                                    <Field
                                        as={Input}
                                        id="title"
                                        name="title"
                                        type="title"
                                        variant="filled"
                                    />
                                    <FormErrorMessage>{errors.title}</FormErrorMessage>
                                </FormControl>
                                <FormControl isInvalid={!!errors.imageUrl && touched.imageUrl}>
                                    <FormLabel htmlFor="imageUrl">Image URL</FormLabel>
                                    <Field
                                        component={FileUpload}
                                        id="imageUrl"
                                        name="imageUrl"
                                    />
                                    <FormErrorMessage>{errors.imageUrl}</FormErrorMessage>
                                </FormControl>
                                <FormControl isInvalid={!!errors.description && touched.description}>
                                    <FormLabel htmlFor="Description">Description</FormLabel>
                                    <Field
                                        as={Textarea}
                                        id="description"
                                        name="description"
                                        type="description"
                                        variant="filled"
                                    />
                                    <FormErrorMessage>{errors.description}</FormErrorMessage>
                                </FormControl>
                                <Flex gap={4}>
                                    <FormControl isInvalid={!!errors.hours && touched.hours}>
                                        <FormLabel htmlFor="Hours">Hours</FormLabel>
                                        <Field
                                            as={Input}
                                            id="hours"
                                            name="hours"
                                            type="hours"
                                            variant="filled"
                                        />
                                        <FormErrorMessage>{errors.hours}</FormErrorMessage>
                                    </FormControl>
                                    <FormControl isInvalid={!!errors.minutes && touched.minutes}>
                                        <FormLabel htmlFor="Minutes">Minutes</FormLabel>
                                        <Field
                                            as={Input}
                                            id="minutes"
                                            name="minutes"
                                            type="minutes"
                                            variant="filled"
                                        />
                                        <FormErrorMessage>{errors.minutes}</FormErrorMessage>
                                    </FormControl>
                                </Flex>
                                <FormControl isInvalid={!!errors.instructions && touched.instructions}>
                                    <FormLabel htmlFor="instructions">Instructions</FormLabel>
                                    <Field
                                        as={Textarea}
                                        id="instructions"
                                        name="instructions"
                                        type="instructions"
                                        variant="filled"
                                    />
                                    <FormErrorMessage>{errors.instructions}</FormErrorMessage>
                                </FormControl>
                                <FormControl isInvalid={!!errors.ingredients && touched.ingredients as boolean | undefined}>
                                    <FormLabel htmlFor="ingredients">Ingredients</FormLabel>
                                    <Field
                                        component={AddIngredientField}
                                        id="ingredients"
                                        name="ingredients"
                                        type="ingredients"
                                        variant="filled"
                                        validate={validateIngredients}
                                    />
                                    <FormErrorMessage>{errors.ingredients as string | undefined}</FormErrorMessage> {/*FIXME: Errors not showing up properly */}
                                </FormControl>
                                <Button type="submit" colorScheme="green" width="full">
                                    Submit
                                </Button>
                            </VStack>
                        </Form>
                    )}
                </Formik>
            </Box>
        </Flex>
    );
}


/***
 * Adds a list of ingredients id and quantities to the [Formik] form field.
 * 
 */
function AddIngredientField({ field, form }: FieldProps) {

    const ingredients = useAppSelector(selectIngredientList);

    type IdList = { ingredientId: string, quantity: number }[];

    const list = ingredients;
    const [ingredientList, setIngredientList] = useState<IngredientItem[]>([]);
    const [searchValue, setSeachValue] = useState("");
    const [ingredientIdList, setIngredientIdList] = useState<IdList>([]);
    const searchResults = searchValue === ""
        ? []
        : list.filter(
            (ing) => ing.name.toLowerCase().includes(searchValue.toLowerCase()) && !ingredientIdList.some((item) => item.ingredientId === ing.id));

    // Handlers

    const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
        setSeachValue(event.target.value);
    };

    const handleAddToIdList = (ingredients: IngredientItem[]) => {
        let idList = ingredients.map((item) => {
            let value = { ingredientId: item.ingredient.id, quantity: item.quantity };
            return value;
        }
        );
        setIngredientIdList(idList);
    };

    const handleAddIngredient = (ingredient: IngredientModel, quantity: number) => {
        if (ingredientList.some((item) => item.ingredient.id === ingredient.id)) {
            console.log("Ingredient already in list");
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


    //Disabled linting has form and field.name should not cause a change
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
            <>
                <Flex p={2} alignItems="center">
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
            </>
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
        <Flex pt={4} align="center" justify="center">
            <Box bg={useColorModeValue("white", "gray.800")} rounded="md" w="md">
                <AddIngredientModal />
                <InputGroup size="md">
                    <InputLeftElement pointerEvents="none" children={<Icon as={MdSearch} zIndex={1} />} />
                    <Input
                        type="text"
                        placeholder="Search Ingredients"
                        value={searchValue}
                        onChange={handleSearch}
                    />
                </InputGroup>
                {searchResults.map((ing) => (
                    <IngredientListItem key={ing.id} ing={ing} />
                ))}
                <Divider py={2} />
                <Center py={2}>
                    <Text fontSize="xl">Added Ingredients</Text>
                </Center>
                {ingredientList.map((item, i) => (
                    <AddedIngredientItem key={item.ingredient.id} item={item} />
                ))}
            </Box>
        </Flex>
    );

}

function AddIngredientModal() {
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
                        <AddIngredientForm onClose={onClose} />
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='green' mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button variant='outline'>Secondary Action</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    )
}
