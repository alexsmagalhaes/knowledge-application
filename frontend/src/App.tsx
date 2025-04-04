import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import GlobalStylesLayout from "./layouts/global-styles-layout";
import Outlet from "./routes/routes-outlet";

const queryClient = new QueryClient();

function App() {
  return (
    <GlobalStylesLayout>
      <QueryClientProvider client={queryClient}>
        <Outlet />
      </QueryClientProvider>
    </GlobalStylesLayout>
  );
}

export default App;
