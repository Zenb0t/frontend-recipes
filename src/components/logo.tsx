import { HStack, Icon, Text } from "@chakra-ui/react";
import { GiCookingPot } from "react-icons/gi";

export const PanelaLogo = () => {
    return (
        <HStack align="center" justify="left">
            <Icon as={GiCookingPot} boxSize="2.5rem" />
            <Text fontSize="3xl" fontWeight="bold">
                Panela
            </Text>
        </HStack>
    );
};