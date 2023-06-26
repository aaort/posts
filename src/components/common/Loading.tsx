import { TailSpin } from 'react-loader-spinner';
import { theme } from '../../theme';

const Loading: React.FC<{}> = () => {
  return <TailSpin wrapperStyle={styles} color={theme.colors.card.value} />;
};

const styles = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  translate: '-50% -50%',
};

export default Loading;
