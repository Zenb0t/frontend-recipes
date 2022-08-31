import { useFormik } from 'formik';
import { useAppDispatch } from '../../../../app/hooks';
import { IngredientModel, RecipeModel } from '../../RecipeBookModels';
import { createRecipe } from '../../RecipeSlice';
import { v4 as uuidv4 } from 'uuid';
import yup from 'yup';
import { TextField } from 'formik-mui';

export const RecipeForm2 = (props: { handleClose: Function }) => {

    const dispatch = useAppDispatch();

    interface Values {
        title: string;
        description: string;
        totalTime: string;
        ingredients: IngredientModel[];
        instructions: string[];
        imageUrl: string;
        favorite: boolean;
        id: string;
        cost: number;
    }

    const initialValues: Values = {
        title: '',
        description: '',
        totalTime: '',
        ingredients: [] as IngredientModel[],
        instructions: [] as string[],
        imageUrl: '',
        favorite: false,
        id: '',
        cost: 0,
    };

    const validationSchema = yup.object({
        title: yup.string().required('Required'),
        description: yup.string().required('Required'),
        totalTime: yup.string().required('Required'),
        ingredients: yup.array().of(yup.object({
            name: yup.string().required('Required'),
            amount: yup.string().required('Required'),
            unit: yup.string().required('Required'),
        })).required('At least one ingredient is required'),
        instructions: yup.array().of(yup.string().required('Required')),
        imageUrl: yup.string().required('Required').url('Invalid URL'),
        cost: yup.number().required('Required').min(0, 'Must be greater than 0'),
    });

    function handleSubmit(values: Values) {
        console.log(values);
        const recipe: RecipeModel = { ...values, favorite: false, id: uuidv4() };
        dispatch(createRecipe(recipe));
        props.handleClose();
    }

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema,
        onSubmit: handleSubmit,
    });

    return <form onSubmit={formik.handleSubmit}>
        {/* <TextField
            label='Title'
            variant='outlined'
            fullWidth
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.title}
            error={formik.touched.title && formik.errors.title ? true : false}
            helperText={formik.touched.title && formik.errors.title ? formik.errors.title : ''}
        /> */}

    </form>
}