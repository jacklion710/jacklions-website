import { Box, Heading, Link, VStack, IconButton } from '@chakra-ui/react';
// Import icons from your preferred icon library. Here's an example with Chakra's icons:
import { FaSpotify, FaApple, FaSoundcloud } from 'react-icons/fa';

export default function HomePage() {
  return (
    <VStack spacing={8} align="center">
      <Heading size="xl">My Music</Heading>

      {/* Embed SoundCloud Player */}
      <Box>
        <iframe
          width="100%"
          height="300"
          scrolling="no"
          frameBorder="no"
          allow="autoplay"
          src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1485160441&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"
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
  );
}

