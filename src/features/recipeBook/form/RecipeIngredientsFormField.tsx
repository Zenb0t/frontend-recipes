import { Avatar, Box, Button, IconButton, List, ListItem, ListItemAvatar, ListItemText, Paper, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import DeleteIcon from '@mui/icons-material/Delete';
import { IngredientModel } from "../RecipeBookModels";



// The custom ArrayTextField component for the ingredients field
// pass the fieldName as defined in the RecipeForm
export default function RecipeIngredientsField(props: { formik: any, fieldName: string }) {
    const [ingredientName, setIngredientName] = useState('');
    const [ingredientAmount, setIngredientAmount] = useState('');

    const clearFields = () => {
        setIngredientAmount('');
        setIngredientName('');
    }

    const { formik, fieldName } = props;
    const ingredients: IngredientModel[] = formik.values[fieldName];

    const addItem = (name: string, amount: string) => {
        if (name && amount) {
            let newIngredient: IngredientModel = { name, amount };
            formik.setFieldValue(fieldName, [...ingredients, newIngredient]);
        }
    }

    const removeItem = (index: number) => {
        formik.setFieldValue(fieldName, ingredients.filter((item: IngredientModel, i: number) => i !== index));
    }

    const updateItem = (index: number, value: IngredientModel) => {
        const newIngredients = [...ingredients];
        newIngredients[index] = value;
        formik.setFieldValue(fieldName, newIngredients);
    }

    return (
        <Paper sx={{ p: 1 }}>
            <Box>
                <Typography variant="h6">Instructions</Typography>
                <Box sx={{ p: 2 }} />
                <TextField
                    id={"ingredient-amount-input"}
                    value={ingredientAmount}
                    onChange={(e) => setIngredientAmount(e.target.value)}
                    type={'text'}
                    name={'ingredient-amount'}
                    label={'Amount'}
                    variant={'outlined'}
                    margin={'normal'}
                    fullWidth
                />
                <TextField
                    id={"ingredient-name-input"}
                    value={ingredientName}
                    onChange={(e) => setIngredientName(e.target.value)}
                    type={'text'}
                    name={'ingredient-name'}
                    label={'Ingredient Name'}
                    variant={'outlined'}
                    margin={'normal'}
                    fullWidth
                />
            </Box>
            <Button
                variant={'contained'}
                color={'secondary'}
                onClick={() => {
                    addItem(ingredientName, ingredientAmount)
                    clearFields()
                }}
                fullWidth
            >
                Add Ingredient
            </Button>
            <DisplayIngredients ingredients={ingredients} removeItem={removeItem} />
        </Paper>
    );
}

const DisplayIngredients = (props: { ingredients: IngredientModel[], removeItem: Function }) => {
    const { ingredients, removeItem } = props;

    return (
        <List dense>
            {ingredients.map((item: IngredientModel, index: number) => (
                <ListItem key={uuidv4()}
                    secondaryAction={
                        <IconButton edge="end" aria-label="delete" onClick={() => removeItem(index)}>
                            <DeleteIcon />
                        </IconButton>
                    }
                >
                    <ListItemAvatar>
                        <Avatar>{index + 1}</Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={`${item.amount} ${item.name} `} />
                </ListItem>
            )
            )}
        </List>
    );
};