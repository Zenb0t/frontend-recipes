import { Routes, Route, useNavigate } from "react-router-dom";
import RecipeCardListPage from "../pages/recipecard-list";
import { useAppDispatch, useAppSelector } from "./hooks";
import { selectRecipes, selectFavoriteRecipes, fetchRecipes } from "../features/recipeBook/recipe-slice";
import { AddRecipePage } from "../pages/add-recipe-form";
import { Box } from "@chakra-ui/react";
import { useEffect } from "react";
import { Text } from "@chakra-ui/react";
import App from "../App";
import { RecipeDetailsPage } from "../pages/recipe-details";
import { SearchIngredient } from "../components/search-ingredient";
import { demoList } from "../services/fake-data";

/**Contains the routes for the application */
export default function AppRouter() {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const recipes = useAppSelector(selectRecipes);

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
    const AddRecipe = () => <AddRecipePage />;
    const Login = () => {
        return <Text p={6} mb={4} align="center" variant="h3">Login</Text>;
    };
    const Ingredients = () => <SearchIngredient list={demoList}/>;
    // const Settings = () => <FormPlaceholder handleClose={() => navigate(`/allrecipes`, { replace: true })} />;


    //Fetch recipes on mount
    useEffect(() => {
        //TODO: Add loading indicator
        console.log("fetching recipes");
        dispatch(fetchRecipes());
    }
        , [dispatch]);

        

    return (
        <Routes>
            <Route path="/" element={<App />} >
                <Route index element={<Welcome />} />
                <Route path="/addrecipe" element={<AddRecipe />} />
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
