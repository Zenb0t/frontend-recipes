import { Routes, Route, useNavigate, Outlet } from "react-router-dom";
import RecipeCardList from "./features/recipeBook/RecipeCardList";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { selectRecipes, selectFavoriteRecipes, fetchRecipes } from "./features/recipeBook/RecipeSlice";
import RecipeDetail from "./features/recipeBook/RecipeDetail";
import { RecipeForm } from "./features/recipeBook/form/old/RecipeForm";
import { Box } from "@mui/material";
import { useEffect } from "react";
import { Grid, GridItem, HStack, Icon, StackDivider, Text, VStack } from "@chakra-ui/react";
import { GiCookingPot } from 'react-icons/gi';
import App from "./App";

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

        return (<Box>
            <Text p={6} mb={4} align="center" variant="h3">Welcome to the Recipe Book</Text>
            <Text p={6} align="center" variant="h5">
                Please select a recipe from the list or add a new one.
                You can also mark a recipe as favorite.
            </Text>
        </Box>)
    };
    const AllRecipes = () => <RecipeCardList recipes={recipes} />;
    const Favorites = () => <RecipeCardList recipes={useAppSelector(selectFavoriteRecipes)} />;
    const NoMatch = () => <Text p={6} mb={4} align="center" variant="h3">No match, try a different URL</Text>;
    const AddRecipe = () => <RecipeForm handleClose={() => navigate(`/allrecipes`, { replace: true })} />;
    const Login = () => {
        return <Text p={6} mb={4} align="center" variant="h3">Login</Text>;
    };
    const GridTest = () => {
        return <Grid
            templateAreas={`"header header"
                  "nav main"
                  "footer footer"`}
            gridTemplateRows={'50px 1fr 50px'}
            gridTemplateColumns={'200px 1fr'}
            h='100vh'
            gap='1'
        >
            <GridItem pl='2' bg='green.300' area={'header'}>
                <HStack align='center' justify='left'>
                    <Icon as={GiCookingPot} boxSize="2.5rem" /><Text fontSize='3xl' fontWeight='bold' >Panela</Text>
                </HStack>
            </GridItem>
            <GridItem h={500} pl='4' pt='4' bg='pink.300' area={'nav'}>
                <VStack
                    align='left'
                    spacing={2}
                    divider={<StackDivider borderColor='gray.200' />}
                >
                    <Text fontSize='xl' fontWeight='bold' >Dashboard</Text>
                    <Text fontSize='xl' fontWeight='bold'>Recipes</Text>
                    <Text fontSize='xl' fontWeight='bold'>Ingredients</Text>
                    <Text fontSize='xl' fontWeight='bold'>Account</Text>
                </VStack>

            </GridItem>
            <GridItem pl='2' bg='whiteAlpha.50' area={'main'}>
                <Outlet />
            </GridItem>
            <GridItem pl='2' bg='blue.300' area={'footer'}>
                Footer
            </GridItem>
        </Grid>
    };

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
                <Route path="add-recipe" element={<AddRecipe />} />
                <Route path="/allrecipes" element={<AllRecipes />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/recipes/:recipeId" element={<RecipeDetail />} />
                <Route path="/login" element={<Login />} />
                <Route path="/grid" element={<GridTest />} /> {/*TODO:Remove me later */}
                <Route path="*" element={<NoMatch />} />
            </Route>
        </Routes>);

}
