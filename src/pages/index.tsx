import TabsContainer from '../components/TabsContainer';
import { styled } from '../theme';

const Home = () => {
  return (
    <Container>
      <TabsContainer />
    </Container>
  );
};

const Container = styled('div', {
  height: '100svh',
});

export default Home;
