import { SWRConfig, SWRConfiguration } from 'swr';
import { Home } from './pages';
import { globalStyles } from './theme';
import Routes from './routes';

const swrOptions: SWRConfiguration = {
  revalidateOnFocus: false,
};

function App() {
  globalStyles();
  return (
    <SWRConfig value={swrOptions}>
      <Routes />
    </SWRConfig>
  );
}

export default App;
