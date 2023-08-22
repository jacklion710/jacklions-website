import { 
  Box, 
  Heading, 
  Link, 
  VStack, 
  ChakraProvider, 
  Flex, 
  Text, 
  Button 
} from '@chakra-ui/react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Helmet } from 'react-helmet';

export default function BookingPage() {
  return (
    <ChakraProvider resetCSS>
      <Helmet>
          <title>Jack.Lion - Book Music Lessons</title>
          <meta 
            name="description" 
            content="Discover personalized music lessons with Jack.Lion. Tailored sessions in production, theory, guitar, bass, and more. Book online or onsite lessons today!" 
          />
          <meta property="og:url" content="https://jacklion.xyz/Lessons" /> 
          <link rel="canonical" href="https://jacklion.xyz/Lessons" /> 
      </Helmet>
      <Navbar />
      <Flex direction="column" align="center" justify="center" minH="100vh" p={4} pb="100px">
        <Flex direction={["column", "row"]} width="100%" maxWidth="1200px">
          <Box p={2} flexGrow={1}>
            <VStack spacing={8} align="center">
              <Heading size="xl" borderBottom="1px solid" borderColor="gray.300" pb={2}>Lessons</Heading>

              <Text textAlign="center" fontSize="md" maxW={["90%", "500px"]} borderBottom="1px solid" borderColor="gray.300" pb={2}>
                I offer personalized lessons in music production, theory, guitar, bass, max msp and GLSL. Each session is tailored to meet your unique learning goals. Lessons are available both online and in-person. 
              </Text>

              <Flex direction="row" align="center" width="100%" justify="center">
                <Box mr={[2, 4]} textAlign="center" fontSize="md" mb={[2, 0]}>
                  <Text><strong>Online</strong></Text>
                  <Text><strong>$30/hr</strong></Text>
                </Box>

                <Box height="4em" width="1px" bg="gray.300" mx={16}></Box>

                <Box textAlign="center" fontSize="md" ml={[4, 0]}>
                  <Text><strong>Onsite</strong></Text>
                  <Text><strong>$50/hr</strong></Text>
                </Box>
              </Flex>

              <Box width={["90%", "500px"]} borderTop="1px solid" borderColor="gray.300" mt={2} mb={4}></Box>

              <Text textAlign="center" fontSize="md" maxW={["90%", "500px"]}>
                For specific lesson plans and other details, feel free to <Link href="/Direct" color="blue.500">contact me</Link>.
              </Text>

              {/* Booking Link */}
              <Button colorScheme="blue" size="md">
                <Link href="/SessionInfo" isExternal>
                  Click Here to Book a Lesson
                </Link>
              </Button>
            </VStack>

            {/* YouTube Tutorials Section */}
            <VStack spacing={8} align="center" mt={12}>
              <Heading size="xl">YouTube Tutorials</Heading>

              <Box width={["100%", "560px"]} height="315px" borderRadius="md" overflow="hidden" boxShadow="xl">
                <iframe 
                  width="100%" 
                  height="100%" 
                  src="https://www.youtube.com/embed/Wy3SYumK5Vg" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                ></iframe>
              </Box>

              <Box width={["100%", "560px"]} height="315px" borderRadius="md" overflow="hidden" boxShadow="xl">
                <iframe 
                  width="100%" 
                  height="100%" 
                  src="https://www.youtube.com/embed/u8ZTitGhVF8" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                ></iframe>
              </Box>

            </VStack>
          </Box>
        </Flex>
      </Flex>
      <Footer /> 
    </ChakraProvider>
  );
}

