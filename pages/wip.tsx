import {
    Box,
    Heading,
    Text,
    Button,
    Center,
    VStack,
    Image,
    useColorModeValue,
    useColorMode,
    ChakraProvider
  } from '@chakra-ui/react';
  import Navbar from '../components/Navbar';
  import Footer from '../components/Footer'

  export default function UnderConstructionPage() {
    const { colorMode } = useColorMode();
    const bgColor = useColorModeValue("gray.50", "gray.900");
    const textColor = useColorModeValue("gray.800", "gray.50");
  
    const logo = colorMode === 'light' 
      ? "/assets/jack.lion_light.png"
      : "/assets/jack.lion_dark.png";
  
    return (
        <ChakraProvider>
            <Box minHeight="95vh" backgroundColor={bgColor} color={textColor}>
                <Navbar />
                <Center height="50vh">
                <VStack spacing={3}>
                    <Image src={logo} boxSize="150px" objectFit="cover" alt="Logo" />
                    <Heading size="xl">Under Construction</Heading>
                    <Text fontSize="lg" textAlign="center">Working hard to bring this section to you soon. Stay tuned!</Text>
                    <Button colorScheme="blue" size="md" onClick={() => window.location.href="/"}>Back to Home</Button>
                </VStack>
                </Center>
            </Box>
            <Footer/>
        </ChakraProvider>
    );
}
