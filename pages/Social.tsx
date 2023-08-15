import {
  Box, 
  Flex, 
  Heading, 
  Link, 
  HStack, 
  IconButton, 
  ChakraProvider
} from '@chakra-ui/react';
import {
  FaSpotify, 
  FaApple, 
  FaSoundcloud, 
  FaYoutube, 
  FaInstagram, 
  FaPatreon, 
  FaGithub
} from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';



export default function SocialPage() {

  return (
    <ChakraProvider>
      <Flex direction="column" minHeight="100vh">
        <Navbar />

        <Flex 
          direction="column"
          justify="flex-start"  // Explicitly align content to start
          flex="1"              // Ensure this flex container grows
          mt={8}                // Top margin
        >
          <Box 
            as="span"
            display="inline-block"
            position="relative"
            mb={6}
            textAlign="center"
          >
            <Heading size="xl">
              Platforms
            </Heading>
            <Box 
              position="absolute"
              bottom="-5px"
              left="50%"
              transform="translateX(-50%)"
              w="150px"   // Adjust this value to desired underline width
              borderBottom="1px solid"
            />
          </Box>
          
          <HStack spacing={{ base: 4, md: 8 }} justify="center" wrap="wrap">
            <Link href="https://open.spotify.com/artist/35foCh1HOk7XwvVzuiFmzc" isExternal>
              <IconButton
                aria-label="Spotify"
                icon={<FaSpotify />}
                fontSize="64px" 
                colorScheme="green"
                padding="20px"
                paddingX="24px" 
                paddingY="40px"
              />
            </Link>

            <Link href="https://music.apple.com/us/artist/jack-lion/1470477992" isExternal>
              <IconButton
                aria-label="Apple Music"
                icon={<FaApple />}
                fontSize="64px" 
                colorScheme="gray"
                padding="20px"
                paddingX="24px" 
                paddingY="40px"
              />
            </Link>

              <Link href="https://soundcloud.com/jack0lion" isExternal>
                  <IconButton aria-label="SoundCloud" 
                  icon={<FaSoundcloud />} 
                  size="lg" 
                  colorScheme="red" 
                  fontSize="64px" 
                  padding="20px"
                  paddingX="24px" 
                  paddingY="40px"/>
              </Link>

              <Link href="https://www.youtube.com/channel/UCbTxhDz-oFPdbKl5-rpi4gQ" isExternal>
                  <IconButton aria-label="YouTube" 
                  icon={<FaYoutube />} 
                  size="lg" 
                  colorScheme="red" 
                  fontSize="64px" 
                  padding="20px" 
                  paddingX="24px" 
                  paddingY="40px"/>
              </Link>

              <Link href="https://www.instagram.com/jack.lion/?hl=en" isExternal>
                  <IconButton aria-label="Instagram"
                    icon={<FaInstagram />} 
                    size="lg" 
                    colorScheme="pink" 
                    fontSize="64px" 
                    padding="20px" 
                    paddingX="24px" 
                    paddingY="40px"/>
              </Link>

              <Link href="https://www.patreon.com/jacklion" isExternal>
                  <IconButton aria-label="Patreon" 
                  icon={<FaPatreon />} 
                  size="lg" 
                  colorScheme="purple" 
                  fontSize="64px" 
                  padding="20px" 
                  paddingX="24px" 
                  paddingY="40px"/>
              </Link>

              <Link href="https://github.com/jacklion710" isExternal>
                  <IconButton aria-label="GitHub" 
                  icon={<FaGithub />} 
                  size="lg" 
                  colorScheme="gray" 
                  fontSize="64px" 
                  padding="20px" 
                  paddingX="24px" 
                  paddingY="40px"/>
              </Link>

            </HStack>
          </Flex>
      <Footer />
      </Flex>
  </ChakraProvider>
);
}
