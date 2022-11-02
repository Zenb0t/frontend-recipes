import { Box, Flex, Heading, Text, useColorModeValue } from "@chakra-ui/react";
import { IngredientItemTable } from "../components/ingredient-table";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { selectRecipeById } from "../features/recipeBook/recipe-slice";
import { FavoriteButton } from "../components/favorite-button";


export function RecipeDetailsPage() {
    let { recipeId } = useParams();

    const recipe = useAppSelector((state) => selectRecipeById(state, recipeId!));

    return (
        <Box
            shadow="md"
            bg={useColorModeValue("white", "gray.800")}
            borderRadius="lg">
            <Flex
                borderRadius={["lg", "lg", "none", "none"]}
                w={'full'}
                h={'40vh'}
                backgroundImage={
                    recipe!.imageUrl
                }
                backgroundSize={'cover'}
                backgroundPosition={'center center'}
            >
            </Flex>
            <Box
                p={8}>

                <Heading>{recipe!.title}</Heading>
                <Text>
                    Total time: {recipe!.totalTime.hours}h {recipe!.totalTime.minutes}min
                </Text>
                <Text>Cost: {recipe!.cost.toFixed(2)}</Text>
                <FavoriteButton recipe={recipe!} />
                <IngredientItemTable ingredients={recipe!.ingredients} />
            </Box>
        </Box >
    );
}
