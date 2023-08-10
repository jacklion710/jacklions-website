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
    VStack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Link as ChakraLink,
  } from '@chakra-ui/react';
  import Link from 'next/link';
  import { useState } from 'react';
  import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
  import { auth } from '../../utils/firebase';
  import dynamic from "next/dynamic";
  import { createUserWithEmailAndPassword } from 'firebase/auth';
  import { updateProfile } from 'firebase/auth';
  import { doc, setDoc } from 'firebase/firestore';
  import { db } from '../../utils/firebase'; 

  function SignUpPage() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isOptedIn, setIsOptedIn] = useState(true);

    const handleSignup = async () => {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        if (userCredential.user) {
          await updateProfile(userCredential.user, {
            displayName: `${firstName} ${lastName}`,
          });
          // Store the email list preference in Firestore
          const userDocRef = doc(db, 'users', userCredential.user.uid);
          await setDoc(userDocRef, {
            isOptedIn: isOptedIn
          }, { merge: true });  // merge true will make sure we only update/add this field
        }
      } catch (err: any) {
        setError(err.message);
      }
    };
    
    return (
      <Flex
        align={'center'}
        justify={'center'}
        // bg={useColorModeValue('gray.50', 'gray.800')}
        >
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'} textAlign={'center'}>
              Sign up
            </Heading>
            <Text fontSize={'lg'} color={useColorModeValue('gray.600', 'gray.500')}>
              to enjoy the best features  ✌️
            </Text>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('gray.300', 'gray.700')}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={4}>
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

