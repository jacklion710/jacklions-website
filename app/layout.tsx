"use client"
import { 
  ChakraProvider, 
  Flex, 
  Box 
} from '@chakra-ui/react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ChakraProvider>
          <Flex direction="column" minHeight="100vh">
            <Navbar />
            <Box flex="1">
              {children}
            </Box>
            <Footer />
          </Flex>
        </ChakraProvider>
      </body>
    </html>
  )
}
