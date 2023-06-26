import { Tabs } from '../components';
import Posts from '../components/lists/Posts';
import { styled } from '../theme';

const Home = () => {
  return (
    <Container>
      <Tabs />
      <Posts />
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
