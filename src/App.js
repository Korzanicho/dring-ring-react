import "./App.scss";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useEffect } from "react";

import { AppProvider } from "./Context/AppProvider";
import { AppLayout, ErrorBoundary } from "@/components";
import { routes, ROUTES } from "./routes/routes";
import soundUtils from "./utils/soundUtils";

function App() {
  useEffect(() => {
    soundUtils.initAudioContext();
  }, []);
  return (
    <ErrorBoundary>
      <Router>
        <AppProvider>
          <AppLayout>
            <Routes>
              {routes.map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  element={route.element}
                />
              ))}
              {/* Redirect any unknown routes to home */}
              <Route
                path="*"
                element={<Navigate to={ROUTES.SETTING_PLAYERS} replace />}
              />
            </Routes>
          </AppLayout>
        </AppProvider>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
