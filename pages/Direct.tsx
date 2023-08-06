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

export default function SocialPage() {
  const bg = useColorModeValue("white", "gray.800");
  const color = useColorModeValue("black", "white");

  return (
    <ChakraProvider>
      <Navbar />
      <Flex
        direction="column"
        align="center"
        justify="center"
        py={8}
        px={4}
        height="calc(100vh - 100px)"
      >
        <Box w="100%" maxW="600px" textAlign="center">
          <Heading size="xl" mb={4}>
            Connect with Me
          </Heading>
          <Text mb={6}>
            Want to ask a question or collaborate? Reach out to me directly on any of the
            platforms below or shoot me an email.
          </Text>
          <HStack spacing={4} justify="center" wrap="wrap" mb={4}>
            <Link href="https://www.instagram.com/jack.lion/?hl=en" isExternal>
              <IconButton aria-label="Spotify" icon={<FaInstagram />} size="lg" colorScheme="pink" />
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
            <Link href="YOUR_BOOKING_LINK_HERE" isExternal>
              <Button colorScheme="blue" size="lg">
                Book Now
              </Button>
            </Link>
          </VStack>
        </Box>
      </Flex>
    </ChakraProvider>
  );
}
