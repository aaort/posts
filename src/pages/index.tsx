import { Tabs } from '../components';
import { styled } from '../theme';

const Home = () => {
  return (
    <Container>
      <Tabs />
    </Container>
  );
};

const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  height: '100svh',
});

export default Home;
