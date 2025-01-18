import { useRef } from "react";
import "./App.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Routes, Route, BrowserRouter } from "react-router";
import Upload from "./components/Upload";

const theme = createTheme({
  typography: {
    h5: {
      fontWeight: "bold",
    },
    h1: {
      fontWeight: "bold",
      textTransform: "uppercase",
    },
  },
  palette: {
    mode: "dark",
    primary: {
      main: "#FFB347",
    },
    secondary: {
      main: "#4794ff",
    },
  },
});

function App() {
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const experienceRef = useRef(null);
  const projectsRef = useRef(null);
  const skillsRef = useRef(null);
  const contactRef = useRef(null);

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Upload />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
