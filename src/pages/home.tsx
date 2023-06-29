import { TabsContainer } from '@/components/';
import { styled } from '../theme';

const Home = () => (
  <Container>
    <TabsContainer />
  </Container>
);

const Container = styled('div', {
  height: '100svh',
});

export default Home;
