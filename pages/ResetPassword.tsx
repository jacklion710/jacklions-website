"use client"
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Button,
    Text,
    useColorModeValue,
    Heading,
    ChakraProvider,
    Stack,
    useColorMode
} from '@chakra-ui/react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '@/utils/firebase';
import { useState } from 'react';
import Navbar from '@/components/Navbar';

type CustomError = {
    message: string;
  };  

export default function ResetPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const { colorMode } = useColorMode();
  const bgColor = useColorModeValue('gray.500', 'gray.900');

  const handleResetPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset link has been sent to your email!");
    } catch (err) {
      if (typeof err === "object" && err !== null && "code" in err) {
        switch (err.code) {
          case "auth/user-not-found":
            setMessage("That email could not be found.");
            break;
          // You can add more error codes and messages as needed
          default:
            setMessage("An unexpected error occurred.");
        }
      } else {
        setMessage("An unexpected error occurred.");
      }
    }
  };
    
  return (
    <ChakraProvider resetCSS>
      <Navbar />
        <Flex align={'center'} justify={'flex-start'}>
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'}>Reset Password</Heading>
                        <Text fontSize={'lg'} color={useColorModeValue('gray.600', 'gray.500')}>
                            Enter your email to receive reset instructions.
                        </Text>
                    </Stack>
                    <Box
                        rounded={'lg'}
                        bg={bgColor}
                        boxShadow={'lg'}
                        p={8}
                     >
                    <Stack spacing={4}>
                        <FormControl id="email" isRequired>
                            <FormLabel>Email address</FormLabel>
                            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </FormControl>

                        <Stack spacing={10}>
                            {message && <Text color={message.includes('error') ? 'red.500' : 'green.500'}>{message}</Text>}
                            <Button
                                onClick={handleResetPassword}
                                bg={useColorModeValue('blue.400', 'blue.600')}
                                color={'white'}
                                _hover={{
                                    bg: useColorModeValue('blue.500', 'blue.700')
                                }}
                            >
                                Send Reset Link
                            </Button>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    </ChakraProvider >
);
}

// export default ResetPassword;
// export default dynamic(() => Promise.resolve(ResetPassword), { ssr: false });
