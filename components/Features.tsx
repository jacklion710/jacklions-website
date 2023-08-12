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
  
  interface FeatureProps {
    text: string;
    iconBg: string;
    icon?: ReactElement;
  }
  
  const Feature = ({ text, icon, iconBg }: FeatureProps) => {
    return (
      <Stack direction={'row'} align={'center'}>
        <Flex
          w={8}
          h={8}
          align={'center'}
          justify={'center'}
          rounded={'full'}
          bg={iconBg}>
          {icon}
        </Flex>
        <Text fontWeight={600}>{text}</Text>
      </Stack>
    );
  };
  
  export default function Features() {
    return (
      <Container maxW={'5xl'} py={12}>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
          <Stack spacing={4}>
            <Text
              textTransform={'uppercase'}
              color={'blue.400'}
              fontWeight={600}
              fontSize={'sm'}
              bg={useColorModeValue('blue.50', 'blue.900')}
              p={2}
              alignSelf={'flex-start'}
              rounded={'md'}>
              Multi-media engineering
            </Text>
            <Heading>Jack.Lion</Heading>
            <Text color={'gray.500'} fontSize={'lg'}>
              Electronic artist, developer and recording engineer
            </Text>
            <Stack
              spacing={4}
              divider={
                <StackDivider
                  borderColor={useColorModeValue('gray.100', 'gray.700')}
                />
              }>
              <Feature
                icon={
                  <Icon as={BsMusicNoteBeamed} color={'yellow.500'} w={5} h={5} />
                }
                iconBg={useColorModeValue('yellow.100', 'yellow.900')}
                text={'Music'}
              />
              <Feature
                icon={<Icon as={PiPaintBrushBold} color={'green.500'} w={5} h={5} />}
                iconBg={useColorModeValue('green.100', 'green.900')}
                text={'Visuals'}
              />
              <Feature
                icon={
                  <Icon as={FaWrench} color={'purple.500'} w={5} h={5} />
                }
                iconBg={useColorModeValue('purple.100', 'purple.900')}
                text={'Engineering'}
              />
              <Feature
              icon={
                <Icon as={FaMicrophone} color={'red.500'} w={5} h={5} /> 
              }
              iconBg={useColorModeValue('red.100', 'red.900')}
              text={'Recording'}
            />
             <Feature
              icon={
                <Icon as={FaChalkboardTeacher} color={'blue.500'} w={5} h={5} />
              }
              iconBg={useColorModeValue('blue.100', 'blue.900')}
              text={'Lessons'}
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