import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { selectIngredientList } from '../features/recipeBook/ingredient-slice';
import type { RootState, AppDispatch } from './store';

// React-Redux hooks
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Selector hooks
export function useIngredientList() {
    return useAppSelector(selectIngredientList);
}
