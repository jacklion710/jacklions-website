import {
  Box,
  Heading,
  VStack,
  ChakraProvider,
  Flex,
  Text,
  Image,
  Link
} from '@chakra-ui/react';
import Navbar from '../components/Navbar';

export default function SamplePacksPage() {
  return (
    <ChakraProvider>
      <Navbar />
      <Flex justify="center" my={8} ml={0} flexGrow={1}>
        <VStack spacing={10} width="100%" maxW="1000px">
          <Heading size="xl" borderBottom="1px solid">Sample Packs</Heading>

          {/* Sample Pack Item */}
          <Box p={4} shadow="lg" borderWidth="1px" borderRadius="md" width="70%">
            <Flex justify="space-between" align="center">
              <Box>
                <Heading size="lg" mb={4}>Organic Percs</Heading>
                <Text>Acoustic percussive sounds of anything I could get my hands on in a local music school</Text>
              </Box>
            </Flex>
            <Box mt={4}>
              <iframe 
                style={{border: "0", width: "100%", height: "800px"}} 
                src="https://bandcamp.com/EmbeddedPlayer/album=2258007380/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=true/transparent=true/" 
                seamless>
              </iframe>
            </Box>
          </Box>

          <Box p={4} shadow="lg" borderWidth="1px" borderRadius="md" width="70%">
            <Flex justify="space-between" align="center">
              <Box>
                <Heading size="lg" mb={4}>Anulo</Heading>
                <Text>Analog eurorack experimentation</Text>
              </Box>
            </Flex>
            <Box mt={4}>
              <iframe 
                style={{border: "0", width: "100%", height: "800px"}} 
                src="https://bandcamp.com/EmbeddedPlayer/album=3513673397/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=true/transparent=true/" 
                seamless>
              </iframe>
            </Box>
          </Box>

          <Box p={4} shadow="lg" borderWidth="1px" borderRadius="md" width="70%">
            <Flex justify="space-between" align="center">
              <Box>
                <Heading size="lg" mb={4}>What Goes Bump</Heading>
                <Text>Miscellaneous electronic sounds. One-shots, fx percs and ear candy</Text>
              </Box>
            </Flex>
            <Box mt={4}>
              <iframe 
                style={{border: "0", width: "100%", height: "800px"}} 
                src="https://bandcamp.com/EmbeddedPlayer/album=4003857503/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=true/transparent=true/" 
                seamless>
              </iframe>
            </Box>
          </Box>

          <Box p={4} shadow="lg" borderWidth="1px" borderRadius="md" width="70%">
            <Flex justify="space-between" align="center">
              <Box>
                <Heading size="lg" mb={4}>Free Foley Pack</Heading>
                <Text>recordedoley and FX</Text>
              </Box>
            </Flex>
            <Box mt={4}>
              <iframe 
                style={{border: "0", width: "100%", height: "800px"}} 
                src="https://bandcamp.com/EmbeddedPlayer/album=797578818/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=true/transparent=true/" 
                seamless>
              </iframe>
            </Box>
          </Box>

          {/* You can replicate the above Box for other sample packs or map through an array of sample packs to display them. */}

        </VStack>
      </Flex>
    </ChakraProvider>
  );
}

