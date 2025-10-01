import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import HomePage from "./app/pages/homes/HomePage";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#ff4081",
    },
    secondary: {
      main: "#03dac6",
    },
    background: {
      default: "#0a0a0a",
      paper: "#1a1a1a",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 600,
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App" style={{
        width: '100%',
        margin: 0,
        padding: 0,
        overflowX: 'hidden'
      }}>
        <HomePage />
      </div>
    </ThemeProvider>
  );
}

export default App;
