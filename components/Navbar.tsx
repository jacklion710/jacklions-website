import {
    Box,
    Flex,
    Text,
    IconButton,
    useColorMode,
    Button,
    Stack,
    Collapse,
    Icon,
    Image,
    Link as ChakraLink,
    Popover,
    PopoverTrigger,
    PopoverContent,
    useColorModeValue,
    useDisclosure
  } from '@chakra-ui/react';
  import {
    HamburgerIcon,
    CloseIcon,
    ChevronDownIcon,
    ChevronRightIcon,
    MoonIcon,
    SunIcon
  } from '@chakra-ui/icons';
  import dynamic from "next/dynamic";
  import { auth } from '../utils/firebase';
  import { useEffect, useState } from 'react';
  import { onAuthStateChanged } from 'firebase/auth';
  import { User } from 'firebase/auth';
  import NextLink from "next/link";

  function ColorModeSwitcher() {
    const { colorMode, toggleColorMode } = useColorMode();
    return (
      <IconButton
        aria-label="Toggle dark mode"
        icon={colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
        onClick={toggleColorMode}
      />
    );
  }
  
  // export default function Navbar() {
  function Navbar() {
    const { isOpen, onToggle } = useDisclosure();
    const { colorMode } = useColorMode();
    const [user, setUser] = useState<User | null>(null);
    const textAlignValue = 'center';
    // const textAlignValue = useBreakpointValue({ base: 'center', md: 'left', default: 'center' });

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in.
          setUser(user);
        } else {
          // No user is signed in.
          setUser(null);
        }
      });

      // Cleanup subscription on unmount
      return () => unsubscribe();
    }, []);

    return (
      <Box>
          <Flex
              bg={useColorModeValue('white', 'black')}
              // bg="repeating-linear-gradient(45deg, rgba(20, 63, 149, 0.2), rgba(0, 0, 0, 0.4) 10px, rgba(0, 0, 0, 0.4) 10px, rgba(20, 63, 149, 0.2) 20px)"

              color={useColorModeValue('black', 'white')}
              minH={'60px'}
              py={{ base: 2 }}
              px={{ base: 4 }}
              borderBottom={1}
              borderStyle={'solid'}
              borderColor={useColorModeValue('gray.200', 'gray.900')}
              align={'center'}>
          <Flex
            flex={{ base: 1, md: 'auto' }}
            ml={{ base: -2 }}
            display={{ base: 'flex', md: 'none' }}>
            <IconButton
              onClick={onToggle}
              icon={
                isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
              }
              variant={'ghost'}
              aria-label={'Toggle Navigation'}
            />
          </Flex>
          <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
                     <Text textAlign={'center' as const}
                        fontFamily={'heading'}
                        color={useColorModeValue('gray.800', 'white')}>
                        
                        <NextLink href="/">
                          <Button as={"a"} variant={"link"}>
                            <Box>
                                <Image 
                                    src={colorMode === "light" ? "/assets/jack.lion_dark.png" : "/assets/jack.lion_light.png"}
                                    alt="Logo"
                                    w={['40px', '40px', '50px']} 
                                    objectFit="cover"
                                />
                            </Box>
                        </Button>
                        </NextLink>
                    </Text>
            <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
              <DesktopNav />
            </Flex>
          </Flex>
  
          <Stack
            flex={{ base: 1, md: 0 }}
            justify={'flex-end'}
            direction={'row'}
            spacing={6}
          >
            <ColorModeSwitcher />
            {user ? (
              <>
                <Button as={'a'} fontSize={'sm'} fontWeight={400} variant={'link'} href='/Profile'>
                  Profile
                </Button>
                <Button
                  as={'a'}
                  display={{ base: 'inline-flex', md: 'inline-flex' }}
                  fontSize={'sm'}
                  fontWeight={600}
                  color={'white'}
                  bg={'red.400'}
                  onClick={() => auth.signOut()} // Make sure to actually log the user out here
                  _hover={{
                    bg: 'red.300',
                  }}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button 
                  as={'a'} 
                  fontSize={'sm'} 
                  fontWeight={400} 
                  variant={'link'} 
                  href='/signin'
                >
                  Sign In
                </Button>
                <Button
                  as={'a'}
                  display={{ base: 'inline-flex', md: 'inline-flex' }}
                  fontSize={'sm'}
                  fontWeight={600}
                  color={'white'}
                  bg={'red.400'}
                  href='/signup'
                  _hover={{
                    bg: 'red.300',
                  }}
                >
                  Sign Up
                </Button>
              </>
            )}
          </Stack>
        </Flex>
  
        <Collapse in={isOpen} animateOpacity>
          <MobileNav />
        </Collapse>
      </Box>
    );
  }
  
  const DesktopNav = () => {
    const linkColor = useColorModeValue('gray.600', 'gray.200');
    const linkHoverColor = useColorModeValue('gray.800', 'white');
    const popoverContentBgColor = useColorModeValue('white', 'gray.800');
  
    return (
      <Stack direction={'row'} spacing={4}>
        {NAV_ITEMS.map((navItem) => (
          <Box key={navItem.label}>
            <Popover trigger={'hover'} placement={'bottom-start'}>
              <PopoverTrigger>
              <NextLink href={navItem.href ?? '#'}>
                  <Box p={2}>
                      {navItem.label}
                  </Box>
              </NextLink>

              </PopoverTrigger>
  
              {navItem.children && (
                <PopoverContent
                  border={0}
                  boxShadow={'xl'}
                  bg={popoverContentBgColor}
                  p={4}
                  rounded={'xl'}
                  minW={'sm'}>
                  <Stack>
                    {navItem.children.map((child) => (
                      <DesktopSubNav key={child.label} {...child} />
                    ))}
                  </Stack>
                </PopoverContent>
              )}
            </Popover>
          </Box>
        ))}
      </Stack>
    );
  };
  
  const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
    const subLabelColor = useColorModeValue('black', 'white'); // White in dark mode, Black in light mode
  
    return (
      <NextLink href={href ?? '#'}>
        <Box
            role={'group'}
            display={'flex'}
            alignItems="center"
            p={2}
            rounded={'md'}
            _hover={{ bg: useColorModeValue('red.50', 'gray.900') }}
        >
        <Stack direction={'row'} align={'center'}>
          <Box>
            <Text
              transition={'all .3s ease'}
              _groupHover={{ color: 'red.400' }}
              fontWeight={500}
              fontSize={'md'}
              color={subLabelColor}
            >
              {label}
            </Text>
            <Text fontSize={'sm'} color={subLabelColor}>{subLabel}</Text>
          </Box>
          <Flex
            transition={'all .3s ease'}
            transform={'translateX(-10px)'}
            opacity={0}
            _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
            justify={'flex-end'}
            align={'center'}
            flex={1}
          >
            <Icon color={'red.400'} w={5} h={5} as={ChevronRightIcon} />
          </Flex>
        </Stack>
      </Box>
    </NextLink>
  );
};
  
  const MobileNav = () => {
    return (
      <Stack
        bg={useColorModeValue('white', 'gray.800')}
        p={4}
        display={{ md: 'none' }}>
        {NAV_ITEMS.map((navItem) => (
          <MobileNavItem key={navItem.label} {...navItem} />
        ))}
      </Stack>
    );
  };
  
  const MobileNavItem = ({ label, children, href }: NavItem) => {
    const { colorMode } = useColorMode();
    const textColor = useColorModeValue('gray.600', 'gray.200'); // Default text color for light mode and dark mode
  
    const { isOpen, onToggle } = useDisclosure();
  
    return (
      <Stack spacing={4} onClick={children && onToggle}>
      <NextLink href={href ?? '#'}>
          <Flex py={2} as={"a"} justify={'space-between'} align={'center'} _hover={{textDecoration: 'none'}}>
          <Text
            fontWeight={600}
            fontSize={'md'}
            color={colorMode === 'light' ? 'black' : 'white'} // Set the text color based on the current color mode
          >
            {label}
          </Text>
          {children && (
            <Icon
              as={ChevronDownIcon}
              transition={'all .25s ease-in-out'}
              transform={isOpen ? 'rotate(180deg)' : ''}
              w={6}
              h={6}
            />
          )}
        </Flex>
    </NextLink>
  
        <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
          <Stack
            mt={2}
            pl={4}
            borderLeft={1}
            borderStyle={'solid'}
            borderColor={useColorModeValue('gray.200', 'gray.700')}
            align={'start'}
          >
            {children &&
              children.map((child) => (
                <NextLink key={child.label} href={child.href ?? '#'}>
                  <ChakraLink py={2} color={colorMode === 'light' ? 'black' : 'white'}>
                    {child.label}
                  </ChakraLink>
                </NextLink>
              ))}

          </Stack>
        </Collapse>
      </Stack>
    );
  };

  export default dynamic(() => Promise.resolve(Navbar), { ssr: false });

  interface NavItem {
    label: string;
    subLabel?: string;
    children?: Array<NavItem>;
    href?: string;
  }
  

  const NAV_ITEMS: Array<NavItem> = [
    {
      label: 'Gallery',
      children: [
        {
          label: 'Audio',
          subLabel: 'Music',
          href: '/Audio',
        },
        {
          label: 'Visual',
          subLabel: 'Graphics',
          href: '/Visual',
        },
      ],
    },
    {
      label: 'Services',
      children: [
        {
          label: 'Lessons',
          subLabel: '1 on 1 lessons',
          href: '/Lessons',
        },
        {
          label: 'Audio Engineering',
          subLabel: 'Recording sessions and engineering services',
          href: '/Engineering',
        }
      ],
    },
    {
      label: 'Shop',
      children: [
        {
          label: 'Samples',
          subLabel: 'Packs for music production',
          href: '/Samples',
        },
        {
          label: 'Devices',
          subLabel: 'Creative enhancements',
          href: '/Devices',
        }
      ],
    },
    {
      label: 'Contact',
      children: [
        {
          label: 'Social',
          subLabel: 'Media links',
          href: '/Social',
        },
        {
          label: 'Direct',
          subLabel: 'Reach me',
          href: '/Direct',
        }
      ],
    },
    {
      label: 'Immersive',
      children: [
        {
          label: 'Playground',
          subLabel: 'Take a leap of faith',
          href: '/wip',
        }
      ],
    }
  ];

  
