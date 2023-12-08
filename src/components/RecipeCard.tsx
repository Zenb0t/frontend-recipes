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
  Divider,
} from "@chakra-ui/react";
import {
  MdEgg,
  MdFavorite,
  MdOutlineFavoriteBorder,
  MdOutlineRestaurant,
  MdOutlineWatchLater,
  MdPeople,
  MdPerson,
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
      <Flex
        px={4}
        pb={4}
        justify="space-around"
        align="center"
        gap={2}
        flexDirection={"row"}
      >
        <RecipeInfoPanel
          label="minutes"
          value={recipe.totalTimeInMinutes}
          icon={<MdOutlineWatchLater size="24px" />}
        />
        <Center h="48px">
          <Divider orientation="vertical" />
        </Center>
        <RecipeInfoPanel
          label="servings"
          value={recipe.servings}
          icon={<MdPeople size="24px" />}
        />
        <Center h="48px">
          <Divider orientation="vertical" />
        </Center>
        <RecipeInfoPanel
          label="ingredients"
          value={recipe.ingredients.length}
          icon={<MdEgg size="24px" />}
        />
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

interface InfoPanelProps {
  label: string;
  value: string | number | undefined;
  icon: React.ReactNode;
}

const RecipeInfoPanel = ({ label, value, icon }: InfoPanelProps) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      borderRadius="lg"
      p="1"
    >
      <Box display="flex" alignItems="flex-start" gap="2">
        <Text as="b" fontSize="lg">{value}</Text>
      </Box>
        <Text>{label}</Text>
    </Box>
  );
};
