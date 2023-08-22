import {
  Box,
  Heading,
  VStack,
  ChakraProvider,
  Flex,
  Text
} from '@chakra-ui/react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Define the sample packs data
const samplePacks = [
  {
    title: "Organic Percs",
    description: "Acoustic percussive sounds of anything I could get my hands on in a local music school",
    iframeSrc: "https://bandcamp.com/EmbeddedPlayer/album=2258007380/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=true/transparent=true/"
  },
  {
    title: "Anulo",
    description: "Analog eurorack experimentation",
    iframeSrc: "https://bandcamp.com/EmbeddedPlayer/album=3513673397/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=true/transparent=true/"
  },
  {
    title: "What Goes Bump",
    description: "Miscellaneous electronic sounds. One-shots, fx percs and ear candy",
    iframeSrc: "https://bandcamp.com/EmbeddedPlayer/album=3513673397/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=true/transparent=true/"
  },
  {
    title: "Free Foley Pack",
    description: "Recorded foley and FX",
    iframeSrc: "https://bandcamp.com/EmbeddedPlayer/album=3513673397/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=true/transparent=true/"
  }
];

export default function SamplePacksPage() {
  return (
    <ChakraProvider>
      <Navbar />

      {/* Main content */}
      <Flex justify="center" my={8} ml={0} flexGrow={1} pb="100px">
        <VStack spacing={10} width="100%" maxW="1000px">
          <Heading size="xl" borderBottom="1px solid">Sample Packs</Heading>

          {/* Sample Packs */}
          {samplePacks.map(pack => (
            <Box key={pack.title} p={4} shadow="lg" borderWidth="1px" borderRadius="md" width="70%">
              <Flex justify="space-between" align="center">
                <Box>
                  <Heading size="lg" mb={4}>{pack.title}</Heading>
                  <Text>{pack.description}</Text>
                </Box>
              </Flex>
              <Box mt={4}>
                <iframe 
                  style={{border: "0", width: "100%", height: "800px"}} 
                  src={pack.iframeSrc} 
                  seamless>
                </iframe>
              </Box>
            </Box>
          ))}

        </VStack>
      </Flex>

      <Footer />
    </ChakraProvider>
  );
}