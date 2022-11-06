import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { fetchIngredients } from './features/recipeBook/ingredient-slice';
import { fetchRecipes } from './features/recipeBook/recipe-slice';
//Chakra imports
import { SidebarWithHeader } from './components/sidebar';


/** The entry point to the main application */
function App() {

  const dispatch = useAppDispatch();

  const recipeStatus = useAppSelector(state => state.recipeBook.status);
  const ingredientStatus = useAppSelector(state => state.ingredients.status);

  //Fetch recipes on mount
  useEffect(() => {
      if (recipeStatus === 'idle') {
          dispatch(fetchRecipes());
      }
      if (ingredientStatus === 'idle') {
          dispatch(fetchIngredients());
      }
  }, [recipeStatus, ingredientStatus, dispatch]);

  return (
    <SidebarWithHeader>
      <Outlet />
    </SidebarWithHeader>
  );
}

export default App;
