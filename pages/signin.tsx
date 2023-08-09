"use client"
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Link,
    Button,
    Heading,
    Text,
    useColorModeValue,
    ChakraProvider,
    ColorModeScript
  } from '@chakra-ui/react';
  import { useState } from 'react';
  import { signInWithEmailAndPassword } from 'firebase/auth';
  import { auth } from '../utils/firebase'; 
  import { onAuthStateChanged } from 'firebase/auth';
  import { useEffect } from 'react';
  import { useRouter } from 'next/router';
  import dynamic from "next/dynamic";
  import Navbar from '../components/Navbar';

  function SignInPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const handleSignIn = async () => {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        router.push('/'); // Redirect to the dashboard or another desired page
      } catch (err: any) {
        setError(err.message);
      }
    };
    
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          console.log('User is signed in:', user);
          router.push('/'); // Redirect to the dashboard or another desired page
        } else {
          console.log('User is signed out');
          // Handle the sign-out situation as needed
        }
      });

      // Return a cleanup function to unsubscribe the listener when the component unmounts
      return () => unsubscribe();
    }, []);

    return (
      <ChakraProvider>
        <Navbar />
          <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.900')} // making it even darker for dark mode
          >
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
              <Stack align={'center'}>
                <Heading fontSize={'4xl'}>Sign in to your account</Heading>
                <Text fontSize={'lg'} color={useColorModeValue('gray.600', 'gray.200')}>
                  to enjoy all of our cool <Link color={useColorModeValue('blue.400', 'blue.200')}>Forgot password?</Link> ✌️
                </Text>
              </Stack>
              <Box
                rounded={'lg'}
                bg={useColorModeValue('white', 'gray.800')} // this is already set for dark mode
                boxShadow={'lg'}
                p={8}
              >
                <Stack spacing={4}>
                  <FormControl id="email" isRequired>
                    <FormLabel>Email address</FormLabel>
                    <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </FormControl>

                  <FormControl id="password" isRequired>
                    <FormLabel>Password</FormLabel>
                    <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                  </FormControl>

                  <Stack spacing={10}>
                    <Stack
                      direction={{ base: 'column', sm: 'row' }}
                      align={'start'}
                      justify={'space-between'}>
                      <Checkbox>Remember me</Checkbox>
                      <Link color={'blue.400'}>Forgot password?</Link>
                    </Stack>
                    {error && <Text color="red.500">{error}</Text>}
                    <Button
                      onClick={handleSignIn}
                      bg={useColorModeValue('blue.400', 'blue.600')} // darker blue for dark mode
                      color={'white'}
                      _hover={{
                        bg: useColorModeValue('blue.500', 'blue.700'), // hover effect in dark mode
                      }}
                    >
                      Sign in
                    </Button>
                  </Stack>
                </Stack>
              </Box>
            </Stack>
          </Flex>
        </ChakraProvider>
      );
    }

  export default dynamic(() => Promise.resolve(SignInPage), { ssr: false });
