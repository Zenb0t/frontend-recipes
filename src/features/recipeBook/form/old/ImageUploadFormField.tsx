import { Input, Stack } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { ImagePreview } from "../../../../app/ImagePreview";


const MB = Math.pow(2, 20);
const MAX_SIZE = 3 * MB;

//Defines the UI and behaviour of the ImageUpload component
export default function ImageUpload(props: { formik: any, fieldName: string }) {
    const [selectedImage, setSelectedImage] = useState(''); //TODO: add a placeholder image
    const [imageError, setImageError] = useState('');


    const handleUpload = (event: ChangeEvent<HTMLInputElement>) => {
        let files = event.currentTarget.files;
        if (files && isValidImage(files[0])) {
            console.group("ImageUpload");
            let image = URL.createObjectURL(files[0]);
            console.log(image);
            setSelectedImage(image);
            console.info(`Image added: ${files[0].name}`);
            console.groupEnd();
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

    //Adding the other dependencies to the useEffect hook will cause the component to re-render when the formik state changes
    //which might create extra overhead and unknown side effects. Hence, linting is disabled for this hook.
    useEffect(() => {
        props.formik.setFieldValue(props.fieldName, selectedImage, false);
        console.log(selectedImage)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedImage]);

    return (
        <Stack spacing={3} m={3} justifyContent="center" alignItems="center">
            {selectedImage && <ImagePreview image={selectedImage} width={200} height={200} />}
            {/* <ImagePreview image={selectedImage} width={200} height={200} /> */}
            <label htmlFor="upload-image">
                <Input id="upload-image" type="file" onChange={(e: ChangeEvent<HTMLInputElement>) => handleUpload(e)} />
            </label>
        </Stack>
    );
}



