import { GlobalStyles } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { ReactNode } from "react";
import theme from "@/_theme";

interface IGlobalStylesLayout {
  children: ReactNode;
}

function GlobalStylesLayout({ children }: IGlobalStylesLayout) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles styles={undefined} />
      {children}
    </ThemeProvider>
  );
}

export default GlobalStylesLayout;
