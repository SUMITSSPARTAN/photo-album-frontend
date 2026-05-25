import './App.css'
import { useEffect, useState } from 'react'
import DesktopPage from './pages/DesktopPage'
import LoginPage from './pages/LoginPage'
import { getInitialRoute, getRouteFromPath, routes, type AppRoute } from './routes/routes'
import { authService } from './services/authService'

function App() {
  const [route, setRoute] = useState<AppRoute>(() => getInitialRoute(authService.isAuthenticated()));

  const navigate = (nextRoute: AppRoute) => {
    window.history.pushState(null, "", nextRoute);
    setRoute(nextRoute);
  };

  useEffect(() => {
    const syncRoute = () => {
      setRoute(getRouteFromPath(window.location.pathname, authService.isAuthenticated()));
    };

    window.addEventListener("popstate", syncRoute);
    return () => window.removeEventListener("popstate", syncRoute);
  }, []);

  if (route === routes.login) {
    return <LoginPage onLogin={() => navigate(routes.desktop)} />;
  }

  return <DesktopPage onLogout={() => navigate(routes.login)} />;
}

export default App
