import { createTheme } from "@mui/material/styles";

const theme = {
    palette: {
        type: 'light',
        primary: {
          main: '#009688',
          light: '#b2dfdb',
          dark: '#00796b',
        },
        secondary: {
          main: '#ff9800',
          light: '#ffcc80',
          dark: '#f57c00',
        },
      },
}

type CustomTheme = {
    [Key in keyof typeof theme]: typeof theme[Key]
}

declare module '@mui/material/styles' {
    interface Theme extends CustomTheme { }
    interface ThemeOptions extends CustomTheme { }
}

export default createTheme(theme)

