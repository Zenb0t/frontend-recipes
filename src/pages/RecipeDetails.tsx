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

  const VertDivider = (
    <Center h="48px">
      {" "}
      <Divider orientation="vertical" />{" "}
    </Center>
  );

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
          wrap={"wrap"}
        >
          <RecipeInfoPanel label="minutes" value={recipe.totalTimeInMinutes} />
          {useBreakpointValue({ base: <></>, sm: VertDivider })}
          <RecipeInfoPanel label="servings" value={recipe.servings} />
          {useBreakpointValue({ base: <></>, sm: VertDivider })}
          <RecipeInfoPanel
            label="ingredients"
            value={recipe.ingredients.length}
          />
          {useBreakpointValue({ base: <></>, sm: VertDivider })}
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
        <Box mx={4}>
          <Divider />
        </Box>
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
}

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
