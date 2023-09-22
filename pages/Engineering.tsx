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
import React, { useEffect, useRef } from 'react';
import WaveSurfer from 'wavesurfer.js';
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
    const waveformRefPre = useRef(null);
    const waveformRefAnalog = useRef(null);
    const waveformRefDigital = useRef(null);
    const wavesurferPre = useRef<WaveSurfer | null>(null);
    const wavesurferAnalog = useRef<WaveSurfer | null>(null);
    const wavesurferDigital = useRef<WaveSurfer | null>(null);
    const wavesurfer = useRef<WaveSurfer | null>(null);
  
    useEffect(() => {
        if (waveformRefPre.current) {
           wavesurferPre.current = WaveSurfer.create({
              container: waveformRefPre.current,
              waveColor: '#2C3E50',
              progressColor: '#3498DB'
           });
           wavesurferPre.current.load('/audio/Long_Road[Premaster].wav');
        }
     
        if (waveformRefAnalog.current) {
           wavesurferAnalog.current = WaveSurfer.create({
              container: waveformRefAnalog.current,
              waveColor: '#2C3E50',
              progressColor: '#3498DB'
           });
           wavesurferAnalog.current.load('/audio/Long_Road[Analog_Master].wav');
        }

        if (waveformRefDigital.current) {
            wavesurferDigital.current = WaveSurfer.create({
               container: waveformRefDigital.current,
               waveColor: '#2C3E50',
               progressColor: '#3498DB'
            });
            wavesurferDigital.current.load('/audio/Long_Road[Digital_Master].wav');
         }
     
        return () => {
           wavesurferPre.current?.destroy();
           wavesurferAnalog.current?.destroy();
           wavesurferDigital.current?.destroy();
        };
     }, []);

     const handlePlayPausePre = () => {
        wavesurferPre.current?.playPause();
     };
     
     const handlePlayPauseAnalog = () => {
        wavesurferAnalog.current?.playPause();
     };

     const handlePlayPauseDigital = () => {
        wavesurferDigital.current?.playPause();
     };

  return (
      <ChakraProvider>
        <Head>
            <title>Jack.Lions Recording Studio & Engineering Services</title>
            <meta 
            name="description" 
            content="Professional recording, engineering, and sound design services on behald of Jack.Lion. Book a recording session, explore engineering services, or schedule a consultation."
            />
            <meta property="og:url" content="https://jacklion.xyz/Engineering" /> 
            <link rel="canonical" href="https://jacklion.xyz/Engineering" /> 
        </Head>
          <Navbar />
          <Flex justify="center" my={8} ml={0} flexGrow={1} pb="100px">
            <VStack spacing={10} width="100%" maxW="600px">
                  <Heading size="xl" borderBottom="1px solid"> Recording Studio Catalog</Heading>

                  <Box p={4} shadow="lg" borderWidth="1px" borderRadius="md" width="100%">
                        <Flex align="center">
                            <Heading size="lg" mb={4}>Mixing and Mastering</Heading>
                            <Box ml={4} mt={-2}>
                                <FaWrench size="1.5em" />
                            </Box>
                        </Flex>

                        <Heading size="md" mt={4}>Mixdowns:</Heading>
                        <Text>$25/hr for any song</Text>
                        <Text>10% off the final cost for an EP (3 - 5 tracks)</Text>
                        <Text>15% off the final cost for an album (6 - 12 tracks)</Text>
                        <Text>To secure your project, a flat rate deposit of $50 per song is required upfront. This non-refundable deposit confirms your slot and will be deducted from the final invoice.</Text>
                        <Text>Most tracks (20-40 stems) take up to 4-6 hours. Songs with more stems, damaged audio or songs that require special mixing needs may take more time to complete to satisfaction</Text>
                        <Text>Time spent on any revisions will be charged per hour. Please be concise if providing feedback in order to get the results you want quickly</Text>

                        <Heading size="md" mt={4}>Digital Mastering:</Heading>
                        <Text>$25 for single track</Text>
                        <Text>$100 for an EP (3 - 5 tracks)</Text>
                        <Text>$200 for an album (6 - 12 tracks)</Text>
                        
                        <Heading size="md" mt={4}>Analog Mastering:</Heading>
                        <Text>$40 for single track</Text>
                        <Text>$180 for an EP (3 - 5 tracks)</Text>
                        <Text>$360 for an album (6 - 12 tracks)</Text>
                        
                        <Flex flexDirection="column" alignItems="center" mt={4}>
                            <Heading size="sm">Premaster</Heading>
                            <Box mt={4} mb={10} width="100%" height="100px"> 
                                <div ref={waveformRefPre} style={{ width: '100%', height: '100%' }}></div>
                            </Box>
                            <Button onClick={handlePlayPausePre}>Play/Pause</Button>
                        </Flex>

                        <Flex flexDirection="column" alignItems="center" mt={4}>
                            <Heading size="sm">Analog Master</Heading>
                            <Box mt={4} mb={10} width="100%" height="100px"> 
                                <div ref={waveformRefAnalog} style={{ width: '100%', height: '100%' }}></div>
                            </Box>
                            <Button onClick={handlePlayPauseAnalog}>Play/Pause</Button>
                        </Flex>

                        <Flex flexDirection="column" alignItems="center" mt={4}>
                            <Heading size="sm">Digital Master</Heading>
                            <Box mt={4} mb={10} width="100%" height="100px"> 
                                <div ref={waveformRefDigital} style={{ width: '100%', height: '100%' }}></div>
                            </Box>
                            <Button onClick={handlePlayPauseDigital}>Play/Pause</Button>
                        </Flex>

                        <Heading size="md" mt={4}>Important Notes:</Heading>
                        <Heading size="sm" mt={2}>For Mixdowns:</Heading>
                        <Text>- Ensure each track is exported individually without effects such as compression and EQ unless it is crucial to the sound</Text>
                        <Text>- Avoid clipping. Ensure the peak level of each track is below 0dB</Text>
                        <Text>- Provide any reference tracks or specific instructions</Text>

                        <Heading size="sm" mt={2}>For Mastering:</Heading>
                        <Text>- Provide the final mixed down track in the highest resolution possible</Text>
                        <Text>- There should be no mastering such as limiting applied to the mix</Text>
                        <Text>- Ensure that there is a at least -12 to -6dB headroom</Text>
                        <Text>- Provide any reference tracks or specific instructions</Text>
                        <Flex justifyContent="center" alignItems="center" mt={4}>
                            <Button colorScheme="blue" size="md">
                                <Link href="/Direct">
                                Contact me for engineering services 
                                </Link>
                            </Button>
                        </Flex>
                    </Box>
                    

                  <Box p={4} shadow="lg" borderWidth="1px" borderRadius="md" width="100%">
                    <Flex direction="column" justifyContent="space-between" alignItems="flex-start" h="100%">
                        <VStack align="start" spacing={4}>
                            <Flex align="center">
                                <Heading size="lg" mb={4}>Recording</Heading>
                                <Box ml={4} mt={-2}>
                                    <FaMicrophone size="1.5em" />
                                </Box>
                            </Flex>
                            <Text>Professional vocal recordings including mono, stereo, mid/side, and up to 16 channel multitrack instrumental recording sessions for any source you wish to capture</Text>
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
                            <Text mt={4}>Minimum of 1 hr is required in order to book a recording session</Text>
                            <Text>$50/hr</Text>
                            <Text>$140 for 3 hours</Text>
                        </VStack>
                        <Flex justifyContent="center" width="100%"> 
                            <Button colorScheme="blue" size="md" mt={4}>
                                <Link href="/SessionInfo">
                                    Book a recording session
                                </Link>
                            </Button>
                        </Flex>
                    </Flex>
                </Box>

                  <Box p={4} shadow="lg" borderWidth="1px" borderRadius="md" width="100%">
                    <Flex align="center">
                        <Heading size="lg" mb={4}>Sound Design</Heading>
                        <Box ml={4} mt={-2}>
                            <FaMusic size="1.5em" />
                        </Box>
                    </Flex>
                      <Text>Customized sound design for your tracks from synth parts & patches to soundscapes and cinematic fx</Text>
                      <Text>Analog Synths</Text>
                      <Text>Drum Machines</Text>
                      <Text>VST Patches</Text>
                      <Text>FX</Text>
                      <Text>Synth Patches</Text>
                      <Text>Foley</Text>
                      <Text>Electric or Acoustic Guitar</Text>
                      <Text>Electric Bass</Text>
                      <Flex justifyContent="center" width="100%"> 
                            <Button colorScheme="blue" size="md" mt={4}>
                                <Link href="/Direct">
                                    Contact me for custom sound design
                                </Link>
                            </Button>
                        </Flex>
                  </Box>
                  <Box p={4} shadow="lg" borderWidth="1px" borderRadius="md" width="100%">
                    <Flex align="center">
                        <Heading size="lg" mb={4}>Consultations</Heading>
                        <Box ml={4} mt={-2}>
                            <FaComment size="1.5em" />
                        </Box>
                    </Flex>
                      <Text>Personalized consultations to help you refine your sound. Receive track feedback, plan installations, or delve deep into DSP theory and design</Text>
                      <Flex justifyContent="center" width="100%"> 
                            <Button colorScheme="blue" size="md" mt={4}>
                                <Link href="/Direct">
                                    Contact me for consultations
                                </Link>
                            </Button>
                        </Flex>
                  </Box>
              </VStack>
          </Flex>
        <Footer />  
      </ChakraProvider>
  );
}
