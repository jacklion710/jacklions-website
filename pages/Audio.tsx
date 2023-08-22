import { 
  Box, 
  Heading, 
  Link, 
  VStack, 
  HStack, 
  IconButton, 
  ChakraProvider, 
  SimpleGrid, 
  Flex, 
  useDisclosure, 
  useColorMode 
} from '@chakra-ui/react';
import { 
  FaSpotify, 
  FaApple, 
  FaSoundcloud, 
  FaBandcamp, 
  FaCompactDisc 
} from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function HomePage() {
  const { isOpen, onToggle } = useDisclosure() 
  const { colorMode } = useColorMode();
  const soundCloudLinks = [
    "https%3A//api.soundcloud.com/tracks/1485160441",
    "https%3A//api.soundcloud.com/tracks/946294501",
    "https%3A//api.soundcloud.com/tracks/1084610464",
    "https%3A//api.soundcloud.com/tracks/1288232401",
    "https%3A//api.soundcloud.com/tracks/1496975455",
    "https%3A//api.soundcloud.com/tracks/1340902525",
    "https%3A//api.soundcloud.com/tracks/1023379591",
    "https%3A//api.soundcloud.com/tracks/758811643",
    "https%3A//api.soundcloud.com/tracks/1259473852"
  ];
  const soundCloudParams = "&color=%23ff0000&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true";


  return (
    <ChakraProvider>
      <Navbar/>
      <Flex justify="center" my={8} ml={0} flexGrow={1} pb="100px">
        <Flex direction="row" width="100%">
          {/* Left Sidebar for Discography */}
            <Box 
                position="sticky"
                top="10px" // Adjust this value to position the icon from the top
                maxHeight="calc(100vh - 20px)" // Adjust this value based on the top positioning
                overflowY="auto"
                display="flex"
                flexDirection="column"
                alignItems="center"
                bg={isOpen ? "gray.455" : "transparent"} 
                w={{ base: isOpen ? "250px" : "70px", md: isOpen ? "300px" : "50px" }}
                p={2}
                transition="width 0.2s"
            >
              <Box w="100%" display="flex" justifyContent="center" alignItems="center" padding={2}>
              <IconButton
                onClick={onToggle}
                mb={2}
                size="med"
                isRound
                icon={isOpen ? <FaCompactDisc /> : <FaCompactDisc />}
                aria-label="Toggle Discography"
                mx={2}  // This applies horizontal margin
                p={2}
              />
              </Box>
              {isOpen && 
                <Box w="40%">
                  <VStack align="start" spacing={5}>
                  <Heading size="md" borderBottom="1px solid">Discography</Heading>
                  <Link href="https://soundcloud.com/jack0lion/velocity" isExternal>Velocity</Link>

                  <Link href="https://soundcloud.com/jack0lion/axiom" isExternal>Axiom</Link>

                  <Link href="https://soundcloud.com/jack0lion/realize" isExternal>Realize</Link>

                  <Link href="https://soundcloud.com/jack0lion/fingerprints" isExternal>Fingerprints</Link>

                  <Link href="https://soundcloud.com/jack0lion/vengance" isExternal>Vengance</Link>

                  <Link href="https://soundcloud.com/meanmugmusic/undehfined-jacklion-interlace" isExternal>Interlace</Link>

                  <Link href="https://soundcloud.com/jack0lion/subversion" isExternal>Subversion</Link>

                  <Link href="https://soundcloud.com/jack0lion/rage-against-the-machine-killing-in-the-name-jacklion-remix" isExternal>Killing In The Name</Link>

                  <Link href="https://soundcloud.com/jack0lion/breakthrough" isExternal>Breakthrough</Link>

                  <Link href="https://soundcloud.com/jack0lion/opaque" isExternal>Opaque</Link>

                  <Link href="https://soundcloud.com/jack0lion/fightwqwyattbeats" isExternal>Fight</Link>

                  <Link href="https://soundcloud.com/jack0lion/noir-woptik-sound" isExternal>Noir</Link>

                  <Link href="https://soundcloud.com/jack0lion/nightcrawler" isExternal>Nightcrawler</Link>

                  <Link href="https://soundcloud.com/jack0lion/pockets-a_salad-collab" isExternal>Pockets</Link>

                  <Link href="https://soundcloud.com/jack0lion/seasons" isExternal>Seasons</Link>

                  <Link href="https://soundcloud.com/jack0lion/fresh-off-the-press" isExternal>Fresh Off The Press</Link>

                  <Link href="https://soundcloud.com/jack0lion/saturnalia" isExternal>Saturnalia</Link>
                               
                  {/* Add more links as needed */}
                  </VStack>
                </Box>
              }
            </Box>

            <Box p={2} flexGrow={1} width={isOpen ? "calc(100% - 300px)" : "100%"} transition="width 0.2s">
              <VStack spacing={8} align="center">
                <Heading size="xl" borderBottom="1px solid">My Music</Heading>
            
            <Flex justifyContent="center" width="100%" mb={4}>
                <HStack spacing={4}>
                    <Link href="https://open.spotify.com/artist/35foCh1HOk7XwvVzuiFmzc" isExternal>
                        <IconButton aria-label="Spotify" icon={<FaSpotify />} size="lg" colorScheme="green" />
                    </Link>
                    <Link href="https://music.apple.com/us/artist/jack-lion/1470477992" isExternal>
                      <IconButton 
                          aria-label="Apple Music" 
                          icon={<FaApple />} 
                          size="lg" 
                          bg={colorMode === "light" ? "gray.200" : "gray.700"}  // Change the background color based on mode
                          color={colorMode === "light" ? "black" : "white"}     // Change the icon color based on mode
                      />

                    </Link>
                    <Link href="https://soundcloud.com/jack0lion" isExternal>
                        <IconButton aria-label="SoundCloud" icon={<FaSoundcloud />} size="lg" colorScheme="red" />
                    </Link>
                    <Link href="https://jack0lion.bandcamp.com/" isExternal>
                        <IconButton aria-label="Bandcamp" icon={<FaBandcamp />} size="lg" colorScheme="blue" />
                    </Link>

                </HStack>
              </Flex>
              <SimpleGrid columns={{ base: 1, md: isOpen ? 2 : 3 }} spacing={16}>
                  {soundCloudLinks.map((link, index) => (
                    <Box
                      width={{ base: "100%", md: "300px" }}
                      mx={
                        soundCloudLinks.length % 2 === 1 && index === soundCloudLinks.length - 1 && isOpen
                          ? "auto"
                          : 0
                      }
                      key={index}
                    >
                      <iframe
                        width="100%"
                        height="135%"
                        scrolling="no"
                        frameBorder="no"
                        allow="autoplay"
                        src={`https://w.soundcloud.com/player/?url=${encodeURIComponent(link)}${soundCloudParams}`}
                      ></iframe>
                    </Box>
                  ))}
                </SimpleGrid>
                </VStack>
              </Box>
            {/* Right empty panel */}
            <Box display={{ base: "none", md: "block" }} w={{ base: "0%", md: "1%" }} />
          </Flex>
        </Flex>
      <Footer />
    </ChakraProvider>
  );
}
