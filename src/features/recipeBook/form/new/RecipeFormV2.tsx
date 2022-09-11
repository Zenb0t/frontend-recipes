import { useFormik } from 'formik';
import { useAppDispatch } from '../../../../app/hooks';
import { IngredientModel, RecipeModel } from '../../RecipeBookModels';
import { createRecipe } from '../../RecipeSlice';
import { v4 as uuidv4 } from 'uuid';
import { yup } from '../../../../app/utils';
import { TextField } from 'formik-mui';
import { Box, Button, FormControl, FormLabel, Input, InputGroup, InputLeftElement, Textarea, VStack } from '@chakra-ui/react';
import { MdOutlineEmail } from 'react-icons/md';
import { BsPerson } from 'react-icons/bs';

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
        // console.log(values);
        // const recipe: RecipeModel = { ...values, favorite: false, id: uuidv4() };
        // dispatch(createRecipe(recipe));
        // props.handleClose();
    }

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema,
        onSubmit: handleSubmit,
    });

    return <form onSubmit={formik.handleSubmit}>
        <Box bg="white" borderRadius="lg">
            <Box m={8} color="#0B0E3F">
                <VStack spacing={5}>
                    <FormControl id="name">
                        <FormLabel>Your Name</FormLabel>
                        <InputGroup borderColor="#E0E1E7">
                            <InputLeftElement
                                pointerEvents="none"
                                children={<BsPerson color="gray.800" />}
                            />
                            <Input type="text" size="md" />
                        </InputGroup>
                    </FormControl>
                    <FormControl id="name">
                        <FormLabel>Mail</FormLabel>
                        <InputGroup borderColor="#E0E1E7">
                            <InputLeftElement
                                pointerEvents="none"
                                children={<MdOutlineEmail color="gray.800" />}
                            />
                            <Input type="text" size="md" />
                        </InputGroup>
                    </FormControl>
                    <FormControl id="name">
                        <FormLabel>Message</FormLabel>
                        <Textarea
                            borderColor="gray.300"
                            _hover={{
                                borderRadius: 'gray.300',
                            }}
                            placeholder="message"
                        />
                    </FormControl>
                    <FormControl id="name" float="right">
                        <Button
                            type="submit"
                            variant="solid"
                            bg="#0D74FF"
                            color="white"
                            _hover={{}}>
                            Send Message
                        </Button>
                    </FormControl>
                </VStack>
            </Box>
        </Box>

    </form>
}