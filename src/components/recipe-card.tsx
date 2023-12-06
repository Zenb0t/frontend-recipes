//Chakra imports
import { Box, Heading, IconButton, Link, Tag, TagLabel, TagLeftIcon, useColorModeValue, Center, Wrap, WrapItem, Flex } from '@chakra-ui/react';
import { MdFavorite, MdOutlineFavoriteBorder, MdOutlineWatchLater } from 'react-icons/md';

//RecipeCard component
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../app/hooks';
import { RecipeModel } from '../features/recipeBook/models';
import { timeToStringShort } from '../app/utils';
import { Recipe } from '../types/recipe';

export function RecipeCard(props: { recipe: Recipe }) {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleAction = () => {
        navigate(`/dashboard/${recipe._id}`, { replace: true });
    };

    let recipe = props.recipe;
    const favIcon = (true) ? <MdFavorite color='red' /> : < MdOutlineFavoriteBorder color='black' />;

    return (<Box
        maxH="400px"
        maxW="300px"
        shadow="md"
        bg={useColorModeValue("white", "gray.800")}
        borderWidth="1px"
        borderRadius="lg"
        _hover={{
            bg: useColorModeValue("white", "gray.700"),
            shadow: "lg",
            borderColor: useColorModeValue("gray.300", ""),
            transform: "scale(1.02)",
        }}
    >
        <Link _hover={{}} onClick={handleAction}>
            <Center >
                <Flex
                    borderRadius={["lg", "lg", "none", "none"]}
                    w={'full'}
                    h={'20vh'}
                    backgroundImage={
                        recipe.imageUrl
                    }
                    backgroundSize={'cover'}
                    backgroundPosition={'center center'}
                />
            </Center>
            <Heading py="2" px='4' pb={4} size="md" noOfLines={2}>{recipe.title}</Heading>
        </Link>
        <Wrap p="4" alignItems='center' justifyItems="center" gap='2'>
            <WrapItem>
                <Tag size='md' >
                    <TagLabel >{`$ ${recipe.cost?.toFixed(2)}`}</TagLabel>
                </Tag>
            </WrapItem>
            <WrapItem>
                <Tag size='md' >
                    <TagLeftIcon boxSize='12px' as={MdOutlineWatchLater} />
                    <TagLabel>{`${recipe.totalTimeInMinutes}`}</TagLabel>
                </Tag>
            </WrapItem>
            <WrapItem>
                <Tag size='lg' >
                    <TagLabel lineHeight="2.2">{recipe.ingredients.length} Ingredients </TagLabel>
                </Tag>
            </WrapItem>
            <WrapItem>
                <IconButton
                    // onClick={() => dispatch(toggleFavorite(recipe))}
                    size="md"
                    colorScheme=""
                    color="red.500"
                    aria-label='Toogle Favorite'
                    icon={favIcon}
                    _hover={{
                        transform: "scale(1.2)",
                    }}
                />
            </WrapItem>
        </Wrap>
    </Box>
    );
}