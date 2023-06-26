import './App.css';
import Home from './pages';
import { globalStyles } from './theme';

function App() {
  globalStyles();
  return (
    <div className="App">
      <Home />
    </div>
  );
}

export default App;
