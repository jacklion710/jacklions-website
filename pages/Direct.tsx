import {
  Box,
  Flex,
  Heading,
  Text,
  Link,
  HStack,
  VStack,
  IconButton,
  Button,
  ChakraProvider,
  useColorModeValue
} from "@chakra-ui/react";
import {
  FaInstagram,
  FaEnvelope
} from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from '../components/Footer';
import { Helmet } from 'react-helmet';

export default function SocialPage() {
  const bg = useColorModeValue("white", "gray.800");
  const color = useColorModeValue("black", "white");

  return (
    <ChakraProvider>
      <Helmet>
        <title>Connect with Jack.Lion | Official Page</title>
        <meta name="description" content="Reach out to Jack Lion on various platforms or send an email. For bookings, please use the provided link." />
        <meta name="keywords" content="Jack Lion, Connect, Music, Bookings, Instagram, Email, Contact" />
        <meta property="og:url" content="https://jacklion.xyz/Direct" /> 
        <link rel="canonical" href="https://jacklion.xyz/Direct" />
      </Helmet>
        <Flex direction="column" minHeight="100vh">
          <Navbar />
          <Flex
            direction="column"
            align="center"
            justify="flex-start"
            py={8}
            px={4}
            flexGrow={1}
          >
          <Box 
            w="100%" 
            maxW="600px" 
            textAlign="center" 
            position="relative"
          >
            <Heading 
              size="xl" 
              mb={4} 
              position="relative"
              _after={{
                content: '""',
                display: 'block',
                position: 'absolute',
                bottom: '-10px',  // Adjust this value to move the border closer/farther from the text
                left: '50%',
                transform: 'translateX(-50%)',
                width: '290px',  // Adjust this width as per your requirements
                borderBottom: `1px solid `,
              }}
            >
              Connect with Me
            </Heading>
            <Text mb={6}>
              Want to ask a question or book me for a gig? Reach out to me directly on any{' '}
              <Link href="/Direct" color="teal.500">platform</Link> or send me an <Link href="mailto:jack.lion710@gmail.com" color="teal.500">email</Link>
            </Text>
              <HStack spacing={4} justify="center" wrap="wrap" mb={4}>
                <Link href="https://www.instagram.com/jack.lion/?hl=en" isExternal>
                  <IconButton aria-label="Instagram" icon={<FaInstagram />} size="lg" colorScheme="pink" />
                </Link>
                {/* ... other icons ... */}
                <Link href="mailto:jack.lion710@gmail.com">
                  <IconButton aria-label="Email" icon={<FaEnvelope />} size="lg" colorScheme="teal" />
                </Link>
              </HStack>

              {/* Bookings Section */}
              <VStack spacing={4} align="center" mt={10}>
                <Text fontSize="lg" fontWeight="semibold">
                  For bookings, please use the link below:
                </Text>
                  <Button colorScheme="blue" size="md" mt={4}>
                      <Link href="/SessionInfo">
                          Book a Session
                      </Link>
                  </Button>

                </VStack>
              </Box>
            </Flex>
          <Footer />
      </Flex>
    </ChakraProvider>
  );
}
