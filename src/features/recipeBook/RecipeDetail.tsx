import { Avatar, Box, Grid, IconButton, Paper, Stack, Typography } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { v4 as uuidv4 } from 'uuid';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectRecipeById, toggleFavorite } from "./RecipeSlice";
import { ImagePreview } from "../../app/ImagePreview";


export default function RecipeDetail() {

    let { recipeId } = useParams();
    console.log(`recipeId: ${recipeId}`);

    const recipe = useAppSelector((state) => selectRecipeById(state, recipeId!));
    const dispatch = useAppDispatch();

    // Recipe Detail Components
    const RecipeTitle = () => <Typography align='center' fontWeight={"bolder"} variant="h3" sx={{ p: 3 }}>{recipe?.title}</Typography>;
    const RecipeDescription = () => <Typography variant="body1">{recipe?.description}</Typography>;
    const RecipeImage = () => <ImagePreview image={recipe?.imageUrl} minWidth={300} minHeight={400} />;
    const RecipeTime = () => (<Typography variant="body1" sx={{ display: "inline" }}>{recipe?.totalTime.toString()}</Typography>);

    const RecipeInstructions = () =>
        <Box>
            <Typography variant="h4" sx={{ p: 1 }}>Instructions</Typography>
            {recipe?.instructions.map((instruction, index) => {
                return (
                    <Stack key={uuidv4()} direction={"row"} spacing={2} justifyContent={"flex-start"} alignItems={"center"} sx={{ p: 2 }} >
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
                    <Stack key={uuidv4()} direction={"row"} spacing={2} justifyContent={"flex-start"} alignItems={"center"} sx={{ p: 1 }}>
                        {/* <Avatar>{ingredient.name.charAt(0).toUpperCase()}</Avatar>
                        <Typography variant="body1">{ingredient.unit}</Typography>
                        <Typography variant="body1">{ingredient.name}</Typography> */}
                    </Stack>
                )
            })}
        </Box>;
        
    const Spacer = (props: { spacing: number }) => <Box sx={{ p: props.spacing }} />;

    const favoriteIcon = (recipe?.favorite) ? <FavoriteIcon htmlColor='red' /> : <FavoriteBorderIcon htmlColor='red' />;
    const FavIcon = () => <IconButton size="large" onClick={() => dispatch(toggleFavorite(recipe!))}>{favoriteIcon}</IconButton>

    return (
        <Grid container spacing={5} p={3}
            direction="row"
            justifyContent="center"
            alignItems="flex-start"
        >
            <Grid item xs={12} sm={12} md={12} lg={6}  >
                <RecipeImage />
            </Grid>
            <Grid item xs={12} md={12} lg={6}  >
                <RecipeTitle />
                <FavIcon/>
                <b>Total time: </b><RecipeTime />
                <Spacer spacing={2} />
                <RecipeDescription />
            </Grid>
            <Grid item xs={12} md={12} >
                <Paper elevation={1}>
                    <Spacer spacing={1} />
                    <RecipeIngredients />
                </Paper>
            </Grid>
            <Grid item xs={12} md={12} >
                <Paper elevation={1}>
                    <Spacer spacing={1} />
                    <RecipeInstructions />
                </Paper>
            </Grid>
        </Grid>
    );
}

