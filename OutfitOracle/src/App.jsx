import { useRef } from "react";
import "./App.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Routes, Route, BrowserRouter, Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import Upload from "./components/Upload";
import Weather from "./components/Weather";

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
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        {/* Navigation Bar */}
        <AppBar position="fixed">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Outfit Oracle
            </Typography>
            <Button color="inherit" component={Link} to="/">
              Home
            </Button>
            <Button color="inherit" onClick={() => homeRef.current?.scrollIntoView({ behavior: "smooth" })}>
              About
            </Button>
            <Button color="inherit" onClick={() => experienceRef.current?.scrollIntoView({ behavior: "smooth" })}>
              Experience
            </Button>
            <Button color="inherit" onClick={() => projectsRef.current?.scrollIntoView({ behavior: "smooth" })}>
              Projects
            </Button>
            <Button color="inherit" onClick={() => skillsRef.current?.scrollIntoView({ behavior: "smooth" })}>
              Skills
            </Button>
            <Button color="inherit" onClick={() => contactRef.current?.scrollIntoView({ behavior: "smooth" })}>
              Contact
            </Button>
          </Toolbar>
        </AppBar>


        {/* Content layout */}
        <div style={{ display: "flex", marginTop: "64px" }}>
          {/* Weather on the left */}
          <div style={{ flex: "0 0 300px", borderRight: "1px solid #ccc" }}>
            <Weather />
          </div>

          {/* Main content */}
          <div style={{ flex: "1", padding: "16px" }}>
            <Routes>
              <Route path="/" element={<Upload />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
