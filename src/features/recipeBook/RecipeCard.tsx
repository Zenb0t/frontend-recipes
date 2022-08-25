//Mui imports
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import SettingsIcon from '@mui/icons-material/Settings';
import { CardActionArea, CardMedia, CardContent, Stack, IconButton as IconButtonMd } from '@mui/material';
import Card from '@mui/material/Card';
//Chakra imports
import { Icon } from '@chakra-ui/icons';
import { Box, IconButton, Image, LinkOverlay, Text } from '@chakra-ui/react';
import { MdFavorite, MdOutlineFavorite, MdOutlineFavoriteBorder } from 'react-icons/md';


//RecipeCard component
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import { RecipeModel } from './RecipeBookModels';
import { toggleFavorite, updateRecipe } from './RecipeSlice';

export function RecipeCard2(props: { recipe: RecipeModel }) {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleAction = () => {
        navigate(`/recipes/${recipe.id}`, { replace: true });
    };

    let recipe = props.recipe;

    const favIcon = (recipe.favorite) ? <MdFavorite color='red' /> : < MdOutlineFavoriteBorder color='black' />;

    return (
        <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden'>

            <Image src={recipe.imageUrl} alt={recipe.title} onClick={handleAction} />
            <Text fontSize='xl'>{recipe.title}</Text>
            <IconButton icon={favIcon} aria-label={'Favorite'} onClick={() => dispatch(toggleFavorite(recipe))} />
        </Box>);


}


export function RecipeCard(props: { recipe: RecipeModel }) {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleAction = () => {
        navigate(`/recipes/${recipe.id}`, { replace: true });
    };

    let recipe = props.recipe;

    const favoriteIcon = (recipe.favorite) ? <FavoriteIcon htmlColor='red' /> : <FavoriteBorderIcon htmlColor='red' />;
    const settingsIcon = <SettingsIcon htmlColor='blue' />;
    return (
        <Card sx={{ maxWidth: "600px" }}>
            <CardActionArea onClick={handleAction}>
                <CardMedia
                    component="img"
                    height="140"
                    image={recipe.imageUrl}
                    alt={recipe.title}
                />
            </CardActionArea>
            <CardContent>
                <h2 style={{ textAlign: "center" }}>{recipe.title}</h2>
                <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                    <span style={{ fontWeight: "bold" }}>{recipe.totalTime}</span>
                    <IconButtonMd onClick={() => dispatch(toggleFavorite(recipe))}>{favoriteIcon}</IconButtonMd>
                    <IconButtonMd onClick={() => dispatch(updateRecipe(recipe))}>{settingsIcon}</IconButtonMd>
                </Stack>
            </CardContent>
        </Card >
    );

}