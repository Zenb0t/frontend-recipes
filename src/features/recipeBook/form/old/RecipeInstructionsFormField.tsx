import { Avatar, Box, Button, IconButton, List, ListItem, ListItemAvatar, ListItemText, Paper, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import DeleteIcon from '@mui/icons-material/Delete';



// The custom ArrayTextField component for the instructions field
// pass the fieldName as defined in the RecipeForm
export default function RecipeInstructionsField(props: { formik: any, fieldName: string }) {
    const [fieldValue, setFieldValue] = useState('');
    const clearFieldValue = () => setFieldValue('')

    const { formik, fieldName } = props;
    const instructions = formik.values[fieldName];

    const addItem = (value: string) => {
        if (value) {
            formik.setFieldValue(fieldName, [...instructions, value]);
        }
    }

    const removeItem = (index: number) => {
        formik.setFieldValue(fieldName, instructions.filter((item: string, i: number) => i !== index));
    }

    //TODO: Remove commented when making recipe editable
    // const updateItem = (index: number, value: string) => {
    //     const newInstructions = [...instructions];
    //     newInstructions[index] = value;
    //     formik.setFieldValue(fieldName, newInstructions);
    // }

    return (
        <Paper sx={{ p: 1 }}>
            <Typography variant="h6">Instructions</Typography>
            <Box sx={{ p: 2 }} />
            <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={2}
            >
                <TextField
                    id={"item-input"}
                    value={fieldValue}
                    onChange={(e) => setFieldValue(e.target.value)}
                    type={'text'}
                    name={fieldName}
                    label={fieldName}
                    variant={'outlined'}
                    margin={'normal'}
                    multiline
                    fullWidth
                />
            </Stack>
            <Button
                sx={{
                    marginTop: '1rem'
                }}
                variant={'contained'}
                color={'secondary'}
                onClick={() => {
                    addItem(fieldValue)
                    clearFieldValue()
                }}
            >
                Add {fieldName}
            </Button>
            <DisplayInstructions instructions={instructions} removeItem={removeItem} />
        </Paper>
    );
};

const DisplayInstructions = (props: { instructions: string[], removeItem: Function }) => {
    const { instructions, removeItem } = props;

    return (
        <List dense>
            {instructions.map((item: string, index: number) => (
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
                    <ListItemText primary={item} />
                </ListItem>
            )
            )}
        </List>
    );
};