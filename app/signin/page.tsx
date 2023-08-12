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
    useColorMode
  } from '@chakra-ui/react';
  import { useState, useEffect } from 'react';
  import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
  import { auth } from '@/utils/firebase'; 
  import dynamic from "next/dynamic";
  import NextLink from 'next/link';
  import Footer from '@/components/Footer'
  
  function SignInPage() {
    const { colorMode } = useColorMode();
    console.log(colorMode)
    const bgColor = colorMode === 'dark' ? 'gray.900' : 'gray.50';
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleSignIn = async () => {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        window.location.href = '/'; // Redirect to the dashboard or another desired page
      } catch (err: any) {
        setError(err.message);
      }
    };
    
    useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
            console.log('User is signed in:', user);
            window.location.href = '/'; // Redirect to the dashboard or another desired page
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
            align={'center'}
            justify={'flex-start'}
          >
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={6} px={6}>
              <Stack align={'center'}>
                <Heading fontSize={'4xl'}>Sign in to your account</Heading>
                <Text fontSize={'lg'} color={useColorModeValue('gray.600', 'gray.500')}>
                  to enjoy the best features ✌️
                </Text>
              </Stack>
              <Box
                rounded={'lg'}
                bg={useColorModeValue('gray.300', 'gray.700')} // this is already set for dark mode
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
                      <NextLink href="/ResetPassword" passHref>
                        <Link color={'blue.400'}>Forgot password?</Link>
                      </NextLink>
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

                    <Text align={'center'}>
                      Don&apos;t have an account?{' '}
                      <NextLink href="/signup" passHref>
                        <Text as="span" color="blue.400" cursor="pointer">Sign Up</Text>
                      </NextLink>
                    </Text>

                  </Stack>
                </Stack>
              </Box>
            </Stack>
            <Footer/>
          </Flex>
          
      );
    }

  export default dynamic(() => Promise.resolve(SignInPage), { ssr: false });
