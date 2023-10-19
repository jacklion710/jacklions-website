import {
    Container,
    SimpleGrid,
    Image,
    Flex,
    Heading,
    Text,
    Stack,
    StackDivider,
    Icon,
    useColorModeValue,
    VStack
  } from '@chakra-ui/react';
  import { Divider, useBreakpointValue } from '@chakra-ui/react';
  import { BsMusicNoteBeamed  } from 'react-icons/bs';  
  import {  PiPaintBrushBold  } from 'react-icons/pi';
  import {  FaWrench, FaMicrophone, FaChalkboardTeacher } from 'react-icons/fa';
  import { ReactElement } from 'react';
  import Link from 'next/link';
  import { GiSoundWaves } from 'react-icons/gi'; 
import { AiFillEye } from 'react-icons/ai'; 


  
  interface FeatureProps {
    text: string;
    iconBg: string;
    icon?: ReactElement;
    href: string; 
  }
  
  const Feature = ({ text, icon, iconBg, href }: FeatureProps) => {
    return (
      <Link href={href} passHref>
        <Stack 
          direction={'column'} 
          align={'center'} 
          justify={'center'} 
          cursor="pointer"
          spacing={2} 
        >

          <Flex
            w={8}
            h={8}
            align={'center'}
            justify={'center'}
            rounded={'full'}
            bg={iconBg}>
            {icon}
          </Flex>
          <Text textAlign='center' fontWeight={600}>{text}</Text>
        </Stack>
      </Link>
    );
  };
  
  export default function Features() {
    const iframeWidth = useBreakpointValue({
      base: '120%',   // On mobile devices
      md: '85%',     // On medium devices (tablets, etc.)
      lg: '300%',     // On large devices (desktops, etc.), it will take up 90% again
      
    });
    const iframeMarginLeft = useBreakpointValue({
      base: '-10%',    // For mobile
      md: '0%',       // For tablets
      lg: '-100%',   // For desktop and larger screens
    });
    const iframeHeight = useBreakpointValue({
      base: '250px',   // On mobile devices
      md: '250px',     // On medium devices (tablets, etc.)
      lg: '250px',     // On large devices (desktops, etc.)
    });
    const iframeContainerWidth = useBreakpointValue({
      base: '100%',  
      md: '85%',     
      lg: '85%',     
    });
    return (
      <Container maxW={'5xl'} py={6}>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 10, md: 60 }}>
          <Stack spacing={4} alignItems="center"> 
            <Link href="/Engineering">
              <Text
                textAlign="center"
                textTransform={'uppercase'}
                color={'blue.400'}
                fontWeight={600}
                fontSize={'sm'}
                bg={useColorModeValue('blue.50', 'blue.900')}
                p={2}
                alignSelf={'center'}
                rounded={'md'}
                cursor="pointer" // to indicate it's clickable
              >
                Multi-media engineering
              </Text>
            </Link>
            <Heading
              textAlign="center" 
              fontSize="5xl"
              fontWeight="bold"
              letterSpacing="wider"
              lineHeight="taller"
              textShadow="1px 1px 2px rgba(0, 0, 0, 0.2)"
            >
              Jack.Lion
            </Heading>
            <Text 
              textAlign="center" 
              color={'gray.500'} 
              fontSize={'lg'}>
              Electronic artist, creative coder and audio engineer
            </Text>
            <Stack
              spacing={4}
              divider={
                <StackDivider
                  borderColor={useColorModeValue('gray.100', 'gray.700')}
                />
              }
            >
              <Feature
                href="/Audio"
                icon={
                  <Icon as={BsMusicNoteBeamed} color={'yellow.500'} w={5} h={5} />
                }
                iconBg={useColorModeValue('yellow.100', 'yellow.900')}
                text={'Music'}
              />

              <Feature
                href="/Visual"
                icon={<Icon as={PiPaintBrushBold} color={'green.500'} w={5} h={5} />}
                iconBg={useColorModeValue('green.100', 'green.900')}
                text={'Visuals & Art'}
              />

              <Feature
                href="/Samples"
                icon={
                    <Icon as={GiSoundWaves} color={'orange.500'} w={5} h={5} />
                }
                iconBg={useColorModeValue('orange.100', 'orange.900')}
                text={'Sounds & Samples'}
              />

              <Feature
                href="/Lessons"
                icon={
                  <Icon as={FaChalkboardTeacher} color={'blue.500'} w={5} h={5} />
                }
                iconBg={useColorModeValue('blue.100', 'blue.900')}
                text={'Personalized Lessons'}
              />

              <Feature
                href="/av/RNBO/simple-sampler-dna"
                icon={
                    <Icon as={AiFillEye} color={'teal.500'} w={5} h={5} />
                }
                iconBg={useColorModeValue('teal.100', 'teal.900')}
                text={'Immersive AV Experience'}
              />
              
              <Feature
                href="/Devices"
                icon={
                  <Icon as={FaWrench} color={'purple.500'} w={5} h={5} />
                }
                iconBg={useColorModeValue('purple.100', 'purple.900')}
                text={'Programming & Development'}
              />

              <Feature
                href="/Engineering"
                icon={
                  <Icon as={FaMicrophone} color={'red.500'} w={5} h={5} /> 
                }
                iconBg={useColorModeValue('red.100', 'red.900')}
                text={'Mixdowns Mastering & Recording'}
              />

            </Stack>
          </Stack>
          <Flex>
            <Image
              rounded={'md'}
              alt={'feature image'}
              src={
                'https://cdn.discordapp.com/attachments/1060274121528840223/1136076372851306558/jacklion_a_artists_rendition_of_a_cover_image_for_an_acoustic__6b02d4e7-2a71-4a63-9d70-afe113609ff3.png'
              }
              objectFit={'cover'}
            />
          </Flex>
        </SimpleGrid>
        <Divider my={6} />
      <VStack spacing={5} align="center" mt={10} w="100%">
          <Flex width="100%" justifyContent="center">
              <Heading mb={5}>Latest Release</Heading>
          </Flex>

          <div dangerouslySetInnerHTML={{ 
              __html: `
              <iframe width="${iframeWidth}" style="margin-left:${iframeMarginLeft};" height="${iframeHeight}"
              scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1485160441&color=%23ff0000&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>
              <div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/jack0lion" title="Jack.Lion" target="_blank" style="color: #cccccc; text-decoration: none;">Jack.Lion</a> · <a href="https://soundcloud.com/jack0lion/velocity" title="Velocity" target="_blank" style="color: #cccccc; text-decoration: none;">Velocity</a></div>
              ` 
          }} />
      </VStack>        
    </Container>
  );
}