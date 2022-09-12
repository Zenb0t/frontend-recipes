//Mui imports
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import SettingsIcon from '@mui/icons-material/Settings';
import { CardActionArea, CardMedia, CardContent, Stack, IconButton as IconButtonMd } from '@mui/material';
import Card from '@mui/material/Card';
//Chakra imports
import { Box, Flex, Heading, IconButton, Link, Tag, TagLabel, TagLeftIcon, } from '@chakra-ui/react';
import { MdAttachMoney, MdFavorite, MdOutlineFavoriteBorder, MdOutlineWatchLater } from 'react-icons/md';


//RecipeCard component
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import { RecipeModel } from './RecipeBookModels';
import { toggleFavorite, updateRecipe } from './RecipeSlice';
import { timeToStringShort } from '../../app/utils';

export function RecipeCard(props: { recipe: RecipeModel }) {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleAction = () => {
        navigate(`/recipes/${recipe.id}`, { replace: true });
    };

    let recipe = props.recipe;
    const favIcon = (recipe.favorite) ? <MdFavorite color='red' /> : < MdOutlineFavoriteBorder color='black' />;

    return (<Box
        maxH="200px"
        maxW="200px"
        shadow="md"
        bg="whiteAlpha.900"
        p="4"
        borderWidth="1px"
        borderRadius="lg"
        _hover={{
            bg: "whiteAlpha.800",
            shadow: "lg"
        }}
    >
        <Link _hover={{}} onClick={handleAction}>
            <Heading size="md" noOfLines={2}>{recipe.title}</Heading>
        </Link>
        <Flex py='4' alignItems='center' justifyItems="center" gap='2'>
            <Tag size='md' colorScheme='blackAlpha'>
                <TagLabel >{`$ ${recipe.cost.toFixed(2)}`}</TagLabel>
            </Tag>
            <Tag size='md' colorScheme='blackAlpha'>
                <TagLeftIcon boxSize='12px' as={MdOutlineWatchLater} />
                <TagLabel>{`${timeToStringShort(recipe.totalTime)}`}</TagLabel>
            </Tag>
        </Flex>
        <Tag size='lg' colorScheme='blackAlpha'>
            <TagLabel lineHeight="2.2">{recipe.ingredients.length} Ingredients </TagLabel>
        </Tag>
        <IconButton
            onClick={() => dispatch(toggleFavorite(recipe))}
            size="md"
            colorScheme="" color="red.500"
            aria-label='Toogle Favorite' icon={favIcon}
        />
    </Box>
    );


}


export function RecipeCard2(props: { recipe: RecipeModel }) {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleAction = () => {
        navigate(`/recipes/${recipe.id}`, { replace: true });
    };

    let recipe = props.recipe;

    const favoriteIcon = (recipe.favorite) ? <FavoriteIcon htmlColor='red' /> : <FavoriteBorderIcon htmlColor='red' />;
    const settingsIcon = <SettingsIcon htmlColor='blue' />;
    return (
        <Card sx={{ maxWidth: "600px" }}>
            <CardActionArea onClick={handleAction}>
                <CardMedia
                    component="img"
                    height="140"
                    image={recipe.imageUrl}
                    alt={recipe.title}
                />
            </CardActionArea>
            <CardContent>
                <h2 style={{ textAlign: "center" }}>{recipe.title}</h2>
                <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                    <span style={{ fontWeight: "bold" }}>{recipe.totalTime.toString()}</span>
                    <IconButtonMd onClick={() => dispatch(toggleFavorite(recipe))}>{favoriteIcon}</IconButtonMd>
                    <IconButtonMd onClick={() => dispatch(updateRecipe(recipe))}>{settingsIcon}</IconButtonMd>
                </Stack>
            </CardContent>
        </Card >
    );

}