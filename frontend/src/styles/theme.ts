import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface TypographyVariants {
    titleLight: React.CSSProperties;
    titleDark: React.CSSProperties;
    bodyLight: React.CSSProperties;
    bodyDark: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    titleLight?: React.CSSProperties;
    titleDark?: React.CSSProperties;
    bodyLight?: React.CSSProperties;
    bodyDark?: React.CSSProperties;
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    titleLight: true;
    titleDark: true;
    bodyLight: true;
    bodyDark: true;
  }
}

const theme = createTheme({
  typography: {
    fontFamily: "Aspekta, sans-serif",
    allVariants: {
      color: "rgba(49, 49, 64, 0.90)",
    },
    titleLight: {
      color: "#313140",
    },
    titleDark: {
      color: "#424242",
    },
    bodyLight: {
      color: "rgba(49, 49, 64, 0.90)",
    },
    bodyDark: {
      color: "rgba(255, 255, 255, 0.90)",
    },

    // HEADINGS (h1-h6) com breakpoints responsivos
    h1: {
      fontSize: "4rem",
      lineHeight: 1.2,
      "@media (max-width:1536px)": { fontSize: "3.5rem" },
      "@media (max-width:1200px)": { fontSize: "3rem" },
      "@media (max-width:900px)": { fontSize: "2.5rem" },
      "@media (max-width:600px)": { fontSize: "2rem" },
    },
    h2: {
      fontSize: "3rem",
      "@media (max-width:1200px)": { fontSize: "2.5rem" },
      "@media (max-width:900px)": { fontSize: "2rem" },
      "@media (max-width:600px)": { fontSize: "1.75rem" },
    },
    h3: {
      fontSize: "2rem",
      "@media (max-width:900px)": { fontSize: "1.75rem" },
      "@media (max-width:600px)": { fontSize: "1.5rem" },
    },
    h4: {
      fontSize: "1.75rem",
      "@media (max-width:600px)": { fontSize: "1.5rem" },
    },
    h5: {
      fontSize: "1.5rem",
    },
    h6: {
      fontSize: "1.25rem",
    },

    // BODY TEXT
    body1: {
      fontSize: "1rem",
      lineHeight: 1.5,
      "@media (max-width:600px)": { fontSize: "0.9375rem" },
    },
    body2: {
      fontSize: "0.875rem",
      lineHeight: 1.5,
      "@media (max-width:600px)": { fontSize: "0.825rem" },
    },
  },

  palette: {
    primary: {
      main: "#6632C9",
    },
    secondary: {
      main: "#6632C9",
    },
  },
});

export default theme;
