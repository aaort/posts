import { SWRConfig, SWRConfiguration } from 'swr';
import Home from './pages';
import { globalStyles } from './theme';

const swrOptions: SWRConfiguration = {
  revalidateOnFocus: false,
};

function App() {
  globalStyles();
  return (
    <SWRConfig value={swrOptions}>
      <div className="App">
        <Home />
      </div>
    </SWRConfig>
  );
}

export default App;
