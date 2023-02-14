import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";
import { DashboardLayout } from "../components/dashboard-layout";
import { fetchIngredients } from "../features/recipeBook/ingredient-slice";
import { fetchRecipes } from "../features/recipeBook/recipe-slice";
import { useAppDispatch, useAppSelector } from "./hooks";

function ProtectedRoute() {
    const { isAuthenticated } = useAuth0();

    const dispatch = useAppDispatch();
    const recipeStatus = useAppSelector(state => state.recipeBook.status);
    const ingredientStatus = useAppSelector(state => state.ingredients.status);

    if (isAuthenticated) {
        if (recipeStatus === 'idle') {
            dispatch(fetchRecipes());
        }
        if (ingredientStatus === 'idle') {
            dispatch(fetchIngredients());
        }
        return <DashboardLayout />;
    } else {
        return <Navigate to="/login" />;
    }
}

export default ProtectedRoute; 