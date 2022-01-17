import { Button, Container, Stack } from "@mui/material";
import { Box, spacing } from "@mui/system";
import { url } from "inspector";
import { ChangeEvent, useState } from "react";


const MB = Math.pow(2, 20);
const MAX_SIZE = 2 * MB;

//Defines the UI and behaviour of the ImageUpload component
export default function ImageUpload(props: { formik: any, fieldName: string }) {
    const [selectedImage, setSelectedImage] = useState(''); //TODO: add a placeholder image
    const [imageError, setImageError] = useState('');


    const handleUpload = (event: ChangeEvent<HTMLInputElement>) => {
        let files = event.currentTarget.files;
        if (files && isValidImage(files[0])) {
            setSelectedImage(URL.createObjectURL(files[0]));
            props.formik.setFieldValue(props.fieldName, selectedImage);
        } else {
            console.log(imageError);
        }
    }

    function isValidImage(file: File): boolean {
        if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
            setImageError('Only jpeg and png images are allowed.');
            return false;
        }
        if (file.size > MAX_SIZE) {
            setImageError(`Image is too large. Max size is ${MAX_SIZE / MB}MB.`);
            return false;
        }
        if (file === null) {
            setImageError('No image selected.');
            return false;
        }
        setImageError('');
        return true;
    }

    return (
        <Stack spacing={3} justifyContent="center" alignItems="center">
            {/*
            Can't use [Input] from MUI due to wrong ChangeEvent return type, <HTMLInputElement> | <HTMLTextAreaElement>
            best solution is to implement a custom input component, but a Box will do the work for now.
            TODO: implement a custom input component
            */}
            <Box component="input" type="file" onChange={(e: ChangeEvent<HTMLInputElement>) => handleUpload(e)} />
            <Button variant="contained" color="secondary" onClick={(e) => imageError ? console.log(imageError) : console.log(selectedImage)}>
                Upload Image
            </Button>
        </Stack>
    );
}

// export const ImagePreview = (props: { image: string }) => {
//     return (
//         <Container >
//             <Box component="img" src={props.image} alt="image preview" width={"100%"} maxWidth={350} sx={{ border: "dotted" }} />
//         </Container>
//     );
// }




