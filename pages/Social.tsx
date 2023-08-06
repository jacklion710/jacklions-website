import { Box, Flex, Heading, Link, HStack, IconButton, ChakraProvider, useColorModeValue, useBreakpointValue } from '@chakra-ui/react';
import { 
    FaSpotify, FaApple, FaSoundcloud, FaYoutube, FaInstagram, FaPatreon, FaGithub
} from 'react-icons/fa';

import Navbar from '../components/Navbar';

export default function SocialPage() {
  const bg = useColorModeValue('white', 'gray.800');
  const color = useColorModeValue('black', 'white');
  
  return (
    <ChakraProvider>
      <Navbar />
      <Flex justify="center" my={8} alignItems="center" height="calc(100vh - 100px)" flexDirection="column">
        <Box w="100%" px={{ base: 4, md: 8 }}>
          <Heading size="xl" mb={6} textAlign="center">
              Connect with Me
          </Heading>
          <HStack spacing={{ base: 4, md: 8 }} justify="center">
            <Link href="https://open.spotify.com/artist/35foCh1HOk7XwvVzuiFmzc" isExternal>
                <IconButton aria-label="Spotify" icon={<FaSpotify />} size="lg" colorScheme="green" />
            </Link>
            <Link href="https://music.apple.com/us/artist/jack-lion/1470477992" isExternal>
                <IconButton aria-label="Apple Music" icon={<FaApple />} size="lg" colorScheme="gray" />
            </Link>
            <Link href="https://soundcloud.com/jack0lion" isExternal>
                <IconButton aria-label="SoundCloud" icon={<FaSoundcloud />} size="lg" colorScheme="red" />
            </Link>
            <Link href="https://www.youtube.com/channel/UCbTxhDz-oFPdbKl5-rpi4gQ" isExternal>
                <IconButton aria-label="YouTube" icon={<FaYoutube />} size="lg" colorScheme="red" />
            </Link>
            <Link href="https://www.instagram.com/jack.lion/?hl=en" isExternal>
                <IconButton aria-label="Instagram" icon={<FaInstagram />} size="lg" colorScheme="pink" />
            </Link>
            <Link href="https://www.patreon.com/jacklion" isExternal>
                <IconButton aria-label="Patreon" icon={<FaPatreon />} size="lg" colorScheme="purple" />
            </Link>
            <Link href="https://github.com/jacklion710" isExternal>
                <IconButton aria-label="GitHub" icon={<FaGithub />} size="lg" colorScheme="gray" />
            </Link>
            // ... Add other platforms similarly ...
          </HStack>
        </Box>
      </Flex>
    </ChakraProvider>
  );
}
