import { Routes, Route, useNavigate } from "react-router-dom";
import RecipeCardListPage from "../pages/recipecard-list";
import { useAppSelector } from "./hooks";
import { selectRecipes, selectFavoriteRecipes, } from "../features/recipeBook/recipe-slice";
import { AddRecipePage } from "../pages/add-recipe-form";
import { Box } from "@chakra-ui/react";
import { useEffect } from "react";
import { Text } from "@chakra-ui/react";
import App from "../App";
import { RecipeDetailsPage } from "../pages/recipe-details";
import { IngredientPage } from "../pages/ingredient-page";
import { EditRecipePage } from "../pages/edit-recipe-form";
import LoginForm from "../pages/login-form";

/**Contains the routes for the application */
export default function AppRouter() {

    const navigate = useNavigate();
    const recipes = useAppSelector(selectRecipes);

    //TODO: Refactor this to their own pages in the page folder
    const Welcome = () => {
        useEffect(() => {
            if (recipes.length > 0) {
                navigate("/allrecipes");
            }
        }
            , []);

        return (<Box p={6}>
            <Text mb={4} align="center" variant="h3">Welcome to the Recipe Book</Text>
            <Text align="center" variant="h5">
                Please select a recipe from the list or add a new one.
                You can also mark a recipe as favorite.
            </Text>
        </Box>)
    };
    const AllRecipes = () => <RecipeCardListPage recipes={recipes} />;
    const Favorites = () => <RecipeCardListPage recipes={useAppSelector(selectFavoriteRecipes)} />;
    const NoMatch = () => <Text p={6} mb={4} align="center" variant="h3">No match, try a different URL</Text>;
    const Login = () => <LoginForm/>
    const Ingredients = () => <IngredientPage />;
    // const Settings = () => <FormPlaceholder handleClose={() => navigate(`/allrecipes`, { replace: true })} />;

    return (
        <Routes>
            <Route path="/" element={<App />} >
                <Route index element={<Welcome />} />
                <Route path="/add-recipe" element={<AddRecipePage/>} />
                <Route path="/edit-recipe/:recipeId" element={<EditRecipePage/>} />
                <Route path="/allrecipes" element={<AllRecipes />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/recipes/:recipeId" element={<RecipeDetailsPage />} />
                <Route path="/ingredients" element={<Ingredients />} />
                {/* <Route path="/settings" element={<Settings />} /> */}
                <Route path="*" element={<NoMatch />} />
            </Route>
            <Route path="/login" element={<Login />} />
        </Routes>);

}
