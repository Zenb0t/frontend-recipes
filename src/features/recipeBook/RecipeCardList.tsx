import { Grid } from "@mui/material";
import RecipeCard from "./RecipeCard";
import {RecipeModel} from "./RecipeBookModels";


export default function RecipeCardList(props: { recipes: RecipeModel[] }) {

    const recipes = props.recipes;

    return (
        <Grid container spacing={2}>
            {recipes.map((recipe) => (
                <Grid minWidth={"320px"} item sm={2}>
                    <RecipeCard key={recipe.id} recipe={recipe} />
                </Grid>
            ))}
        </Grid>
    );





}