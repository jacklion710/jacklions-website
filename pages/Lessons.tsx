import { 
  Box, 
  Heading, 
  Link, 
  VStack, 
  ChakraProvider, 
  Flex, 
  Text, 
  Button 
} from '@chakra-ui/react';
import Navbar from '../components/Navbar';

export default function BookingPage() {
  return (
    <ChakraProvider>
      <Navbar />
      <Flex justify="center" my={8} ml={0} flexGrow={1}>
        <Flex direction={["column", "row"]} width="100%">
          <Box p={2} flexGrow={1}>
            <VStack spacing={8} align="center">
              <Heading size="xl" borderBottom="1px solid" borderColor="gray.300" pb={2}>Lessons</Heading>

              <Text textAlign="center" fontSize="md" maxW="500px" borderBottom="1px solid" borderColor="gray.300" pb={2}>
                I offer personalized lessons in music production, theory, guitar, bass, max msp and GLSL. Each session is tailored to meet your unique learning goals. Lessons are available both online and in-person. 
              </Text>

              <Flex direction={["column", "row"]} align="center">
                <Box mr={[0, 4]} textAlign="center" fontSize="md">
                  <Text>Online</Text>
                  <Text>30/hr</Text>
                </Box>

                {/* Vertical Divider */}
                <Box height="4em" width="1px" bg="gray.300" display={["none", "block"]} mx={4}></Box>

                <Box textAlign="center" fontSize="md">
                  <Text>Onsite</Text>
                  <Text>50/hr</Text>
                </Box>
              </Flex>

              {/* Horizontal Overline */}
              <Box width="500px" borderTop="1px solid" borderColor="gray.300" mt={2} mb={4}></Box>

              <Text textAlign="center" fontSize="md" maxW="500px">
                For specific lesson plans and other details, feel free to <Link href="/Direct" color="blue.500">contact me</Link>.
              </Text>

              {/* Booking Link */}
              <Button colorScheme="blue" size="md">
                <Link href="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ0w9Y-bSp4iEfmtZLVteHAJSyjUOXOf_pLSQx0JAN_XalobFO2LVchz5a_qWVwUqusj5KcKVPth" isExternal>
                  Click Here to Book a Lesson
                </Link>
              </Button>
            </VStack>
            {/* YouTube Tutorials Section */}
            <VStack spacing={8} align="center" mt={12}>
              <Heading size="xl">YouTube Tutorials</Heading>

              {/* Embed the first video */}
              <Box width="560px" height="315px" borderRadius="md" overflow="hidden" boxShadow="xl">
                <iframe 
                  width="100%" 
                  height="100%" 
                  src="https://www.youtube.com/embed/Wy3SYumK5Vg" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                ></iframe>
              </Box>

              {/* Embed the second video */}
              <Box width="560px" height="315px" borderRadius="md" overflow="hidden" boxShadow="xl">
                <iframe 
                  width="100%" 
                  height="100%" 
                  src="https://www.youtube.com/embed/u8ZTitGhVF8" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                ></iframe>
              </Box>

              {/* You can continue embedding more videos in a similar fashion */}
            </VStack>
          </Box>
        </Flex>
      </Flex>
    </ChakraProvider>
  );
}


// Add a page with instructions for booking a lesson