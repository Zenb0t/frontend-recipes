import React from "react";
import { CardActionArea, CardContent, Dialog } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Card from '@mui/material/Card';
import { RecipeForm } from "./form/old/RecipeForm";

export default function AddRecipeCard() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => { setOpen(true); };

    const handleClose = () => { setOpen(false); }


    return <div>
    <Card sx={{ maxWidth: "345px", minWidth: "210px", textAlign: "center" }}>
        <CardActionArea onClick={handleClickOpen}>
            <CardContent>
                <AddCircleIcon sx={{ height: 60, width: 60 }} />
                <h2>Add Recipe</h2>
            </CardContent>
        </CardActionArea>
    </Card>
    <Dialog open={open} onClose={handleClose}>
        <RecipeForm handleClose={handleClose} />  
    </Dialog>
    </div>;
}