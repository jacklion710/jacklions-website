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
  } from '@chakra-ui/react';
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
          direction={['column', 'row']} // Vertically aligned on mobile, horizontally on larger screens.
          align={'center'} 
          justify={['center', 'start']} // Centered on mobile, starts at the beginning (left) on larger screens.
          cursor="pointer"
          spacing={2} // Adjust spacing as needed
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
          <Text textAlign={['center', 'inherit']} fontWeight={600}>{text}</Text> // Centered text on mobile, default alignment on larger screens.
        </Stack>
      </Link>
    );
  };
  
  export default function Features() {
    return (
      <Container maxW={'5xl'} py={12}>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
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
              Electronic artist, developer and audio engineer
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
                text={'Visuals'}
              />

              
              
              <Feature
                href="/Lessons"
                icon={
                  <Icon as={FaChalkboardTeacher} color={'blue.500'} w={5} h={5} />
                }
                iconBg={useColorModeValue('blue.100', 'blue.900')}
                text={'Lessons'}
              />

              <Feature
                href="/Samples"
                icon={
                    <Icon as={GiSoundWaves} color={'orange.500'} w={5} h={5} />
                }
                iconBg={useColorModeValue('orange.100', 'orange.900')}
                text={'Samples'}
              />

              <Feature
                href="/wip"
                icon={
                    <Icon as={AiFillEye} color={'teal.500'} w={5} h={5} />
                }
                iconBg={useColorModeValue('teal.100', 'teal.900')}
                text={'Immersive'}
              />
              
              <Feature
                href="/Devices"
                icon={
                  <Icon as={FaWrench} color={'purple.500'} w={5} h={5} />
                }
                iconBg={useColorModeValue('purple.100', 'purple.900')}
                text={'Development'}
              />

              <Feature
                href="/Engineering"
                icon={
                  <Icon as={FaMicrophone} color={'red.500'} w={5} h={5} /> 
                }
                iconBg={useColorModeValue('red.100', 'red.900')}
                text={'Recording & Engineering'}
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
      </Container>
    );
  }