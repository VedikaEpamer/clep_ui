import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import AppRouter from './router/AppRouter';

const theme = createTheme({
  palette: {
    primary: { main: '#1565C0' },
    background: { default: '#F4F6F8' },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiTextField: {
      defaultProps: { size: 'small' },
    },
    MuiButton: {
      styleOverrides: {
        root: { textTransform: 'none' },
      },
    },
  },
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppRouter />
    </ThemeProvider>
  );
}
