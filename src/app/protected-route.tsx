import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { DashboardLayout } from "../components/dashboard-layout";
import { fetchIngredients } from "../features/recipeBook/ingredient-slice";
import { fetchRecipes } from "../features/recipeBook/recipe-slice";
import { setUserInfo, setUserToken, sendUser } from "../features/user/user-slice";
import { useAppDispatch, useAppSelector } from "./hooks";

function ProtectedRoute() {
    const { isAuthenticated, user} = useAuth0();

    const dispatch = useAppDispatch();

    const recipeStatus = useAppSelector(state => state.recipeBook.status);
    const ingredientStatus = useAppSelector(state => state.ingredients.status);


    useEffect(() => {
        const fetchData = () => {
            if (isAuthenticated) {
                dispatch(sendUser(user!))
                if (recipeStatus === 'idle') {
                    dispatch(fetchRecipes());
                }
                if (ingredientStatus === 'idle') {
                    dispatch(fetchIngredients());
                }
            }
        };
        fetchData();
    }, [recipeStatus, ingredientStatus, user, dispatch, isAuthenticated]);

    if (isAuthenticated) {
        return <DashboardLayout />;
    } else {
        return <Navigate to="/login" />;
    }
}

export default ProtectedRoute; 