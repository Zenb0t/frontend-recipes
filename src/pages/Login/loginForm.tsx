import {
  Flex,
  Box,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Center,
  Spinner,
} from "@chakra-ui/react";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  sendUser,
  setUserInfo,
  setUserToken,
} from "../../features/user/user-slice";
import { useAppDispatch } from "../../app/hooks";
import sanitizedConfig from "../../config";
import { UserModel } from "../../types/user";

export default function LoginPage() {
  const {
    isAuthenticated,
    isLoading,
    loginWithPopup,
    user,
    getAccessTokenSilently,
  } = useAuth0();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isLoading && isAuthenticated && user) {
      //   dispatch(setUserInfo(user));
      getAccessTokenSilently({
        authorizationParams: {
          audience: sanitizedConfig.AUTH0_AUDIENCE,
          scope: "openid profile email",
        },
      }).then((token) => {
        dispatch(setUserToken(token));
        dispatch(sendUser({ user })); // Send user and token together
        navigate("/dashboard/allrecipes");
      });
    }
  }, [
    dispatch,
    getAccessTokenSilently,
    isAuthenticated,
    isLoading,
    navigate,
    user,
  ]);

  if (isAuthenticated)
    return (
      <Center w={"full"} h={"50vh"}>
        <Spinner size="xl" color={"green.500"} />
      </Center>
    );

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Welcome to Panela</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            Sign-in to your account
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <Stack spacing={10}>
              <Button
                bg={"green.400"}
                color={"white"}
                _hover={{
                  bg: "green.500",
                }}
                onClick={() => loginWithPopup()}
              >
                Login
              </Button>
              <Stack pt={6}>
                <Text align={"center"}>
                  New user? <Link color={"green.400"}>Sign Up</Link>
                </Text>
              </Stack>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}