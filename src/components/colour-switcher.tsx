import { useColorMode, useColorModeValue, IconButton, useBreakpointValue } from '@chakra-ui/react';
import { FaMoon, FaSun } from 'react-icons/fa';

export const ColorModeSwitcher = (props: any) => {
  const { toggleColorMode } = useColorMode();
  const text = useColorModeValue('dark', 'light');
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);

  return (
    <IconButton
      size="md"
      fontSize="lg"
      aria-label={`Switch to ${text} mode`}
      variant="ghost"
      color="current"
      ml={useBreakpointValue({ base: '0', md: '2' })}
      mr={useBreakpointValue({ base: '2', md: '0' })}
      onClick={toggleColorMode}
      icon={<SwitchIcon />}
      {...props}
    />
  );
};