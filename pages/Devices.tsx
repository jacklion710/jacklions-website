import {
  Box,
  Heading,
  VStack,
  ChakraProvider,
  Flex,
  Text,
  useColorModeValue
} from '@chakra-ui/react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Helmet } from 'react-helmet'; 

export default function DevicesPage() {

  // Define a sample pack array to map through
  const devices = [
    {
      name: "M4L MAP Button",
      description: "A simple, optimized UI snippet for adding a MAP button to your max for live creations. Maps any process in a max device to any parameter in Ableton.",
      gumroadLink: "https://jacklion.gumroad.com/l/basicm4lmapper"
    },
    {
      name: "Tune Delay",
      description: "A fun tool for mapping MIDI notes to delay periods that coincide with the input notes. Creative delay for tuned delay times.",
      gumroadLink: "https://jacklion.gumroad.com/l/tunedelay"
    },
    {
      name: "Transfer Curve Macro",
      description: "A special macro designed to allow users to assign a custom multi-point transfer curve to a macro. Macro output can follow a unique non-linear path",
      gumroadLink: "https://jacklion.gumroad.com/l/jlcurvefuncmacro"
    },
    {
      name: "Hackro Rack",
      description: "A modified transfer curve macro device that accomodates up to 16 parameter mappings in Ableton with non-linear transfer curves",
      gumroadLink: "https://jacklion.gumroad.com/l/jlhackrorack"
    },
    {
      name: "Remote FM",
      description: "An experimental device used to route signals remotely across any channels in Ableton for frequency modulation.",
      gumroadLink: "https://app.gumroad.com/products/nZuKi"
    },
    {
      name: "Self FM",
      description: "A weird sounding device used to route signals into themselves in Ableton for frequency modulation feedback.",
      gumroadLink: "https://app.gumroad.com/products/nRDNZ"
    },
    {
      name: "Jitter Synchronized Keyframe Editor",
      description: "A tool used for synching animations in jitter to a timeline of a track. Can also be used to sequence msp and control signals",
      gumroadLink: "https://app.gumroad.com/products/spwig"
    },
    {
      name: "Repitch BPM Calculator",
      description: "A useful calculator for sample based productions that require precise control over a resulting pitch change from varitempo style repotching of clip tempo",
      gumroadLink: "  https://app.gumroad.com/products/PHHsI      "
    },
    {
      name: "Sonogram",
      description: "A simple and free visualizer for frequency content over time",
      gumroadLink: "https://app.gumroad.com/products/AoHOm      "
    },
    {
      name: "Lissajous Phase Correlation Scope",
      description: "A scope used for visualizing lissajous XY phase correlation patterns from stereo signals",
      gumroadLink: "https://app.gumroad.com/products/wyBWZ"
    },
    {
      name: "Oscilloscope",
      description: "A basic and free oscilloscope for visualizing time-domain audio",
      gumroadLink: "https://app.gumroad.com/products/sDFcL"
    },
    {
      name: "Stereo Pitch Shifter",
      description: "A creative stereo pitch shifting device which gives users independent control of pitch per stereo channel",
      gumroadLink: "https://app.gumroad.com/products/vPZjV"
    }
  ];
  const iframeBg = useColorModeValue("white", "gray.900"); // Chakra Color mode support

  return (
    <ChakraProvider>
      <Helmet>
        <title>Creative Devices | Jack Lions Studio</title>
        <meta name="description" content="Discover creative devices by Jack Lion. From M4L MAP Button to Stereo Pitch Shifter, explore a range of tools for your music production needs." />
        <meta name="keywords" content="Jack Lion, Creative Devices, M4L, Music Production, Ableton, Max for Live, Music Devices" />
        <meta property="og:url" content="https://jacklion.xyz/Devices" /> 
        <link rel="canonical" href="https://jacklion.xyz/Devices" />
      </Helmet>
        <Navbar />
        <Box mb={50}>
            <Flex justify="center" my={4} ml={0} flexGrow={1} pb="100px">
              <VStack spacing={16} width={["100%", "80%", "70%", "50%"]} maxW="1000px">



                    {/* Wrap the header with a container and adjust its margin */}
                    <Flex direction="column" mb={2}>
                        <Heading size="xl" borderBottom="1px solid">Creative Devices</Heading>
                    </Flex>


                    {devices.map(dev => (
                        <Box key={dev.name} p={4} shadow="lg" borderWidth="1px" borderRadius="md" width="100%">
                            <Flex justify="space-between" align="center">
                              <Box>
                                  <Heading size="lg" mb={4}>{dev.name}</Heading>
                                  <Text mb={4}>{dev.description}</Text>
                              </Box>

                            </Flex>
                            <iframe 
                                src={dev.gumroadLink} 
                                width="100%" 
                                height="500" 
                                frameBorder="0" 
                                scrolling="no" 
                                style={{ background: iframeBg, marginTop: "16px" }} 
                                title={`Purchase ${dev.name}`}>
                            </iframe>
                    
                        </Box>
                    ))}
                </VStack>
            </Flex>
        </Box>
      <Footer />  
    </ChakraProvider>
  );
}