import { useEffect } from 'react';
import { Butterfly } from './components/Butterfly.jsx';
import { ErrorBoundary } from './components/ErrorBoundary.jsx';
import { GardenDefs } from './components/ZoneScene.jsx';
import { AppProvider, useApp } from './state/AppContext.jsx';
import { ActivityScreen } from './screens/ActivityScreen.jsx';
import { AdultScreen } from './screens/AdultScreen.jsx';
import { ExplorerScreen } from './screens/ExplorerScreen.jsx';
import { FinScreen } from './screens/FinScreen.jsx';
import { GardenScreen } from './screens/GardenScreen.jsx';
import { HomeScreen } from './screens/HomeScreen.jsx';
import { WelcomeScreen } from './screens/WelcomeScreen.jsx';

function Router() {
  const { child, route, reduceMotion, path } = useApp();

  // Fond des bandes derrière les barres système (Android) : celui du parcours.
  useEffect(() => {
    document.documentElement.style.setProperty('--bar-bg', path.bg);
  }, [path.bg]);

  let screen;
  if (!child) screen = <WelcomeScreen />;
  else if (route.name === 'explorer') screen = <ExplorerScreen />;
  else if (route.name === 'activity') {
    screen = (
      <ActivityScreen
        key={`${route.activityKey}-${route.mission?.index ?? 'x'}`}
        activityKey={route.activityKey}
        mission={route.mission}
        from={route.from}
      />
    );
  } else if (route.name === 'fin') screen = <FinScreen grown={route.grown} mode={route.mode} next={route.next} />;
  else if (route.name === 'garden') screen = <GardenScreen from={route.from} />;
  else if (route.name === 'adult') screen = <AdultScreen />;
  else screen = <HomeScreen />;

  return (
    <div className={`app ${reduceMotion ? 'reduce-motion' : ''}`}>
      <GardenDefs />
      {screen}
      <Butterfly />
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <AppProvider>
        <Router />
      </AppProvider>
    </ErrorBoundary>
  );
}
