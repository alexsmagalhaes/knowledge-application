import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import GlobalStylesLayout from "./layouts/global-styles-layout";
import Outlet from "./routes/_main.routes";
import ModalLayout from "./layouts/modal-layout";
import { SessionProvider } from "./provider/session-provider";
import SnackLayout from "./layouts/snack-layout";

const queryClient = new QueryClient();

function App() {
  return (
    <GlobalStylesLayout>
      <QueryClientProvider client={queryClient}>
        <SessionProvider>
          <Outlet />
          <ModalLayout />
          <SnackLayout />
        </SessionProvider>
      </QueryClientProvider>
    </GlobalStylesLayout>
  );
}

export default App;
