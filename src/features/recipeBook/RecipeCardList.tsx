import { Grid, Typography } from "@mui/material";
import RecipeCard from "./RecipeCard";
import { RecipeModel } from "./RecipeBookModels";


export default function RecipeCardList(props: { recipes: RecipeModel[] }) {

    const recipes = props.recipes;

    return (
        <Grid container spacing={2}>

            {recipes.length === 0 ? <Typography p={6} mb={4} variant="h5" align="center">No recipes found. Create a new Recipe or Generate one!</Typography> :

                recipes.map((recipe: RecipeModel) => (
                    <Grid key={recipe.id} minWidth={"320px"} item sm={2}>
                        <RecipeCard recipe={recipe} />
                    </Grid>
                ))
            }
        </Grid>
    );
}