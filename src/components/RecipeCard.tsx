import {
  Box,
  Heading,
  IconButton,
  Link,
  Tag,
  TagLabel,
  TagLeftIcon,
  useColorModeValue,
  Center,
  Flex,
  Text,
} from "@chakra-ui/react";
import {
  MdEgg,
  MdFavorite,
  MdOutlineFavoriteBorder,
  MdOutlineRestaurant,
  MdOutlineWatchLater,
  MdRestaurant,
  MdWatchLater,
} from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks/reduxHooks";
import { Recipe } from "../types/recipe";

interface RecipeCardProps {
  recipe: Recipe;
}

export function RecipeCard(props: RecipeCardProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleAction = () => {
    navigate(`/dashboard/${recipe._id}`, { replace: true });
  };

  let recipe = props.recipe;
  const favIcon = true ? (
    <MdFavorite color="red" />
  ) : (
    <MdOutlineFavoriteBorder color="black" />
  );

  return (
    <Box
      maxH="400px"
      maxW="300px"
      minW="200px"
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
        <Center>
          <Flex
            borderTopRadius={"lg"}
            w={"full"}
            h={"20vh"}
            backgroundImage={recipe.imageUrl}
            backgroundSize={"cover"}
            backgroundPosition={"center center"}
          />
        </Center>
        <Heading minH="80px" py={4} px={4} pb={4} size="md" noOfLines={2}>
          {recipe.title}
        </Heading>
      </Link>
      <Flex p="4" justify="space-around" align="center" gap={4}>
        {/* Extract to own component */}
        <Box
          alignItems={"center"}
          display="flex"
          flexDirection="column"
          backgroundColor={useColorModeValue("gray.100", "gray.700")}
          borderRadius="lg"
          p="2"
        >
          <Box display="flex" alignItems="center" gap="2">
            <MdWatchLater size="24px" />
            <Text fontSize="lg">{recipe.totalTimeInMinutes}</Text>
          </Box>
          <Text>min</Text>
        </Box>
        <Box
          alignItems={"center"}
          display="flex"
          flexDirection="column"
          backgroundColor={useColorModeValue("gray.100", "gray.700")}
          borderRadius="lg"
          p="2"
        >
          <Box display="flex" alignItems="center" gap="2">
            <MdOutlineRestaurant size="24px" />
            <Text fontSize="lg">{recipe.servings}</Text>
          </Box>
          <Text>servings</Text>
        </Box>
        <Box
          alignItems={"center"}
          display="flex"
          flexDirection="column"
          backgroundColor={useColorModeValue("gray.100", "gray.700")}
          borderRadius="lg"
          p="2"
        >
          <Box display="flex" alignItems="center" gap="2">
            <MdEgg size="24px" />
            <Text fontSize="lg">{recipe.ingredients.length}</Text>
          </Box>
          <Text>ingredients</Text>
        </Box>
        {/* <Box
          minW="80px"
          display="flex"
          alignItems="center"
          gap="2"
          border="1px solid red"
        >
          <MdRestaurant size="24px" />
          <Text fontSize="sm">{recipe.ingredients.length} ingredients</Text>
        </Box>
        <Box
          minW="80px"
          display="flex"
          alignItems="center"
          gap="2"
          border="1px solid red"
        >
          <MdOutlineRestaurant size="20px" />
          <Text fontSize="sm">serves {recipe.servings}</Text>
        </Box> */}
        {/* <Tag size="md">
            <TagLeftIcon boxSize="16px" as={MdOutlineWatchLater} />
            <TagLabel>{`${recipe.totalTimeInMinutes} min`}</TagLabel>
          </Tag>
 
          <Tag size="md">
            <TagLabel>{`${recipe.ingredients.length} Ingredients`}</TagLabel>
          </Tag> */}
        {/* <IconButton
            // onClick={() => dispatch(toggleFavorite(recipe))}
            size="md"
            colorScheme=""
            color="red.500"
            aria-label="Toogle Favorite"
            icon={favIcon}
            _hover={{
              transform: "scale(1.2)",
            }}
          /> */}
      </Flex>
    </Box>
  );
}
