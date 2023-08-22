import {
  Box, 
  Flex, 
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


// Define the social media links and their respective icons and properties
const socialLinks = [
  {
    href: "https://open.spotify.com/artist/35foCh1HOk7XwvVzuiFmzc",
    label: "Spotify",
    icon: <FaSpotify />,
    colorScheme: "green"
  },
  {
    href: "https://music.apple.com/us/artist/jack-lion/1470477992",
    label: "Apple Music",
    icon: <FaApple />,
    colorScheme: "gray"
  },
  {
    href: "https://soundcloud.com/jack0lion",
    label: "Soundcloud",
    icon: <FaSoundcloud />,
    colorScheme: "red"
  },
  {
    href: "https://www.youtube.com/channel/UCbTxhDz-oFPdbKl5-rpi4gQ",
    label: "Youtube",
    icon: <FaYoutube />,
    colorScheme: "red"
  },
  {
    href: "https://www.instagram.com/jack.lion/?hl=en",
    label: "Instagram",
    icon: <FaInstagram />,
    colorScheme: "pink"
  },
  {
    href: "https://www.patreon.com/jacklion",
    label: "Patreon",
    icon: <FaPatreon />,
    colorScheme: "purple"
  },
  {
    href: "https://github.com/jacklion710",
    label: "Github",
    icon: <FaGithub />,
    colorScheme: "gray"
  }
];

export default function SocialPage() {
  return (
    <ChakraProvider>
      <Flex direction="column" minHeight="100vh">
        <Navbar />

        {/* Main content section */}
        <Flex 
          direction="column"
          justify="flex-start"
          flex="1"
          mt={8}
        >
          <Box 
            as="span"
            display="inline-block"
            position="relative"
            mb={6}
            textAlign="center"
          >
            {/* Placeholder for any content you might want to add here */}
          </Box>
          
          {/* Social media icons */}
          <HStack spacing={{ base: 4, md: 8 }} justify="center" wrap="wrap">
            {socialLinks.map(({ href, label, icon, colorScheme }) => (
              <Link href={href} isExternal key={href}>
                <IconButton
                  aria-label={label}
                  icon={icon}
                  fontSize="64px" 
                  colorScheme={colorScheme}
                  padding="20px"
                  paddingX="24px" 
                  paddingY="40px"
                />
              </Link>
            ))}
          </HStack>
        </Flex>
        
        <Footer />
      </Flex>
    </ChakraProvider>
  );
}
