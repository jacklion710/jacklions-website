import { Box, ChakraProvider, Flex, Heading, Text, HStack, Button, useToast } from '@chakra-ui/react';
import Navbar from '../components/Navbar';
import { onAuthStateChanged, deleteUser } from 'firebase/auth';
import { useState, useEffect } from 'react';
import { getFirestore, doc, setDoc, getDoc, deleteDoc } from 'firebase/firestore';
import { auth } from '@/utils/firebase';
import { useRouter } from 'next/router';

interface User {
  email: string | null;
  displayName: string | null;
  username: string | null;
}

const Profile = () => {
  const [user, setUser] = useState<User | null>(null);
  const backgroundColor = 'gray.900'; 
  const boxColor = 'gray.700';  
  const toast = useToast();
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const db = getFirestore();
        const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUser({
            email: currentUser.email,
            displayName: currentUser.displayName,
            username: userData.username || null,
          });
        } else {
          setUser({
            email: currentUser.email,
            displayName: currentUser.displayName,
            username: null,
          });
        }
      } else {
        setUser(null);
      }
    });
  
    return () => unsubscribe();
  }, [user]);

  const handleDeleteAccount = async () => {
    if (user && auth.currentUser && window.confirm('Are you sure you want to delete your account?')) {
      try {
        const db = getFirestore();
        const userDocRef = doc(db, 'users', auth.currentUser.uid);
  
        // First, delete the user's document from Firestore
        await deleteDoc(userDocRef);
  
        // Then, delete the user from Firebase Auth
        await deleteUser(auth.currentUser);
  
        toast({
          title: "Account deleted.",
          description: "Your account and associated data have been successfully deleted.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
  
        // Redirect to root path
        router.push('/');
  
      } catch (error: any) {
        toast({
          title: "Error.",
          description: error.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    }
  };
  

  return (
    <ChakraProvider>
      <Box bgColor={backgroundColor} minH="100vh">
        <Navbar />

        <Flex direction="column" align="center" justify="center" minHeight="calc(100vh - 64px)">
          <Heading mb={4} color="white">Your Profile</Heading>

          <Box w="full" maxW="600px" p={4} bgColor={boxColor} borderWidth={1} borderRadius="lg" boxShadow="lg">
            {user ? (
              <HStack spacing={4}>
                <Text color="white">Username: {user.username}</Text>
                <Text color="white">Email: {user.email}</Text>
                {/* More profile details */}
                <Button colorScheme="red" onClick={handleDeleteAccount}>Delete Account</Button>
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
