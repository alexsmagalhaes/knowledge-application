import GlobalStylesLayout from "./layouts/global-styles-layout";
import Outlet from "./routes/routes-outlet";

function App() {
  return (
    <GlobalStylesLayout>
      <Outlet />
    </GlobalStylesLayout>
  );
}

export default App;
