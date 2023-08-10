import { Box, ChakraProvider, Flex, Heading, Text, HStack } from '@chakra-ui/react';
import Navbar from '../components/Navbar';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useState, useEffect } from 'react';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import { auth } from '@/utils/firebase';

interface User {
  email: string | null;
  displayName: string | null;
  username: string | null;
}
const Profile = () => {
  const [user, setUser] = useState<User | null>(null);
  const backgroundColor = 'gray.900';  // Dark background for entire page
  const boxColor = 'gray.700';  // Dark background for the Box component

  useEffect(() => {
    // Set an authentication state observer and get user data
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser({
          email: currentUser.email,
          displayName: currentUser.displayName,
          username: null  // added this line
        });
      } else {
        setUser(null);
      }
    });

    // Cleanup the listener on component unmount
    return () => unsubscribe();
}, []);

  return (
    <ChakraProvider>
        <Box bgColor={backgroundColor} minH="100vh">
            <Navbar />

            <Flex direction="column" align="center" justify="center" minHeight="calc(100vh - 64px)">
                <Heading mb={4} color="white">Your Profile</Heading>

                <Box w="full" maxW="600px" p={4} bgColor={boxColor} borderWidth={1} borderRadius="lg" boxShadow="lg">
                    {user ? (
                        <HStack spacing={4}>
                            <Text color="white">Username: {user.username || 'Not set'}</Text>
                            <Text color="white">Email: {user.email}</Text>
                            {/* More profile details */}
                        </HStack>
                    ) : (
                        <Text color="white">Loading or not logged in...</Text>
                    )}
                </Box>
            </Flex>
        </Box>
    </ChakraProvider>
  );
}

export default Profile;
