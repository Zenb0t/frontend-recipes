import { extendTheme, ThemeConfig } from "@chakra-ui/react";


const config: ThemeConfig = {
    initialColorMode: 'light',
    useSystemColorMode: false,
  }
  
export const chakraTheme = extendTheme({config});