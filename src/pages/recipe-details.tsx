import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Text,
  Tooltip,
  useBreakpointValue,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { IngredientItemTable } from "../components/ingredient-table";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../hooks/reduxHooks";
import { selectRecipeById } from "../features/recipeBook/recipe-slice";
import { FavoriteButton } from "../components/favorite-button";
import { MdOutlineEdit, MdDeleteForever } from "react-icons/md";
import { useRef } from "react";
import { Recipe } from "../types/recipe";

export function RecipeDetailsPage() {
  let { recipeId } = useParams();

  const navigate = useNavigate();

  const recipe = useAppSelector((state) => selectRecipeById(state, recipeId!));

  const handleEdit = () => {
    navigate(`/dashboard/edit-recipe/${recipeId}`, { replace: true });
  };

  if (!recipe) {
    return (
      <Box>
        <Text>Recipe not found</Text>
      </Box>
    );
  }

  const test = true;

  if (test) {
    return <RecipeDetailsPageTest recipe={recipe} handleEdit={handleEdit} />;
  }

  return (
    <Box
      shadow="md"
      bg={useColorModeValue("white", "gray.800")}
      borderRadius="lg"
      maxW={"4xl"}
    >
      <RecipeHeader recipe={recipe!} handleEdit={handleEdit} />
      <Box p={8}>
        <Heading>{recipe!.title}</Heading>
        <Text>Total time: {recipe?.totalTimeInMinutes}</Text>
        <Text>Cost: {recipe?.cost?.toFixed(2)}</Text>
        {/* <FavoriteButton recipe={recipe!} /> */}
        {/* <IngredientItemTable ingredients={recipe!.ingredients} /> */}
        <Box p={4}>
          <Heading pb={4} size="lg">
            Instructions
          </Heading>
          {recipe!.instructions.map((instruction, index) => {
            return (
              <Box key={index}>
                <Text>{instruction}</Text>
                <br />
              </Box>
            );
          })}
        </Box>
        <Flex justifyContent={"flex-end"} p={4}>
          <DeleteRecipeDialog />
        </Flex>
      </Box>
    </Box>
  );
}

const RecipeDetailsPageTest = ({
  recipe,
  handleEdit,
}: {
  recipe: Recipe;
  handleEdit: () => void;
}) => {
  return (
    <Box
      shadow="md"
      bg={useColorModeValue("white", "gray.800")}
      borderRadius="lg"
      display={"flex"}
      flexDirection={useBreakpointValue({
        base: "column",
        lg: "row",
      })}
    >
      {/* <RecipeHeader recipe={recipe!} handleEdit={handleEdit} /> */}
      <Flex
        backgroundImage={recipe?.imageUrl}
        backgroundSize={"cover"}
        backgroundPosition={"center center"}
        w={useBreakpointValue({ base: "full", lg: "50%" })}
        minH={"40vh"}
        alignItems={"flex-start"}
      >
        <Box
          w="full"
          h="20vh"
          px={4}
          py={8}
          bgGradient="linear(to-t, transparent, rgba(0, 0, 0, 0.35))"
        >
          <Heading pl={4} color="white">
            {recipe?.title}
          </Heading>
        </Box>
      </Flex>
      <Box p={8}>
        <Heading pb={4} as="h2">
          Ingredients
        </Heading>
        <Box p={4}>
          {/* {recipe?.ingredients.map((item, index) => {
          return (
            <Box key={index}>
              <Text fontSize="md">• {item.quantity} {item.measuringUnit} of {item.ingredient.name}</Text>
              <br />
            </Box>
          );
        })} */}
          <Box>
            <Text fontSize="md">
              • {recipe.ingredients[0].quantity}{" "}
              {recipe.ingredients[0].measuringUnit} of{" "}
              {recipe.ingredients[0].ingredient.name}
            </Text>
          </Box>
          <Box>
            <Text fontSize="md">
              • {recipe.ingredients[0].quantity}{" "}
              {recipe.ingredients[0].measuringUnit} of{" "}
              {recipe.ingredients[0].ingredient.name}
            </Text>
          </Box>
          <Box>
            <Text fontSize="md">
              • {recipe.ingredients[0].quantity}{" "}
              {recipe.ingredients[0].measuringUnit} of{" "}
              {recipe.ingredients[0].ingredient.name}
            </Text>
          </Box>
          <Box>
            <Text fontSize="md">
              • {recipe.ingredients[0].quantity}{" "}
              {recipe.ingredients[0].measuringUnit} of{" "}
              {recipe.ingredients[0].ingredient.name}
            </Text>
            <br />
          </Box>
        </Box>
        <Box p={4}>
          <Heading pb={4} size="lg">
            Instructions
          </Heading>
          {recipe!.instructions.map((instruction, index) => {
            return (
              <Box key={index}>
                <Text>{instruction}</Text>
                <br />
              </Box>
            );
          })}
        </Box>
        <Flex justifyContent={"flex-end"} p={4}>
          <DeleteRecipeDialog />
        </Flex>
      </Box>
    </Box>
  );
};

interface RecipeHeaderProps {
  recipe: Recipe;
  handleEdit: () => void;
}

const RecipeHeader = ({ recipe, handleEdit }: RecipeHeaderProps) => {
  return (
    <Flex
      justifyContent={"flex-end"}
      borderRadius={["lg", "lg", "none", "none"]}
      w={"full"}
      h={useBreakpointValue({ base: "20vh", lg: "40vh" })}
      backgroundImage={recipe?.imageUrl}
      backgroundSize={"cover"}
      backgroundPosition={"center center"}
    >
      <Tooltip label="Edit Recipe" aria-label="Edit Recipe">
        <IconButton
          alignSelf={"flex-start"}
          colorScheme={"white"}
          m={2}
          aria-label={"Edit Recipe"}
          variant="solid"
          icon={<MdOutlineEdit />}
          isRound
          bg={useColorModeValue("white", "gray.800")}
          color={useColorModeValue("gray.800", "white")}
          onClick={handleEdit}
          _hover={{
            bg: useColorModeValue("gray.100", "gray.700"),
          }}
        />
      </Tooltip>
    </Flex>
  );
};

//Dialog are you sure want to delete?
function DeleteRecipeDialog() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);

  const handleCancel = () => {
    onClose();
  };

  const handleDelete = () => {
    // TODO: add delete logic
    onClose();
  };

  return (
    <>
      <IconButton
        colorScheme={"red"}
        m={2}
        aria-label={"Delete Recipe"}
        variant="ghost"
        icon={<MdDeleteForever />}
        isRound
        fontSize={"2xl"}
        onClick={onOpen}
      />

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Recipe
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={handleCancel}>
                Cancel
              </Button>
              <Button colorScheme="red" ml={3} onClick={handleDelete}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
