import {
  Box,
  Heading,
  VStack,
  ChakraProvider,
  Flex,
  Text,
  Image,
  Button,
  Link
} from '@chakra-ui/react';
import Navbar from '../components/Navbar';

export default function SamplePacksPage() {
  return (
    <ChakraProvider>
      <Navbar />
      <Flex justify="center" my={8} ml={0} flexGrow={1}>
        <VStack spacing={10} width="100%" maxW="1000px">
          <Heading size="xl" borderBottom="1px solid">Sample Packs</Heading>

          {/* Sample Pack Item */}
          <Box p={4} shadow="lg" borderWidth="1px" borderRadius="md" width="100%">
            <Flex justify="space-between" align="center">
              <Box>
                <Heading size="lg" mb={4}>Breakbeats</Heading>
                <Text>Sample Pack Description</Text>
              </Box>
              <Box>
                <Image src="/path/to/samplepack/image.jpg" alt="Sample Pack Image" boxSize="100px" />
              </Box>
            </Flex>
            <Button colorScheme="blue" size="md" mt={4}>
              <Link href="/path/to/purchase">
                Purchase
              </Link>
            </Button>
          </Box>

          {/* You can replicate the above Box for other sample packs or map through an array of sample packs to display them. */}

        </VStack>
      </Flex>
    </ChakraProvider>
  );
}
