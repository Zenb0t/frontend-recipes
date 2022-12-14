import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import RecipeCardListPage from "../pages/recipecard-list";
import { useAppSelector } from "./hooks";
import { selectRecipes, selectFavoriteRecipes, } from "../features/recipeBook/recipe-slice";
import { AddRecipePage } from "../pages/add-recipe-form";
import { Box, Center, Spinner } from "@chakra-ui/react";
import { useEffect } from "react";
import { Text } from "@chakra-ui/react";
import App from "../App";
import { RecipeDetailsPage } from "../pages/recipe-details";
import { IngredientPage } from "../pages/ingredient-page";
import { EditRecipePage } from "../pages/edit-recipe-form";
import LoginForm from "../pages/login-form";
import CallbackPage from "../pages/callback-page";
import ProtectedRoute from "./protected-route";
import Landing from "../pages/landing";
import { useAuth0 } from "@auth0/auth0-react";

/**Contains the routes for the application */
export default function AppRouter() {

    const navigate = useNavigate();
    const recipes = useAppSelector(selectRecipes);
    const { isAuthenticated } = useAuth0();

    //TODO: Refactor this to their own pages in the page folder
    const Welcome = () => {
        useEffect(() => {
            if (recipes.length > 0) {
                navigate("/dashboard/allrecipes");
            }
        }
            , []);

        return (
            <Center>
                <Spinner size="xl" color={"green.500"} />
            </Center>

        );
    };
    const AllRecipes = () => <RecipeCardListPage recipes={recipes} />;
    const Favorites = () => <RecipeCardListPage recipes={useAppSelector(selectFavoriteRecipes)} />;
    const NoMatch = () => <Text p={6} mb={4} align="center" variant="h3">No match, try a different URL</Text>;
    const Login = () => <LoginForm />
    const Ingredients = () => <IngredientPage />;
    // const Settings = () => <FormPlaceholder handleClose={() => navigate(`/allrecipes`, { replace: true })} />;

    return (
        <Routes>
            <Route path="/" element={<Landing />} />
            <Route element={<App />}>
                <Route path="callback" element={<CallbackPage />} />
                <Route path="/dashboard" element={<ProtectedRoute />}>
                    <Route index element={<Welcome />} />
                    <Route path="add-recipe" element={<AddRecipePage />} />
                    <Route path="edit-recipe/:recipeId" element={<EditRecipePage />} />
                    <Route path="allrecipes" element={<AllRecipes />} />
                    <Route path="favorites" element={<Favorites />} />
                    <Route path=":recipeId" element={<RecipeDetailsPage />} />
                    <Route path="ingredients" element={<Ingredients />} />
                    {/* <Route path="/settings" element={<Settings />} /> */}
                </Route>
            </Route>
            <Route path="*" element={<NoMatch />} />
            <Route path="/login" element={<Login />} />
        </Routes>);
}
