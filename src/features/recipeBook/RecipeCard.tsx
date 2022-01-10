import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { CardActionArea, CardMedia, CardContent, Stack, IconButton } from '@mui/material';
import Card from '@mui/material/Card';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import { RecipeModel } from './RecipeBookModels';
import { toggleFavorite } from './RecipeSlice';


export default function RecipeCard(props: { recipe: RecipeModel }) {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleAction = () => {
        navigate(`/recipes/${recipe.id}`, { replace: true });
    };

    let recipe = props.recipe;

    const favoriteIcon = (recipe.favorite) ? <FavoriteIcon htmlColor='red' /> : <FavoriteBorderIcon htmlColor='red' />;

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
                    <IconButton onClick={() => dispatch(toggleFavorite(recipe))}>{favoriteIcon}</IconButton>
                </Stack>
            </CardContent>
        </Card >
    );

}