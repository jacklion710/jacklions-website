import {
    Box,
    Flex,
    Heading,
    VStack,
    ChakraProvider,
    Link,
    Button
  } from '@chakra-ui/react';
  import React from 'react';
  import Navbar from '../components/Navbar';
  import Footer from '../components/Footer';
  import Waveform from '../components/Waveform';
  import Head from 'next/head';
  
  export default function PortfolioPage() {
    return (
      <ChakraProvider>
        <Head>
          <title>My Engineering Portfolio | Jack.Lion</title>
          <meta 
            name="description" 
            content="Jack.Lions professional portfolio | Audio engineering, mixing and mastering services performed in house for clients by Jack.Lion. Listen to samples of my work for clients as well as Jack.Lion himself."
            />
            <meta property="og:url" content="https://jacklion.xyz/Portfolio" /> 
            <link rel="canonical" href="https://jacklion.xyz/Portfolio" /> 
        </Head>
  
        <Navbar />
  
        <Flex direction="column" minHeight="100vh"> {/* This ensures your content takes up at least all the viewport height */}

        {/* Main content container, which grows to take up available space, pushing the footer down */}
        <Flex direction="column" flex="1" justify="center" align="center" my={8} ml={0} pb="100px">
          <VStack spacing={10} width="100%" maxW="600px">
            
            {/* Portfolio heading */}
            <Heading size="xl" borderBottom="1px solid">My Engineering Portfolio</Heading>

            <Box p={4} shadow="lg" borderWidth="1px" borderRadius="md" width="100%">
                <Heading size="lg" mb={4}>BeatsforDayz (Label)</Heading>
                
                    <Box p={4} shadow="lg" borderWidth="1px" borderRadius="md" width="100%" bg="rgba(0, 0, 0, .2)" mb={2} mt={2}>
                    <Heading size="lg" mb={4}>Knoote - I Got</Heading>
                    {/* Description or other content related to Project 1 */}
                    <Waveform url='/audio/Long_Road[Analog_Master].wav' /> {/* Replace with the actual audio file */}
                    </Box>
        
                    <Box p={4} shadow="lg" borderWidth="1px" borderRadius="md" width="100%" bg="rgba(0, 0, 0, .2)" mb={2} mt={2}>
                    <Heading size="lg" mb={4}>TITLE - Roll it Up</Heading>
                    {/* Description or other content related to Project 2 */}
                    <Waveform url='/audio/Long_Road[Digital_Master].wav' /> {/* Replace with the actual audio file */}
                    </Box>
                <Flex justifyContent="center" mt={4}>
                    <Link href="/Audio">
                    <Button colorScheme="blue">Hear more by From this Label</Button>
                    </Link>
                </Flex>
                </Box>
            
                {/* Box for personal work */}
                <Box p={4} shadow="lg" borderWidth="1px" borderRadius="md" width="100%">
                <Heading size="lg" mb={4}>Jack.Lion (personal)</Heading>
                
                    <Box p={4} shadow="lg" borderWidth="1px" borderRadius="md" width="100%" bg="rgba(0, 0, 0, .2)" mb={2} mt={2}>
                    <Heading size="lg" mb={4}>Long Road [Analog Master]</Heading>
                    {/* Description or other content related to Project 1 */}
                    <Waveform url='/audio/Long_Road[Analog_Master].wav' /> {/* Replace with the actual audio file */}
                    </Box>
        
                    <Box p={4} shadow="lg" borderWidth="1px" borderRadius="md" width="100%" bg="rgba(0, 0, 0, .2)" mb={2} mt={2}>
                    <Heading size="lg" mb={4}>Long_Road [Digital_Maste]</Heading>
                    {/* Description or other content related to Project 2 */}
                    <Waveform url='/audio/Long_Road[Digital_Master].wav' /> {/* Replace with the actual audio file */}
                    </Box>
                <Flex justifyContent="center" mt={4}>
                    <Link href="/Audio">
                    <Button colorScheme="blue">Hear more by Jack.Lion</Button>
                    </Link>
                </Flex>
                </Box>
          </VStack>
         </Flex>
        <Footer />
      </Flex>
    </ChakraProvider>
  );
}
//   Add a description section to each box and make the links route to the band or label or artists page