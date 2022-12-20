import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { DashboardLayout } from "../components/dashboard-layout";
import { fetchIngredients } from "../features/recipeBook/ingredient-slice";
import { fetchRecipes } from "../features/recipeBook/recipe-slice";
import { setUserInfo, setUserToken } from "../features/user/user-slice";
import { useAppDispatch, useAppSelector } from "./hooks";

function ProtectedRoute() {
    const { isAuthenticated, user, getAccessTokenSilently } = useAuth0();

    const dispatch = useAppDispatch();

    const recipeStatus = useAppSelector(state => state.recipeBook.status);
    const ingredientStatus = useAppSelector(state => state.ingredients.status);

    //Fetch recipes on mount if the user is authenticated
    useEffect(() => {

        const fetchData = async () => {
        try {
            let token = await getAccessTokenSilently();
            if (isAuthenticated) {
                dispatch(setUserInfo(user));
                dispatch(setUserToken(token));
                if (recipeStatus === 'idle') {
                    dispatch(fetchRecipes());
                }
                if (ingredientStatus === 'idle') {
                    dispatch(fetchIngredients());
                }
            }
        } catch (e) {
            console.log(e);
        }
        };
        fetchData();
    }, [recipeStatus, ingredientStatus, dispatch, isAuthenticated, getAccessTokenSilently, user]);

    if (isAuthenticated) {
        return <DashboardLayout />;
    } else {
        return <Navigate to="/login" />;
    }
}

export default ProtectedRoute; 