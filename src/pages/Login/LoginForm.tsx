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
import useAuthHandler from "../../hooks/useAuthHandler";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function LoginPage() {
  const { isAuthenticated, isLoading, loginWithPopup } = useAuthHandler();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      navigate("/dashboard/allrecipes");
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isAuthenticated)
    return (
      <Center w={"full"} h={"50vh"}>
        <Text fontSize={"lg"} color={"gray.600"}>
          Redirecting...
        </Text>
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
