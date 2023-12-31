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
import Footer from '../components/Footer';
import { Helmet } from 'react-helmet';

// Define the booking instructions
const bookingInstructions = [
    "Click on the 'Book Now' button below.",
    "Select an available date and time from the calendar.",
    "Fill in your personal information and any additional notes as well as what kind of session you are booking (recording session or lesson).",
    "Confirm the appointment and you'll receive a confirmation email shortly."
];

export default function BookingInstructionsPage() {
    return (
        <ChakraProvider>
            <Helmet>
                <title>Jack.Lion - Booking Instructions</title>
                <meta 
                  name="description" 
                  content="Follow the easy steps to book your appointment with Jack.Lion for lessons, recording sessions, and more." 
                />
                <meta name="keywords" content="Jack.Lion, booking, lessons, recording, music, appointment" />
                <meta property="og:title" content="Jack.Lion - Booking Instructions" />
                <meta property="og:description" content="Instructions on how to book your appointment with Jack.Lion." />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://jacklion.xyz/SessionInfo" />
                <link rel="canonical" href="https://jacklion.xyz/SessionInfo" /> 
            </Helmet>
            <Navbar />
            {/* Main content */}
            <Flex justify="center" my={8} ml={0} flexGrow={1} pb="460px">
                <VStack spacing={10} width="100%" maxW="800px">
                    <Heading size="xl" borderBottom="1px solid">Booking Instructions</Heading>
  
                    <Box p={4} shadow="lg" borderWidth="1px" borderRadius="md" width="100%">
                        <Text mb={4}>Follow these easy steps to book your appointment:</Text>
                        
                        {/* Booking steps */}
                        <List spacing={2}>
                            {bookingInstructions.map((instruction, index) => (
                                <ListItem key={index}>
                                    <Text fontSize="md">{`${index + 1}. ${instruction}`}</Text>
                                </ListItem>
                            ))}
                        </List>
  
                        {/* Book Now button */}
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

            <Footer />
        </ChakraProvider>
    );
}
