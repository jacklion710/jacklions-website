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
import { 
    FaMicrophone, 
    FaHeadphones,
    FaMusic, 
    FaComment,
    FaWrench
} from "react-icons/fa";

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Head from 'next/head';

export default function EngineeringPage() {
  return (
      <ChakraProvider>
        <Head>
            <title>Recording Studio & Engineering Services</title>
            <meta 
            name="description" 
            content="Professional recording, engineering, and sound design services. Book a recording session, explore engineering services, or schedule a consultation."
            />
            <meta property="og:url" content="https://jacklion.xyz/Engineering" /> 
            <link rel="canonical" href="https://jacklion.xyz/Engineering" /> 
        </Head>
          <Navbar />
          <Flex justify="center" my={8} ml={0} flexGrow={1} pb="100px">
            <VStack spacing={10} width="100%" maxW="600px">
                  <Heading size="xl" borderBottom="1px solid"> Recording Studio Catalog</Heading>

                  <Box p={4} shadow="lg" borderWidth="1px" borderRadius="md" width="100%">
                    <Flex direction="column" justifyContent="space-between" alignItems="flex-start" h="100%">
                        <VStack align="start" spacing={4}>
                            <Flex align="center">
                                <Heading size="lg" mb={4}>Recording</Heading>
                                <Box ml={4} mt={-2}>
                                    <FaMicrophone size="1.5em" />
                                </Box>
                            </Flex>
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
                    <Flex align="center">
                        <Heading size="lg" mb={4}>Engineering</Heading>
                        <Box ml={4} mt={-2}>
                            <FaHeadphones size="1.5em" />
                        </Box>
                    </Flex>
                      <Text>Choose from a variety of mixdown and master options to get the perfect sound for your project.</Text>
                      <Text>Mixdown</Text>
                      <Text>Digital Mastering</Text>
                      <Text>Analog Mastering</Text>
                  </Box>
                  <Box p={4} shadow="lg" borderWidth="1px" borderRadius="md" width="100%">
                    <Flex align="center">
                        <Heading size="lg" mb={4}>Sound Design</Heading>
                        <Box ml={4} mt={-2}>
                            <FaMusic size="1.5em" />
                        </Box>
                    </Flex>
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
                    <Flex align="center">
                        <Heading size="lg" mb={4}>Consultations</Heading>
                        <Box ml={4} mt={-2}>
                            <FaComment size="1.5em" />
                        </Box>
                    </Flex>
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

                    <Box p={4} shadow="lg" borderWidth="1px" borderRadius="md" width="100%">
                        <Flex align="center">
                            <Heading size="lg" mb={4}>Mixing and Mastering</Heading>
                            <Box ml={4} mt={-2}>
                                <FaWrench size="1.5em" />
                            </Box>
                        </Flex>
                        <Heading size="md" mt={4}>Digital Mastering:</Heading>
                        <Text>$25 for single track</Text>
                        <Text>$100 for an EP (3 - 5 tracks)</Text>
                        <Text>$200 for an album (6 - 12 tracks)</Text>
                        
                        <Heading size="md" mt={4}>Analog Mastering:</Heading>
                        <Text>$40 for single track</Text>
                        <Text>$180 for an EP (3 - 5 tracks)</Text>
                        <Text>$360 for an album (6 - 12 tracks)</Text>

                        <Heading size="md" mt={4}>Important Notes:</Heading>
                        <Heading size="sm" mt={2}>For Mixdowns:</Heading>
                        <Text>- Ensure each track is exported individually without effects such as compression and EQ unless it is crucial to the sound.</Text>
                        <Text>- Avoid clipping. Ensure the peak level of each track is below 0dB.</Text>
                        <Text>- Provide any reference tracks or specific instructions.</Text>

                        <Heading size="sm" mt={2}>For Mastering:</Heading>
                        <Text>- Provide the final mixed down track in the highest resolution possible.</Text>
                        <Text>- There should be no mastering such as limiting applied to the mix.</Text>
                        <Text>- Ensure there's a at least -12 to -6dB headroom.</Text>
                        <Text>- Provide any reference tracks or specific instructions.</Text>
                    </Box>

              </VStack>
          </Flex>
        <Footer />  
      </ChakraProvider>
  );
}
