import { Avatar, Box, Grid, IconButton, Stack, Typography } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectRecipeById, toggleFavorite } from "./RecipeSlice";


export default function RecipeDetail() {

    let { recipeId } = useParams();
    console.log(`recipeId: ${recipeId}`);

    const recipe = useAppSelector((state) => selectRecipeById(state, recipeId!));
    const dispatch = useAppDispatch();

    // Recipe Detail Components
    const RecipeTitle = () => <Typography align='center' fontWeight={"bolder"} variant="h3" sx={{ p: 3 }}>{recipe?.title}</Typography>;
    const RecipeDescription = () => <Typography variant="body1">{recipe?.description}</Typography>;
    const RecipeImage = () => <Box component='img' src={recipe?.imageUrl} alt={recipe?.title} width={"100%"} />;

    const RecipeTime = () => (<Typography variant="body1" sx={{ display: "inline" }}>{recipe?.totalTime}</Typography>);

    const RecipeInstructions = () =>
        <Box>
            <Typography variant="h4" sx={{ p: 1 }}>Instructions</Typography>
            {recipe?.instructions.map((instruction, index) => {
                return (
                    <Stack direction={"row"} spacing={2} justifyContent={"flex-start"} alignItems={"center"} sx={{ p: 2 }} >
                        <Avatar>{index + 1}</Avatar>         <Typography variant="body1">{instruction}</Typography>
                    </Stack>
                )
            })}
        </Box>;

    const RecipeIngredients = () =>
        <Box>
            <Typography variant="h4" sx={{ p: 1 }}>Ingredients</Typography>
            {recipe?.ingredients.map((ingredient, index) => {
                return (
                    <Stack direction={"row"} spacing={2} justifyContent={"flex-start"} alignItems={"center"} sx={{ p: 1 }}>
                        <Avatar>{ingredient.name.charAt(0).toUpperCase()}</Avatar>
                        <Typography variant="body1">{ingredient.amount}</Typography>
                        <Typography variant="body1">{ingredient.name}</Typography>
                    </Stack>
                )
            })}
        </Box>;


    const Spacer = (props: { spacing: number }) => <Box sx={{ p: props.spacing }} />;

    const favoriteIcon = (recipe?.favorite) ? <FavoriteIcon htmlColor='red' /> : <FavoriteBorderIcon htmlColor='red' />;

    const RecipeHeader = () => (
        <Box>
            <RecipeTitle />
            <Stack>
                <b>Total time: </b><RecipeTime />
                <IconButton onClick={() => dispatch(toggleFavorite(recipe!))}>{favoriteIcon}</IconButton>
            </Stack>

            <Spacer spacing={2} />
            <RecipeDescription />
        </Box>
    );


    return (
        <Grid container spacing={2}
            direction="row"
            justifyContent="center"
            alignItems="flex-start"
        >
            <Grid item xs={12} sm={12} md={12} lg={6} xl={4}   >
                <RecipeImage />
            </Grid>
            <Grid item xs={12} md={12} lg={6}  >
                <RecipeTitle />
                <b>Total time: </b><RecipeTime />
                <IconButton onClick={() => dispatch(toggleFavorite(recipe!))}>{favoriteIcon}</IconButton>
                <Spacer spacing={2} />
                <RecipeDescription />
            </Grid>
            <Grid item xs={12} md={6} >
                <Spacer spacing={1} />
                <RecipeIngredients />
            </Grid>
            <Grid item xs={12} md={6} >
                <Spacer spacing={1} />
                <RecipeInstructions />
            </Grid>
        </Grid>
    );
}