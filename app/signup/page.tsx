"use client"
import {
    Flex,
    Box,
    Checkbox,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Link as ChakraLink,
  } from '@chakra-ui/react';
  import Link from 'next/link';
  import { useState, useEffect } from 'react';
  import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
  import { auth } from '../../utils/firebase';
  import dynamic from "next/dynamic";
  import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
  import { updateProfile } from 'firebase/auth';
  import { doc, setDoc, getDoc } from 'firebase/firestore';
  import { db } from '../../utils/firebase'; 
  import { User as FirebaseUser, sendEmailVerification } from 'firebase/auth';

  type User = {
    email: string;
    displayName: string | null;
    username: string | null;
};

  function SignUpPage() {
    const [user, setUser] = useState<any | null>(null);
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isOptedIn, setIsOptedIn] = useState(true);
    const [emailSent, setEmailSent] = useState(false);

    const handleSignup = async () => {
      try {
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          if (userCredential.user) {
              // Send email verification to the new user
              await sendEmailVerification(userCredential.user);
              setEmailSent(true);  // Set the emailSent state to true
  
              await updateProfile(userCredential.user, {
                  displayName: `${firstName} ${lastName}`,
              });
  
              // Define user data that should be saved in Firestore
              const userData = {
                  displayName: `${firstName} ${lastName}`,
                  username: username,
                  email: email, 
                  phoneNumber: phoneNumber, // assuming you've set state for phone number as well
                  isOptedIn: isOptedIn
              };
  
              // Store user data in Firestore
              const userDocRef = doc(db, 'users', userCredential.user.uid);
              await setDoc(userDocRef, userData, { merge: true }); // merge true will make sure we only update/add these fields
            }
          } catch (err: any) {
              setError(err.message);
          }
      };

  useEffect(() => {
    // Set an authentication state observer and get user data
    const unsubscribe = onAuthStateChanged(auth, async (currentUser: FirebaseUser | null) =>  {
        if (currentUser) {
            const userDocRef = doc(db, 'users', currentUser.uid);
            const userSnap = await getDoc(userDocRef);
            if (userSnap.exists()) {
                setUser(userSnap.data() as User);
            } else {
                setUser({
                    email: currentUser.email,
                    displayName: currentUser.displayName,
                    username: null
                });
            }
        } else {
            setUser(null);
        }
    });

    // Cleanup the listener on component unmount
        return () => unsubscribe();
    }, []);
    
    return (
      <Flex align={'center'} justify={'center'}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={8} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'} textAlign={'center'}>
              Sign up
            </Heading>
            <Text fontSize={'lg'} color={useColorModeValue('gray.600', 'gray.500')}>
              to enjoy the best features ✌️
            </Text>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('gray.300', 'gray.700')}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={4}>
              {/* Username field added here */}
              <FormControl id="username" isRequired>
                <FormLabel>Username</FormLabel>
                <Input value={username} onChange={(e) => setUsername(e.target.value)} type="text" />
              </FormControl>

              <HStack>
                <Box>
                  <FormControl id="firstName" isRequired>
                    <FormLabel>First Name</FormLabel>
                    <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} type="text" />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="lastName">
                    <FormLabel>Last Name</FormLabel>
                    <Input value={lastName} onChange={(e) => setLastName(e.target.value)} type="text" />
                  </FormControl>
                </Box>
              </HStack>

              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input value={email} onChange={(e) => setEmail(e.target.value)} type="text" />
              </FormControl>

              <FormControl id="phoneNumber">
                  <FormLabel>Phone Number (optional)</FormLabel>
                  <Input value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} type="tel" />
              </FormControl>


              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                <Input 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    type={showPassword ? "text" : "password"} 
                />

                  <InputRightElement h={'full'}>
                    <Button
                      variant={'ghost'}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }>
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Stack spacing={10} pt={2}>
              {emailSent && (
                  <Text color="green.500">
                      Verification email sent! Please check your inbox.
                  </Text>
              )}

              {error && <Text color="red.500">{error}</Text>}
                <Button
                    onClick={handleSignup}
                    loadingText="Submitting"
                    size="lg"
                    bg={'blue.400'}
                    color={'white'}
                    _hover={{
                        bg: 'blue.500',
                    }}>
                    Sign up
                </Button>

                <FormControl mt={4}>
                  <Flex justify="center">
                    <Checkbox 
                        isChecked={isOptedIn} 
                        onChange={(e) => setIsOptedIn(e.target.checked)}
                    >
                        Sign me up for the email list
                    </Checkbox>
                  </Flex>
               </FormControl>

              </Stack>
              <Stack pt={6}>
                <Text align={'center'}>
                    Already a user?{' '} 
                    <Link href="./signin" passHref>
                        <ChakraLink color="blue.400">Login</ChakraLink>
                    </Link>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    );
  }

  export default dynamic (() => Promise.resolve(SignUpPage), {ssr: false})

