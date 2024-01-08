import { Routes, Route } from "react-router-dom";
import RecipeCardListPage from "../pages/RecipeCardList";
import RecipeForm from "../pages/RecipeForm/RecipeForm";
import { Text } from "@chakra-ui/react";
import App from "../App";
import { RecipeDetailsPage } from "../pages/RecipeDetails";
import { IngredientPage } from "../pages/ingredient-page";
import { EditRecipePage } from "../pages/RecipeForm/EditRecipeForm";
import LoginForm from "../pages/Login/LoginForm";
import ProtectedRoute from "./protected-route";
import Landing from "../pages/Landing";
import ImportRecipe from "../pages/RecipeForm/ImportRecipe";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { fetchRecipes } from "../features/recipeBook/recipeSlice";
import { ReduxStatus } from "../consts";

/**Contains the routes for the application */
export default function AppRouter() {
  const { recipeList, status } = useAppSelector((state) => state.recipeBook);
  const { userToken } = useAppSelector((state) => state.users);
  const dispatch = useAppDispatch();

  function fetchData() {
    if (userToken) dispatch(fetchRecipes());
  }

  // useEffect(() => {
  //   fetchData();
  // }, []);

  useEffect(() => {
    if (recipeList.length === 0 && status === ReduxStatus.IDLE) {
      fetchData();
    }
  }, [recipeList, status, userToken]);

  const NoMatch = () => (
    <Text p={6} mb={4} align="center" variant="h3">
      No match, try a different URL
    </Text>
  ); //TODO: Make this a page

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="*" element={<NoMatch />} />
      <Route element={<App />}>
        <Route path="/dashboard" element={<ProtectedRoute />}>
          <Route index path="allrecipes" element={<RecipeCardListPage />} />
          <Route path="add-recipe" element={<RecipeForm />} />
          <Route path="import-recipe" element={<ImportRecipe />} />
          <Route path="edit-recipe/:recipeId" element={<EditRecipePage />} />
          <Route path="recipe/:recipeId" element={<RecipeDetailsPage />} />
          <Route path="ingredients" element={<IngredientPage />} />
        </Route>
      </Route>
    </Routes>
  );
}
