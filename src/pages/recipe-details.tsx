import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Box, Button, Flex, Heading, IconButton, Text, Tooltip, useColorModeValue, useDisclosure } from "@chakra-ui/react";
import { IngredientItemTable } from "../components/ingredient-table";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { selectRecipeById } from "../features/recipeBook/recipe-slice";
import { FavoriteButton } from "../components/favorite-button";
import { MdOutlineEdit, MdDeleteForever } from 'react-icons/md';
import { useRef } from "react";


export function RecipeDetailsPage() {
  let { recipeId } = useParams();

  const navigate = useNavigate();

  const recipe = useAppSelector((state) => selectRecipeById(state, recipeId!));

  return (
    <Box
      shadow="md"
      bg={useColorModeValue("white", "gray.800")}
      borderRadius="lg">
      <Flex
        justifyContent={'flex-end'}
        borderRadius={["lg", "lg", "none", "none"]}
        w={'full'}
        h={'40vh'}
        backgroundImage={
          recipe!.imageUrl
        }
        backgroundSize={'cover'}
        backgroundPosition={'center center'}
      >
        <Tooltip label="Edit Recipe" aria-label="Edit Recipe">
          <IconButton
            alignSelf={'flex-start'}
            colorScheme={'white'}
            m={2}
            aria-label={"Edit Recipe"}
            variant='solid'
            icon={<MdOutlineEdit />}
            isRound
            bg={useColorModeValue("white", "gray.800")}
            color={useColorModeValue("gray.800", "white")}
            onClick={() => { 
              navigate(`/edit-recipe/${recipeId}`, { replace: true });
            }}
          />
        </Tooltip>
      </Flex>
      <Box p={8}>
        <Heading>{recipe!.title}</Heading>
        <Text>
          Total time: {recipe!.totalTime.hours}h {recipe!.totalTime.minutes}min
        </Text>
        <Text>Cost: {recipe!.cost.toFixed(2)}</Text>
        <FavoriteButton recipe={recipe!} />
        <IngredientItemTable ingredients={recipe!.ingredients} />
        <Box p={4}>
          <Heading pb={4} size='lg'>Instructions</Heading>
          {recipe!.instructions.map((instruction, index) => {
            return (
              <>
                <Text key={index}>{instruction}</Text>
                <br />
              </>
            )
          })}
        </Box>
        <Flex justifyContent={"flex-end"} p={4}>
          <DeleteRecipeDialog />
        </Flex>
      </Box>
    </Box >
  );
}

//Dialog are you sure want to delete?
function DeleteRecipeDialog() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <IconButton
        colorScheme={'red'}
        m={2}
        aria-label={"Delete Recipe"}
        variant='ghost'
        icon={<MdDeleteForever />}
        isRound
        fontSize={'2xl'}
        onClick={onOpen}
      />

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Delete Recipe
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme='red' onClick={onClose} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}
