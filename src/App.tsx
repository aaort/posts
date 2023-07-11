import { SWRConfig, SWRConfiguration } from 'swr';
import Routes from './routes';
import { globalStyles } from './theme';

const swrOptions: SWRConfiguration = {
  revalidateOnFocus: false,
};

function App() {
  // Apply global styles
  globalStyles();
  return (
    <SWRConfig value={swrOptions}>
      <Routes />
    </SWRConfig>
  );
}

export default App;
