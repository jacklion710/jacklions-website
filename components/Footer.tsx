'use client'
import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  useColorModeValue,
  VisuallyHidden,
  Image
} from '@chakra-ui/react'
import { FaSpotify, FaApple, FaSoundcloud, FaYoutube, FaInstagram, FaPatreon, FaGithub } from 'react-icons/fa';
import { ReactNode } from 'react'

const Logo = (props: any) => {
    const colorMode = useColorModeValue('light', 'dark');
    const logoSrc = colorMode === 'light' ? '/assets/jack.lion_dark.png' : '/assets/jack.lion_light.png';
    return <Image src={logoSrc} alt="Jack's Logo" w={8} h={8} {...props} />;
};

const SocialButton = ({
  children,
  label,
  href,
}: {
  children: ReactNode
  label: string
  href: string
}) => {
  return (
    <chakra.button
      bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
      rounded={'full'}
      w={8}
      h={8}
      cursor={'pointer'}
      as={'a'}
      href={href}
      display={'inline-flex'}
      alignItems={'center'}
      justifyContent={'center'}
      transition={'background 0.3s ease'}
      _hover={{
        bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
      }}>
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  )
}

export default function SmallWithLogoLeft() {
    return (
        <Box 
          bg={useColorModeValue('gray.50', 'gray.900')}
          color={useColorModeValue('gray.700', 'gray.200')}
          width="100%"  
        >
          <Container
            as={Stack}
            maxW={'6xl'}
            py={2}  // reduce padding for slimmer appearance
            direction={{ base: 'column', md: 'row' }}
            spacing={2}  // reduce spacing for slimmer appearance
            justify={{ base: 'center', md: 'space-between' }}
            align={{ base: 'center', md: 'center' }}>
            <Logo />
            <Text fontSize="sm">© 2023 Jack.Lion. All rights reserved</Text> 
            <Stack direction={'row'} spacing={4}>  
          <SocialButton label={'Spotify'} href={'#'}>
            <FaSpotify />
          </SocialButton>
          <SocialButton label={'Apple'} href={'#'}>
            <FaApple />
          </SocialButton>
          <SocialButton label={'Soundcloud'} href={'#'}>
            <FaSoundcloud />
          </SocialButton>
          <SocialButton label={'Youtube'} href={'#'}>
            <FaYoutube />
          </SocialButton>
          <SocialButton label={'Patreon'} href={'#'}>
            <FaPatreon />
          </SocialButton>
          <SocialButton label={'Instagram'} href={'#'}>
            <FaInstagram />
            </SocialButton>
          <SocialButton label={'Github'} href={'#'}>
            <FaGithub />
          </SocialButton>
        </Stack>
      </Container>
    </Box>
  )
}