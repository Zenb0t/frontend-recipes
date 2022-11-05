import { VStack, Center, Icon, ButtonGroup, Button, Input, Text } from "@chakra-ui/react";
import { FieldProps } from "formik";
import { useState, ChangeEvent, useEffect } from "react";
import { MdImage } from "react-icons/md";


export function ImageURLFormField({ field, form }: FieldProps) {
    const [imageURL, setImageURL] = useState<string>("");

    useEffect(() => {
        form.setFieldValue(field.name, imageURL);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [imageURL]);

    const handleImageURLChange = (event: ChangeEvent<HTMLInputElement>) => {
        setImageURL(event.target.value);
    };

    return (
        <VStack>
            <Center
                borderRadius="lg"
                border={imageURL ? '1px solid #e2e8f0' : '1px dashed #e2e8f0'}
                boxSize={'200px'}
                backgroundImage={imageURL}
                backgroundSize={'cover'}
                backgroundPosition={'center center'}
            >
                {imageURL ? null : <Icon as={MdImage} w={20} h={20} color={"gray.500"} />}
            </Center>
            <Center>
                <Input
                    type="text"
                    placeholder="Image URL"
                    value={imageURL}
                    onChange={handleImageURLChange}
                />
            </Center>
        </VStack>
    );
}


/***
 *  File Upload Component for Formik
 * @param field - FieldProps
 * @param form - FormikProps
 */
export default function FileUpload({ field, form }: FieldProps) {
    const MB = Math.pow(2, 20);
    const MAX_SIZE = 3 * MB;

    const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
    const [imgFile, setImgFile] = useState<File | null>(null);

    const handleUpload = (event: ChangeEvent<HTMLInputElement>) => {
        let files = event.currentTarget.files;

        if (files && isValidImage(files[0])) {
            setImgFile(files[0]);
            let image = URL.createObjectURL(files[0]);

            setSelectedImage(image);

            form.setFieldValue(field.name, image);
        } else {
            setImgFile(null);
            setSelectedImage(undefined);
        }
    }

    function isValidImage(file: File): boolean {
        let isValid = false;
        let errorMsg = '';
        if (file) {
            if (file.size > MAX_SIZE) {
                errorMsg = `Max size is ${MAX_SIZE / MB} MB`;
                form.setFieldError('imageUrl', errorMsg);
            } else if (file.type !== 'image/png' && file.type !== 'image/jpeg') {
                errorMsg = 'File is not an jpeg or png image';
                form.setFieldError('imageUrl', errorMsg);
            } else {
                isValid = true;
                form.setFieldError('imageUrl', undefined);
            }
        } else {
            errorMsg = 'No file selected';
            form.setFieldError('imageUrl', errorMsg);
        }
        return isValid;
    }


    useEffect(() => {
        console.log("Image File: ", imgFile);
        if (imgFile) {
            form.setFieldValue("imageFile", imgFile);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [imgFile]);

    return (

        <VStack>
            <Center
                borderRadius="lg"
                border={selectedImage ? '1px solid #e2e8f0' : '1px dashed #e2e8f0'}
                boxSize={'200px'}
                backgroundImage={selectedImage}
                backgroundSize={'cover'}
                backgroundPosition={'center center'}
            >
                {selectedImage ? null : <Icon as={MdImage} w={20} h={20} color={"gray.500"} />}
            </Center>
            <Center>
                {/**TODO: fix the button overflow */}
                <ButtonGroup isAttached colorScheme={'green'} position="relative">
                    <Button>
                        Upload Image
                        <Input
                            _hover={{ cursor: 'pointer' }}
                            position="absolute"
                            type="file"
                            id="imageUrl"
                            name="imageUrl"
                            variant="filled"
                            opacity={0}
                            accept="image/*"
                            w='100%'
                            h='100%'
                            onChange={(e) => handleUpload(e)}
                        />
                    </Button>
                    <Button variant={'outline'}>
                        <Text noOfLines={1} maxWidth={'sm'}>
                            {imgFile && imgFile?.name.length > 24
                                ? imgFile?.name.substring(0, 24) + '...'
                                : imgFile?.name}
                        </Text>
                    </Button>
                </ButtonGroup>
            </Center>
        </VStack>
    )
}