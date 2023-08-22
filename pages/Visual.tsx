import { 
  Box, 
  Heading, 
  VStack, 
  ChakraProvider, 
  SimpleGrid, 
  Flex 
} from '@chakra-ui/react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Define the list of Instagram embed URLs
const embedURLs = [
  "https://www.instagram.com/p/Cpx9BBMp1tG/embed",
  "https://www.instagram.com/p/CEXJReCgq5h/embed",
  "https://www.instagram.com/p/CFtCJm_As_E/embed",
  "https://www.instagram.com/p/ChxYt1Cp1WT/embed",
  "https://www.instagram.com/p/Co5o9b4M9lV/embed",
  "https://www.instagram.com/p/CptSIkPAF_I/embed"
];

export default function HomePage() {
  return (
    <ChakraProvider>
      <Navbar />
      <Flex justify="center" my={8} ml={0} flexGrow={1}>
        <Flex direction={["column", "row"]} width="100%" pb="100px">
          <Box p={2} flexGrow={1}>
            <VStack spacing={8} align="center">
              <Heading size="xl" borderBottom="1px solid">Visuals</Heading>
              <SimpleGrid columns={{ base: 1, md: 3 }} spacing={20}>
                {embedURLs.map(url => (
                  <Box key={url}>
                    <iframe 
                      src={url} 
                      width="100%" 
                      height="480" 
                      frameBorder="0" 
                      scrolling="no" 
                    ></iframe>
                  </Box>
                ))}
              </SimpleGrid>
            </VStack>
          </Box>
          <Box w={{ base: "0%", md: "1%" }} />
        </Flex>
      </Flex>
      <Footer/>
    </ChakraProvider>
  );
}
