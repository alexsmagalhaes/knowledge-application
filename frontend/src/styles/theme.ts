import { createTheme } from "@mui/material/styles";
import { grey } from "@mui/material/colors";

const theme = createTheme({
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          margin: 0,
        },
      },
    },
  },
  typography: {
    fontFamily: "Aspekta, sans-serif",
    allVariants: {
      color: grey[800],
      margin: "0px",
      fontWeight: 500,
    },

    h1: {
      fontSize: "4rem",
      lineHeight: 1.2,
      color: grey[900],
      "@media (max-width:1536px)": { fontSize: "3.5rem" },
      "@media (max-width:1200px)": { fontSize: "3rem" },
      "@media (max-width:900px)": { fontSize: "2.5rem" },
      "@media (max-width:600px)": { fontSize: "2rem" },
    },
    h2: {
      fontSize: "3rem",
      color: grey[900],
      "@media (max-width:1200px)": { fontSize: "2.5rem" },
      "@media (max-width:900px)": { fontSize: "2rem" },
      "@media (max-width:600px)": { fontSize: "1.75rem" },
    },
    h3: {
      fontSize: "2rem",
      color: grey[900],
      "@media (max-width:900px)": { fontSize: "1.75rem" },
      "@media (max-width:600px)": { fontSize: "1.5rem" },
    },
    h4: {
      fontSize: "1.75rem",
      color: grey[900],
      "@media (max-width:600px)": { fontSize: "1.5rem" },
    },
    h5: {
      fontSize: "1.5rem",
      color: grey[900],
    },
    h6: {
      fontSize: "1.5rem",
      color: grey[900],
    },

    body1: {
      fontSize: "0.875rem",
      lineHeight: 1.5,
      // "@media (max-width:600px)": { fontSize: "0.9375rem" },
    },
    body2: {
      fontSize: "0.875rem",
      lineHeight: 1.5,
      // "@media (max-width:600px)": { fontSize: "0.825rem" },
    },
  },

  palette: {
    primary: {
      main: "#6632C9",
    },
    secondary: {
      main: "#6632C9",
    },
    background: {
      default: '#F2F3F5', 
    },
  },
});

export default theme;
