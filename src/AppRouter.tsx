import { Routes, Route, useNavigate } from "react-router-dom";
import RecipeCardList from "./features/recipeBook/RecipeCardList";
import { useAppSelector } from "./app/hooks";
import { selectRecipes, selectFavoriteRecipes } from "./features/recipeBook/RecipeSlice";
import App from "./App";
import RecipeDetail from "./features/recipeBook/RecipeDetail";
import { RecipeForm } from "./features/recipeBook/form/RecipeForm";

/**Contains the routes for the application */
export default function AppRouter() {

    const navigate = useNavigate();

    const AllRecipes = () => <RecipeCardList recipes={useAppSelector(selectRecipes)} />;

    const Favorites = () => <RecipeCardList recipes={useAppSelector(selectFavoriteRecipes)} />;
    
    const WithEgg = () => <div>With Eggs</div>;
    
    const NoMatch = () => <div>No match, try a different URL</div>;
    
    const AddRecipe = () => <RecipeForm handleClose={() => navigate(`/allrecipes`, { replace: true })}/>;

    return (
        <Routes>
            <Route path="/" element={<App />} >
                <Route path="add-recipe" element={<AddRecipe />} />
                <Route path="/allrecipes" element={<AllRecipes />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/withEgg" element={<WithEgg />} />
                <Route path="/recipes/:recipeId" element={<RecipeDetail />} />
                <Route path="*" element={<NoMatch/>} />
            </Route>
        </Routes>);

}
