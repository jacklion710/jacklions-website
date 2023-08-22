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
import { Helmet } from 'react-helmet';

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
      <Helmet>
        <title>Jack.Lion - Sample Packs</title>
        <meta 
          name="description" 
          content="Discover Jack.Lion's unique sample packs. From organic percussive sounds to eurorack experimentation, explore a range of high-quality samples." 
        />
        <meta name="keywords" content="Jack.Lion, sample packs, organic percs, eurorack, electronic sounds, foley, FX" />
        <meta property="og:title" content="Jack.Lion - Sample Packs" />
        <meta property="og:description" content="Explore a collection of Jack.Lion's unique sample packs." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://jacklion.xyz/Samples" />
        <link rel="canonical" href="https://jacklion.xyz/Samples" />
      </Helmet>
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