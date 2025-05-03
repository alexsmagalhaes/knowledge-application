import { createTheme } from "@mui/material/styles";
import { deepPurple, grey } from "@mui/material/colors";

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
    fontFamily: "Aspekta Variable, sans-serif",
    allVariants: {
      color: grey[800],
      margin: "0px",
      fontWeight: 500,
    },

    h1: {
      lineHeight: 1.3,
      color: grey[900],
      "@media (min-width:0px)": { fontSize: "1.375rem" }, // tablet
      "@media (min-width:900px)": { fontSize: "1.5rem" }, // desktop
    },
    h2: {
      lineHeight: 1.3,
      color: grey[900],
      "@media (min-width:0px)": { fontSize: "1.125rem" },
      "@media (min-width:900px)": { fontSize: "1.375rem" },
    },
    h3: {
      lineHeight: 1.3,
      color: grey[900],
      "@media (min-width:0px)": { fontSize: "1.0625rem" },
      "@media (min-width:900px)": { fontSize: "1.25rem" },
    },
    h4: {
      lineHeight: 1.3,
      color: grey[900],
      "@media (min-width:0px)": { fontSize: "1rem" },
      "@media (min-width:900px)": { fontSize: "1.125rem" },
    },
    h5: {
      lineHeight: 1.3,
      color: grey[900],
      "@media (min-width:0px)": { fontSize: "0.875rem" },
      "@media (min-width:900px)": { fontSize: "1rem" },
    },
    h6: {
      lineHeight: 1.3,
      color: grey[900],
      "@media (min-width:0px)": { fontSize: "0.875rem" },
      "@media (min-width:900px)": { fontSize: "0.875rem" },
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
      main: deepPurple[700],
    },
    secondary: {
      main: deepPurple[700],
    },
    background: {
      default: grey[200],
    },
  },
});

export default theme;
