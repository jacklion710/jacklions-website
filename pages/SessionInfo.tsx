import {
    Box,
    Heading,
    VStack,
    ChakraProvider,
    Flex,
    Text,
    Button,
    List,
    ListItem,
    Link
  } from '@chakra-ui/react';
  import Navbar from '../components/Navbar';
  
  export default function BookingInstructionsPage() {
    return (
        <ChakraProvider>
            <Navbar />
            <Flex justify="center" my={8} ml={0} flexGrow={1}>
                <VStack spacing={10} width="100%" maxW="800px">
                    <Heading size="xl" borderBottom="1px solid">Booking Instructions</Heading>
  
                    <Box p={4} shadow="lg" borderWidth="1px" borderRadius="md" width="100%">
                        <Text mb={4}>Follow these easy steps to book your appointment:</Text>
                        
                        <List spacing={2}>
                            <ListItem>
                                <Text fontSize="md">1. Click on the 'Book Now' button below.</Text>
                            </ListItem>
                            <ListItem>
                                <Text fontSize="md">2. Select an available date and time from the calendar.</Text>
                            </ListItem>
                            <ListItem>
                                <Text fontSize="md">3. Fill in your personal information and any additional notes as well as what kind of session you are booking (recording session or lesson).</Text>
                            </ListItem>
                            <ListItem>
                                <Text fontSize="md">4. Confirm the appointment and you'll receive a confirmation email shortly.</Text>
                            </ListItem>
                        </List>
  
                        <Flex justify="center">
                            <Button colorScheme="blue" size="md" mt={6}>
                                <Link href="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ0w9Y-bSp4iEfmtZLVteHAJSyjUOXOf_pLSQx0JAN_XalobFO2LVchz5a_qWVwUqusj5KcKVPth" isExternal>
                                Book Now
                                </Link>
                            </Button>
                        </Flex>
                    </Box>
                </VStack>
            </Flex>
        </ChakraProvider>
    );
  }
  