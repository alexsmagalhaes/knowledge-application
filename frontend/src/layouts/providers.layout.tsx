import { GlobalStyles, ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { ReactNode, useEffect } from "react";
import theme from "@/_theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import useAuth from "@/hooks/use-auth";

interface IProvider {
  children: ReactNode;
}

function MuiProvider({ children }: IProvider) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles styles={undefined} />
      {children}
    </ThemeProvider>
  );
}

function QueryProvider({ children }: IProvider) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

function SessionProvider({ children }: IProvider) {
  const { revalidateSession, isLoadingSession } = useAuth();

  useEffect(() => {
    revalidateSession();
  }, []);

  if (isLoadingSession) return;

  return <>{children}</>;
}

function ProvidersLayout({ children }: IProvider) {
  return (
    <MuiProvider>
      <QueryProvider>
        <SessionProvider>{children}</SessionProvider>
      </QueryProvider>
    </MuiProvider>
  );
}

export default ProvidersLayout;
