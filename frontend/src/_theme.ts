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
      "@media (min-width:600px)": { fontSize: "22px" }, // tablet
      "@media (min-width:900px)": { fontSize: "24px" }, // desktop
    },
    h2: {
      lineHeight: 1.3,
      color: grey[900],
      "@media (min-width:600px)": { fontSize: "18px" },
      "@media (min-width:900px)": { fontSize: "22px" },
    },
    h3: {
      lineHeight: 1.3,
      color: grey[900],
      "@media (min-width:600px)": { fontSize: "17px" },
      "@media (min-width:900px)": { fontSize: "20px" },
    },
    h4: {
      lineHeight: 1.3,
      color: grey[900],
      "@media (min-width:600px)": { fontSize: "16px" },
      "@media (min-width:900px)": { fontSize: "18px" },
    },
    h5: {
      lineHeight: 1.3,
      color: grey[900],
      "@media (min-width:600px)": { fontSize: "14px" },
      "@media (min-width:900px)": { fontSize: "16px" },
    },
    h6: {
      lineHeight: 1.3,
      color: grey[900],
      "@media (min-width:600px)": { fontSize: "14px" },
      "@media (min-width:900px)": { fontSize: "14px" },
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
