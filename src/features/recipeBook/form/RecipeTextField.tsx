import { TextField } from "@mui/material";
import { capitalizeFirstLetter } from "../../../app/utils";


export const RecipeTextField = (props: { formik: any, fieldName: string }) => {

    const { formik, fieldName } = props;
    return <TextField
        autoFocus
        id={`recipe-${fieldName}`}
        defaultValue={formik.values[fieldName]}
        onChange={formik.handleChange}
        type={'text'}
        name={fieldName}
        label={capitalizeFirstLetter(fieldName)}
        variant={'outlined'}
        fullWidth
        margin={'normal'}
        error={formik.errors[fieldName] && formik.touched[fieldName] ? true : false}
        helperText={formik.errors[fieldName]}
    />;
}