import ComponentsLayout from "./layouts/components.layout";
import ProvidersLayout from "./layouts/providers.layout";
import Outlet from "./routes/_main.routes";

function App() {
  return (
    <ProvidersLayout>
      <ComponentsLayout>
        <Outlet />
      </ComponentsLayout>
    </ProvidersLayout>
  );
}

export default App;
