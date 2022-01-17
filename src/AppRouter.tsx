import { Routes, Route, useNavigate } from "react-router-dom";
import RecipeCardList from "./features/recipeBook/RecipeCardList";
import { useAppSelector } from "./app/hooks";
import { selectRecipes, selectFavoriteRecipes } from "./features/recipeBook/RecipeSlice";
import App from "./App";
import RecipeDetail from "./features/recipeBook/RecipeDetail";
import { RecipeForm } from "./features/recipeBook/form/RecipeForm";
import { Box, Typography } from "@mui/material";

/**Contains the routes for the application */
export default function AppRouter() {

    const navigate = useNavigate();

    const Welcome = () => {
        return (<Box>
            <Typography p={6} mb={4} align="center" variant="h3">Welcome to the Recipe Book</Typography>
            <Typography p={6} align="center" variant="h5">
                Please select a recipe from the list or add a new one. 
                You can also mark a recipe as favorite.
            </Typography>
        </Box>)
    };
    const AllRecipes = () => <RecipeCardList recipes={useAppSelector(selectRecipes)} />;
    const Favorites = () => <RecipeCardList recipes={useAppSelector(selectFavoriteRecipes)} />;
    const NoMatch = () => <Typography p={6} mb={4} align="center" variant="h3">No match, try a different URL</Typography>;
    const AddRecipe = () => <RecipeForm handleClose={() => navigate(`/allrecipes`, { replace: true })} />;

    return (
        <Routes>
            <Route path="/" element={<App />} >
                <Route index element={<Welcome />} />
                <Route path="add-recipe" element={<AddRecipe />} />
                <Route path="/allrecipes" element={<AllRecipes />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/recipes/:recipeId" element={<RecipeDetail />} />
                <Route path="*" element={<NoMatch />} />
            </Route>
        </Routes>);

}
