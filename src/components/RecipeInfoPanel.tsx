import { Box, Text } from "@chakra-ui/react";

interface InfoPanelProps {
  label: string;
  value: string | number | undefined;
  icon?: React.ReactNode;
}

export const RecipeInfoPanel = ({ label, value, icon }: InfoPanelProps) => {
  return (
    <Box display="flex" flexDirection="column" borderRadius="lg" p="1">
      <Box display="flex" alignItems="flex-start" gap="2">
        <Text as="b" fontSize="lg">
          {value}
        </Text>
      </Box>
      <Text>{label}</Text>
    </Box>
  );
};
