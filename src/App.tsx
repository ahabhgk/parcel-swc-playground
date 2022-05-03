import {Box, useColorModeValue} from '@chakra-ui/react';
import Header from './components/Header';
import Workspace from './components/Workspace';

export default function App() {
  const bg = useColorModeValue('gray.50', 'gray.800');

  return (
    <Box minHeight="100vh" pb={[8, 8, 0]} bg={bg}>
      <Header />
      <Workspace />
    </Box>
  );
}
