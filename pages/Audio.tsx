import { Box, Heading, Link, VStack, IconButton, ChakraProvider } from '@chakra-ui/react';
import { FaSpotify, FaApple, FaSoundcloud } from 'react-icons/fa';
import Navbar from '../components/Navbar';

export default function HomePage() {
  return (
    <ChakraProvider>
      <Navbar />
      <VStack spacing={8} align="left">
        <Heading size="xl">My Music</Heading>

      {/* Embed SoundCloud Player */}
      <Box>
        <iframe
          width="300"
          height="300"
          scrolling="no"
          frameBorder="no"
          allow="autoplay"
          src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1485160441&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=trueZ"
        ></iframe>
      </Box>

      {/* Links to other platforms */}
      <VStack spacing={4}>
        <Link href="https://open.spotify.com/artist/35foCh1HOk7XwvVzuiFmzc" isExternal>
          <IconButton aria-label="Spotify" icon={<FaSpotify />} size="lg" colorScheme="green" />
        </Link>
        <Link href="https://music.apple.com/us/artist/jack-lion/1470477992" isExternal>
          <IconButton aria-label="Apple Music" icon={<FaApple />} size="lg" colorScheme="gray" />
        </Link>
        <Link href="https://soundcloud.com/jack0lion" isExternal>
          <IconButton aria-label="SoundCloud" icon={<FaSoundcloud />} size="lg" colorScheme="orange" />
        </Link>
      </VStack>
    </VStack>
    </ChakraProvider>
  );
}

