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
    useBreakpointValue,
    ChakraProvider,
    useColorMode,
    ColorModeScript
  } from '@chakra-ui/react';
  import { useState, useEffect } from 'react';
  import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
  import { auth } from '../utils/firebase'; 
  import { useRouter } from 'next/router';
  import dynamic from "next/dynamic";
  import Navbar from '../components/Navbar';

  function SignInPage() {
    const { colorMode } = useColorMode();
    console.log(colorMode)
    const bgColor = colorMode === 'dark' ? 'gray.900' : 'gray.50';
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
          <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={bgColor}
          >
            <Navbar />
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
              <Stack align={'center'}>
                <Heading fontSize={'4xl'}>Sign in to your account</Heading>
                <Text fontSize={'lg'} color={useColorModeValue('gray.600', 'gray.200')}>
                  Sign in to enjoy all of the coolest features 
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
      );
    }

  export default dynamic(() => Promise.resolve(SignInPage), { ssr: false });
