import { useLocation } from 'react-router-dom';

// Album page component
const Album: React.FC<{}> = () => {
  const { state } = useLocation();

  return <h1>Album page </h1>;
};

export default Album;
