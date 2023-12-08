import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Center,
  Divider,
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
import { RecipeInfoPanel } from "../components/RecipeInfoPanel";

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
      m={4}
      maxW={"9xl"}
      minH={"70vh"}
      shadow="md"
      bg={useColorModeValue("white", "gray.800")}
      borderRadius="lg"
      display={"flex"}
      flexDirection={useBreakpointValue({
        base: "column",
        lg: "row",
      })}
    >
      <Flex
        backgroundImage={recipe?.imageUrl}
        backgroundSize={"cover"}
        backgroundPosition={"center center"}
        borderTopLeftRadius={"lg"}
        borderBottomLeftRadius={useBreakpointValue({
          base: "none",
          lg: "lg",
        })}
        borderTopRightRadius={useBreakpointValue({
          base: "lg",
          lg: "none",
        })}
        w={useBreakpointValue({ base: "full", lg: "50%" })}
        minW={"30%"}
        minH={"40vh"}
        alignItems={"flex-start"}
      >
        <Box
          borderRadius="inherit"
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
      <Box>
        <Flex
          p={4}
          justifyContent={"space-around"}
          alignItems={"center"}
          gap={2}
        >
          <RecipeInfoPanel label="minutes" value={recipe.totalTimeInMinutes} />
          <Center h="48px">
            <Divider orientation="vertical" />
          </Center>
          <RecipeInfoPanel label="servings" value={recipe.servings} />
          <Center h="48px">
            <Divider orientation="vertical" />
          </Center>
          <RecipeInfoPanel
            label="ingredients"
            value={recipe.ingredients.length}
          />
          <Center h="48px">
            <Divider orientation="vertical" />
          </Center>
          <Box>
            <Tooltip label="Edit Recipe" aria-label="Edit Recipe">
              <IconButton
                justifySelf={"flex-end"}
                colorScheme={"white"}
                m={2}
                aria-label={"Edit Recipe"}
                variant="solid"
                icon={<MdOutlineEdit />}
                isRound
                bg={useColorModeValue("gray.50", "gray.800")}
                color={useColorModeValue("gray.800", "white")}
                onClick={handleEdit}
                _hover={{
                  bg: useColorModeValue("gray.100", "gray.700"),
                }}
              />
            </Tooltip>
            <DeleteRecipeDialog />
          </Box>
        </Flex>

        <Flex
          px={4}
          py={8}
          direction={useBreakpointValue({ base: "column", lg: "row" })}
          overflowY={useBreakpointValue({ base: "initial", lg: "auto" })}
          maxHeight={useBreakpointValue({ base: "initial", lg: "85vh" })}
        >
          <Box flex={1} p={4}>
            <Heading as="h2">Ingredients</Heading>
            <Box p={4}>
              {recipe?.ingredients.map((item, index) => {
                return (
                  <Box py={0.5} key={index}>
                    <Text fontSize="md">
                      • {item.quantity} {item.measuringUnit} of{" "}
                      {item.ingredient.name}
                    </Text>
                  </Box>
                );
              })}
            </Box>
          </Box>
          <Box flex={1} p={4}>
            <Heading as="h2">Instructions</Heading>
            <Box py={4} pl={4}>
              {recipe!.instructions.map((instruction, index) => {
                return (
                  <Flex
                    py={0.5}
                    key={index}
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                  >
                    <Text pr={2} as="b" fontSize="2xl">
                      {index + 1}
                    </Text>
                    <Text pt={1}>{instruction}</Text>
                  </Flex>
                );
              })}
            </Box>
          </Box>
        </Flex>
      </Box>
      {/* <Flex justifyContent={"flex-end"} p={4}>
        <DeleteRecipeDialog />
      </Flex> */}
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
          icon={<MdOutlineEdit />}
          onClick={handleEdit}
          alignSelf={"flex-start"}
          colorScheme={"white"}
          m={2}
          aria-label={"Edit Recipe"}
          variant="solid"
          isRound
          fontSize={"2xl"}
          bg={useColorModeValue("white", "gray.800")}
          color={useColorModeValue("gray.800", "white")}
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
      <Tooltip label="Delete Recipe" aria-label="Delete Recipe">
        <IconButton
          onClick={onOpen}
          icon={<MdDeleteForever />}
          aria-label={"Delete Recipe"}
          alignSelf={"flex-start"}
          colorScheme={"white"}
          m={2}
          variant="solid"
          isRound
          bg={useColorModeValue("white", "gray.800")}
          color={useColorModeValue("gray.800", "white")}
          _hover={{
            bg: useColorModeValue("gray.100", "gray.700"),
          }}
          fontSize={"2xl"}
        />
      </Tooltip>

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
