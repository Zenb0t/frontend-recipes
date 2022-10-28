//Chakra imports
import { Box, Heading, IconButton, Link, Tag, TagLabel, TagLeftIcon, useColorModeValue, Image, Center, Wrap, WrapItem } from '@chakra-ui/react';
import { MdFavorite, MdOutlineFavoriteBorder, MdOutlineWatchLater } from 'react-icons/md';

//RecipeCard component
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../app/hooks';
import { RecipeModel } from '../features/recipeBook/models';
import { toggleFavorite } from '../features/recipeBook/recipe-slice';
import { timeToStringShort } from '../app/utils';

export function RecipeCard(props: { recipe: RecipeModel }) {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleAction = () => {
        navigate(`/recipes/${recipe.id}`, { replace: true });
    };

    let recipe = props.recipe;
    const favIcon = (recipe.favorite) ? <MdFavorite color='red' /> : < MdOutlineFavoriteBorder color='black' />;

    return (<Box
        maxH="400px"
        maxW="200px"
        shadow="md"
        bg={useColorModeValue("white", "gray.800")}
        borderWidth="1px"
        borderRadius="lg"
        _hover={{
            bg: useColorModeValue("white", "gray.700"),
            shadow: "lg",
            borderColor: useColorModeValue("gray.300", ""),
        }}
    >
        <Link _hover={{}} onClick={handleAction}>
            <Center >
                <Image
                    borderRadius="lg"
                    boxSize={'200px'}
                    objectFit="cover"
                    src={recipe.imageUrl}
                    alt={recipe.title} />
            </Center>
            <Heading py="2" px='4' size="md" noOfLines={2}>{recipe.title}</Heading>
        </Link>
        <Wrap p="4" alignItems='center' justifyItems="center" gap='2'>
            <WrapItem>
                <Tag size='md' >
                    <TagLabel >{`$ ${recipe.cost.toFixed(2)}`}</TagLabel>
                </Tag>
            </WrapItem>
            <WrapItem>
                <Tag size='md' >
                    <TagLeftIcon boxSize='12px' as={MdOutlineWatchLater} />
                    <TagLabel>{`${timeToStringShort(recipe.totalTime)}`}</TagLabel>
                </Tag>
            </WrapItem>
            <WrapItem>
                <Tag size='lg' >
                    <TagLabel lineHeight="2.2">{recipe.ingredients.length} Ingredients </TagLabel>
                </Tag>
            </WrapItem>
            <WrapItem>
                <IconButton
                    onClick={() => dispatch(toggleFavorite(recipe))}
                    size="md"
                    colorScheme=""
                    color="red.500"
                    aria-label='Toogle Favorite'
                    icon={favIcon}
                />
            </WrapItem>
        </Wrap>
    </Box>
    );


}