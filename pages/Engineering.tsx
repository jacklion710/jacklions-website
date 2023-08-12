import {
  Box,
  Heading,
  Link,
  VStack,
  ChakraProvider,
  Flex,
  Text,
  Button,
  List
} from '@chakra-ui/react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function EngineeringPage() {
  return (
      <ChakraProvider>
          <Navbar />
          <Flex justify="center" my={8} ml={0} flexGrow={1} pb="100px">
              <VStack spacing={10} width="100%" maxW="600px">
                  <Heading size="xl" borderBottom="1px solid">Recording Studio Catalog</Heading>

                  <Box p={4} shadow="lg" borderWidth="1px" borderRadius="md" width="100%">
                    <Flex direction="column" justifyContent="space-between" alignItems="flex-start" h="100%">
                        <VStack align="start" spacing={4}>
                            <Heading size="lg" mb={4}>Recording</Heading>
                            <Text>Professional vocal recordings or mono, stereo, mid/side, and up to 16 channel multitrack instrumental recording sessions for any source you wish to capture.</Text>
                            <Heading size="md" mt={4}>Instruments Available:</Heading>
                            <List>
                                <Text>Electric Guitar</Text>
                                <Text>5 String Electric Bass</Text>
                                <Text>Acoustic Guitar</Text>
                            </List>
                            <Heading size="md" mt={4}>Electronic Instruments:</Heading>
                            <List>
                                <Text>Subsequent37</Text>
                                <Text>Subharmonicon</Text>
                                <Text>DFAM</Text>
                                <Text>Eurorack</Text>
                            </List>
                            <Heading size="md" mt={4}>Microphones:</Heading>
                            <List>
                                <Text>Telefunken TF39</Text>
                                <Text>Aston Origin</Text>
                                <Text>SM57</Text>
                                <Text>SM7B</Text>
                                <Text>CR-14</Text>
                                <Text>SP-1</Text>
                            </List>
                            <Text mt={4}>Minimum of 1 hr in order to book a recording session</Text>
                            <Text>$50/hr</Text>
                            <Text>$140 for 3 hours</Text>
                        </VStack>
                        <Button colorScheme="blue" size="md" mt={4}>
                            <Link href="/SessionInfo">
                                Book a Recording Session
                            </Link>
                        </Button>
                    </Flex>
                </Box>

                  <Box p={4} shadow="lg" borderWidth="1px" borderRadius="md" width="100%">
                      <Heading size="lg" mb={4}>Engineering</Heading>
                      <Text>Choose from a variety of mixdown and master options to get the perfect sound for your project.</Text>
                      <Text>Mixdown</Text>
                      <Text>Digital Mastering</Text>
                      <Text>Analog Mastering</Text>
                  </Box>
                  <Box p={4} shadow="lg" borderWidth="1px" borderRadius="md" width="100%">
                      <Heading size="lg" mb={4}>Sound Design</Heading>
                      <Text>Customized sound design for your tracks from synth parts & patches to soundscapes and cinematic fx.</Text>
                      <Text>Analog Synths</Text>
                      <Text>Drum Machines</Text>
                      <Text>VST Patches</Text>
                      <Text>FX</Text>
                      <Text>Synth Patches</Text>
                      <Text>Foley</Text>
                      <Text>Electric or Acoustic Guitar</Text>
                      <Text>Electric Bass</Text>
                      
                  </Box>
                  <Box p={4} shadow="lg" borderWidth="1px" borderRadius="md" width="100%">
                      <Heading size="lg" mb={4}>Consultations</Heading>
                      <Text>Customized sound design for your tracks from synth parts & patches to soundscapes and cinematic fx.</Text>
                      <Text>Track Feedback</Text>
                      <Text>Art Installation Planning</Text>
                      <Text>DSP Theory & Design</Text>
                  </Box>

                  <Button colorScheme="blue" size="md" mt={4}>
                      <Link href="/Direct">
                          For Engineering Services, Contact Me
                      </Link>
                  </Button>

              </VStack>
          </Flex>
        <Footer />  
      </ChakraProvider>
  );
}


// Add dropdowns within each box with sound examples
// Add a page with instructions for booking an appointment