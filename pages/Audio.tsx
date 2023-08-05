import { Box, Heading, Link, VStack, HStack, IconButton, ChakraProvider, SimpleGrid, Flex } from '@chakra-ui/react';
import { FaSpotify, FaApple, FaSoundcloud } from 'react-icons/fa';
import Navbar from '../components/Navbar';

export default function HomePage() {
  return (
    <ChakraProvider>
      <Navbar />
      <VStack spacing={8} align="Center">
        <Heading size="xl">My Music</Heading>
        {/* Links to other platforms */}
      <Flex justifyContent="center" width="100%" mb={4}>
          <HStack spacing={4}>
              <Link href="https://open.spotify.com/artist/35foCh1HOk7XwvVzuiFmzc" isExternal>
                  <IconButton aria-label="Spotify" icon={<FaSpotify />} size="lg" colorScheme="green" />
              </Link>
              <Link href="https://music.apple.com/us/artist/jack-lion/1470477992" isExternal>
                  <IconButton aria-label="Apple Music" icon={<FaApple />} size="lg" colorScheme="gray" />
              </Link>
              <Link href="https://soundcloud.com/jack0lion" isExternal>
                  <IconButton aria-label="SoundCloud" icon={<FaSoundcloud />} size="lg" colorScheme="red" />
              </Link>
          </HStack>
        </Flex>
      {/* Embed SoundCloud Player */}
      <SimpleGrid columns={3} spacing={40}>
        <Box>
            <iframe
              width="300"
              height="300"
              scrolling="no"
              frameBorder="no"
              allow="autoplay"
              src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1485160441&color=%23ff0000&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"
            ></iframe>
        </Box>
        <Box>
            <iframe
              width="300"
              height="300"
              scrolling="no"
              frameBorder="no"
              allow="autoplay"
              src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/946294501&color=%23ff0000&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"
            ></iframe>
        </Box>
        <Box>
            <iframe
              width="300"
              height="300"
              scrolling="no"
              frameBorder="no"
              allow="autoplay"
              src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1084610464&color=%23ff0000&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"
            ></iframe>
        </Box>
        <Box>
            <iframe
              width="300"
              height="300"
              scrolling="no"
              frameBorder="no"
              allow="autoplay"
              src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1288232401&color=%23ff0000&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"
            ></iframe>
        </Box>
        <Box>
            <iframe
              width="300"
              height="300"
              scrolling="no"
              frameBorder="no"
              allow="autoplay"
              src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1496975455&color=%23ff0000&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"
            ></iframe>
        </Box>
        <Box>
            <iframe
              width="300"
              height="300"
              scrolling="no"
              frameBorder="no"
              allow="autoplay"
              src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1340902525&color=%23ff0000&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"
            ></iframe>
        </Box>
        <Box>
            <iframe
              width="300"
              height="300"
              scrolling="no"
              frameBorder="no"
              allow="autoplay"
              src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1023379591&color=%23ff0000&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"
            ></iframe>
        </Box>
        <Box>
            <iframe
              width="300"
              height="300"
              scrolling="no"
              frameBorder="no"
              allow="autoplay"
              src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1040338969%3Fsecret_token%3Ds-BqLLgTHpFLL&color=%23ff0000&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"
            ></iframe>
        </Box>
        <Box>
            <iframe
              width="300"
              height="300"
              scrolling="no"
              frameBorder="no"
              allow="autoplay"
              src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1259473852&color=%23ff0000&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"
            ></iframe>
        </Box>
        {/* ... Add more as needed */}
    </SimpleGrid>

      
      </VStack>
    </ChakraProvider>
  );
}
