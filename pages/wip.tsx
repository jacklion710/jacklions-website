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
    Flex
  } from '@chakra-ui/react';
  import Navbar from '../components/Navbar';  // assuming the path is correct
  
  export default function UnderConstructionPage() {
    const { colorMode } = useColorMode();
    const bgColor = useColorModeValue("gray.50", "gray.900");
    const textColor = useColorModeValue("gray.800", "gray.50");
    
    // Determine the correct logo based on the theme
    const logo = colorMode === 'light' 
      ? "/assets/jack.lion_light.png"
      : "/assets/jack.lion_dark.png";
  
    return (
      <Box minHeight="100vh" backgroundColor={bgColor} color={textColor}>
        <Center height="100vh">
          <VStack spacing={6}>
            {/* You can add an image here if you like */}
            <Image src="/path-to-your-image.jpg" boxSize="300px" objectFit="cover" alt="Under Construction Image" />
  
            <Heading size="xl">Under Construction</Heading>
            <Text fontSize="lg">Working hard to bring this section to you soon. Stay tuned!</Text>
  
            {/* Optional: A button to redirect users to the home page or another section */}
            <Button colorScheme="blue" size="md" onClick={() => window.location.href="/"}>Back to Home</Button>
          </VStack>
        </Center>
      </Box>
    );
  }
  