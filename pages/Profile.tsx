import { 
  Box, 
  Checkbox, 
  ChakraProvider, 
  Flex, 
  Heading, 
  Text, 
  VStack, 
  Input, 
  Button, 
  useToast 
} from '@chakra-ui/react';
import Navbar from '../components/Navbar';
import { onAuthStateChanged, deleteUser } from 'firebase/auth';
import { useState, useEffect } from 'react';
import { getFirestore, doc, setDoc, getDoc, deleteDoc } from 'firebase/firestore';
import { auth } from '@/utils/firebase';
import { useRouter } from 'next/router';
import React from 'react';
import Footer from '../components/Footer';

interface User {
  email: string | null;
  displayName: string | null;
  username: string | null;
  isSubscribedToEmail: boolean;
  isOptedIn?: boolean;
}

const Profile = () => {
  const [user, setUser] = useState<User | null>(null);
  const backgroundColor = 'gray.800'; 
  const boxColor = 'gray.700';  
  const toast = useToast();
  const router = useRouter();
  const [bio, setBio] = useState<string | null>(null);
  const [editing, setEditing] = useState<boolean>(false);
  const [tempBio, setTempBio] = useState<string>('');

  const handleOptInChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!user || !auth.currentUser) return;

    const optedIn = e.target.checked;
    
    // Update Firestore with the new opt-in status
    const db = getFirestore();
    const userDocRef = doc(db, 'users', auth.currentUser.uid);
    
    await setDoc(userDocRef, { isOptedIn: optedIn }, { merge: true });

    // Update the local user state
    setUser(prev => prev ? { ...prev, isOptedIn: optedIn } : null);
};

  const handleSaveBio = async () => {
    if (user && auth.currentUser) {
        const db = getFirestore();
        const userDocRef = doc(db, 'users', auth.currentUser.uid);
        
        await setDoc(userDocRef, { bio: tempBio }, { merge: true });

        setBio(tempBio);
        setEditing(false);
    }
};


useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
    if (currentUser && currentUser.emailVerified) {
        const db = getFirestore();
        const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUser({
            email: currentUser.email,
            displayName: currentUser.displayName,
            username: userData.username || null,
            isSubscribedToEmail: userData.isSubscribedToEmail || false,
            isOptedIn: userData.isOptedIn || false  
        });
        

          setBio(userData.bio || null);
        } else {
          setUser({
            email: currentUser.email,
            displayName: currentUser.displayName,
            username: null,
            isSubscribedToEmail: false,
            isOptedIn: false  
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

            <Flex direction="column" align="center" justify="center" minHeight="calc(100vh - 64px)" pb="100px">
                <Heading mb={4} color="white">Your Profile</Heading>

                <Box w="full" maxW="600px" p={4} bgColor={boxColor} borderWidth={1} borderRadius="lg" boxShadow="lg">
                    {user ? (
                        <VStack spacing={4} align="start">
                            <Text color="white">Username: {user.username}</Text>
                            <Text color="white">Email: {user.email}</Text>
                            
                            {/* Bio section */}
                            {!editing ? (
                                <Box>
                                    <Text color="white">Bio: {bio || "No bio available."}</Text>
                                    <Button mt={2} size="sm" onClick={() => { setEditing(true); setTempBio(bio || ''); }}>Edit Bio</Button>
                                </Box>
                            ) : (
                                <Box>
                                    <Input 
                                        value={tempBio} 
                                        onChange={(e) => setTempBio(e.target.value)} 
                                    />
                                    <Button mt={2} size="sm" onClick={handleSaveBio}>Save</Button>
                                </Box>
                            )}

                                <Checkbox 
                                    isChecked={user.isOptedIn}
                                    onChange={handleOptInChange}
                                    colorScheme="teal"  // Add any color scheme you prefer from Chakra UI
                                >
                                    Email List
                                </Checkbox>
                            
                            <Text 
                              mt={4} 
                              color="red.500" 
                              fontWeight="bold" 
                              cursor="pointer"
                              _hover={{
                                textDecoration: 'underline',
                              }}
                              onClick={handleDeleteAccount}
                            >
                              Delete Account
                            </Text>
                        </VStack>
                    ) : (
                        <Text color="white">Please verify your email</Text>
                    )}
                </Box>
            </Flex>
        </Box>
      <Footer />
    </ChakraProvider>
  );
}

export default Profile;
