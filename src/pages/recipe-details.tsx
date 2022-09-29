import * as React from "react";
import { Box, Heading, Text } from "@chakra-ui/react";
import { IngredientTable } from "../components/ingredient-table";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { selectRecipeById } from "../features/recipeBook/recipe-slice";
import { FavoriteButton } from "../components/favorite-button";


export function RecipePage() {
    let { recipeId } = useParams();

    const recipe = useAppSelector((state) => selectRecipeById(state, recipeId!));

    return (
        <Box p={8} shadow="md" bg="whiteAlpha.900" borderRadius="lg">
            <Heading>{recipe!.title}</Heading>
            <Text>
                Total time: {recipe!.totalTime.hours}h {recipe!.totalTime.minutes}min
            </Text>
            <Text>Cost: {recipe!.cost.toFixed(2)}</Text>
            <FavoriteButton recipe={recipe!} />
            <IngredientTable ingredients={recipe!.ingredients} />
        </Box>
    );
}
