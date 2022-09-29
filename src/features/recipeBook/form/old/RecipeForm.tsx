import { useFormik } from 'formik';
import { Button, Grid, } from '@mui/material';
import { IngredientItem, IngredientModel, RecipeModel } from '../../models';
import { v4 as uuidv4 } from 'uuid';
import { useAppDispatch } from '../../../../app/hooks';
import { createRecipe } from '../../recipe-slice';
import { RecipeTextField } from './RecipeTextField';
import RecipeInstructionsFormField from './RecipeInstructionsFormField';
import RecipeIngredientsField from './RecipeIngredientsFormField';
import { Time } from '../../../../app/utils';

export const RecipeForm = (props: { handleClose: Function }) => {

    const dispatch = useAppDispatch();

    const validate = (values: any) => {
        const errors: any = {};
        if (!values.title) {
            errors.title = 'Required';
        }
        if (!values.description) {
            errors.description = 'Required';
        }
        if (!values.totalTime) {
            errors.totalTime = 'Required';
        }
        if (values.ingredients.length === 0) {
            errors.ingredients = 'At least one ingredient is required';
        }
        if (values.instructions.length === 0) {
            errors.instructions = 'At least one instruction is required';
        }
        if (!values.imageUrl) {
            errors.imageUrl = 'Required';
        } else if (/^(ht|f)tp(s?):\/\/[0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*(:(0-9)*)*(\/?)([a-zA-Z0-9\-.?,'/\\+&amp;%$#_]*)?$^/.test(values.imageUrl)) {
            errors.imageUrl = 'Invalid URL';
        }
        if (!values.cost) {
            errors.cost = 'Required';
        }
        console.log(errors);
        return errors;
    };

    const formik = useFormik<RecipeModel>({
        initialValues: {
            title: '',
            description: '',
            totalTime: { hours: 0, minutes: 0 },
            ingredients: [] as IngredientItem[],
            instructions: [] as string[],
            imageUrl: '',
            favorite: false,
            id: '',
            cost: 0,
        }, validate: validate,
        onSubmit: values => {
            console.log(values);
            const recipe: RecipeModel = { ...values, favorite: false, id: uuidv4() };
            dispatch(createRecipe(recipe));
            props.handleClose();
        },
    });

    return (
        <form className='recipe-form' onSubmit={formik.handleSubmit}>
            <h1>Add Recipe</h1>
            <Grid container spacing={2} justifyContent={'center'}>
                <Grid item xs={12} md={9} >
                    <RecipeTextField formik={formik} fieldName={"title"} />
                </Grid>
                <Grid item xs={12} md={9}>
                    <RecipeTextField formik={formik} fieldName={"description"} />
                </Grid>
                <Grid item xs={12} md={3}>
                    <RecipeTextField formik={formik} fieldName={"totalTime"} />
                </Grid>
                <Grid item xs={12} md={12}>
                    <RecipeIngredientsField formik={formik} fieldName={"ingredients"} />
                </Grid>
                <Grid item xs={12} md={12}>
                    <RecipeInstructionsFormField formik={formik} fieldName={"instructions"} />
                </Grid>
                <Grid item xs={12}>
                    <Button
                        type={'submit'}
                        variant={'contained'}
                        color={'primary'}
                        fullWidth
                    >
                        Add Recipe
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
}