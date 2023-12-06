import { IconButton } from '@chakra-ui/react';
import { MdFavorite, MdOutlineFavoriteBorder, } from 'react-icons/md';
import { useAppDispatch } from '../app/hooks';
import { RecipeModel } from '../features/recipeBook/models';

export const FavoriteButton = (props: { recipe: RecipeModel }) => {
    const dispatch = useAppDispatch();

    const recipe = props.recipe;

    const favIcon = (true) ? <MdFavorite color='red' /> : < MdOutlineFavoriteBorder color='black' />;
    return (
        <IconButton
            // onClick={() => dispatch(toggleFavorite(recipe))}
            size="md"
            colorScheme="" color="red.500"
            aria-label='Toogle Favorite' icon={favIcon}
        />
    );
};
