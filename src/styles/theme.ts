import { createTheme } from '@mui/material/styles';

/**
 * MUI theme – project-level overrides.
 * CSS variables in variables.css must stay in sync with these values.
 */
const theme = createTheme({
  palette: {
    primary: {
      main: 'rgb(0, 82, 255)',        // --color-primary
      dark: 'rgb(0, 66, 204)',        // --color-primary-hover
      light: 'rgb(230, 237, 255)',    // --color-primary-light
    },
  },
  typography: {
    fontFamily:
      "'Avenir Next LT Pro', 'Avenir Next', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
  components: {
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
        size: 'small',
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
  },
});

export default theme;
