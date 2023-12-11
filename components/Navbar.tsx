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
        sx={{ marginLeft: ["auto", "0"]}}
        aria-label="Toggle dark mode"
        icon={colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
        onClick={toggleColorMode}
        size="sm" 
        w="80px"
      />
    );
  }
  
  // export default function Navbar() {
  function Navbar() {
    const { isOpen, onToggle } = useDisclosure();
    const { colorMode } = useColorMode();
    const [user, setUser] = useState<User | null>(null);

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
              bg={useColorModeValue('gray.300', 'black')}
              color={useColorModeValue('black', 'white')}
              minH={'60px'}
              py={{ base: 2 }}
              px={{ base: 4 }}
              borderStyle={'solid'}
              borderColor={useColorModeValue('gray.200', 'gray.900')}
              align={'center'}
              justify={'space-between'}>
          <Flex
            flex={{ base: 1, md: 'auto' }}
            ml={{ base: -2 }}
            display={{ base: 'flex', md: 'none' }}>
            <IconButton
              onClick={onToggle}
              icon={
                isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={12} h={12} />
              }
              variant={'ghost'}
              aria-label={'Toggle Navigation'}
            />
          </Flex>
          <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
            <Text
              textAlign={'center' as const}
              fontFamily={'heading'}
              color={useColorModeValue('gray.800', 'white')}
            >
              <NextLink href="/" passHref>
                  <Button variant="link">
                      <Box>
                          <Image 
                              src={colorMode === "light" ? "/assets/jack.lion_text_dark.png" : "/assets/jack.lion_text_light.png"}
                              alt="Logo"
                              w={['100px', '50px', '660x']}  
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
    direction={{ base: 'column', md: 'row' }}   // <-- Changed this line
    spacing={2}
>
          {user ? (
              <>
                  {/* This is the "Profile" button styled as a box */}
                  <Button 
                    as={'a'} 
                    fontSize={'sm'} 
                    fontWeight={400} 
                    variant={'solid'} 
                    bg={'teal.500'}
                    _hover={{
                        bg: 'blue.400',  // Optional: change background on hover
                    }}
                    color={'white'}   // Changing text color to white for contrast
                    href='/Profile' 
                    size="sm"  
                    w="80px"
                >
                    Profile
                </Button>

                  {/* This is the "Logout" button styled with just red text */}
                  <Button
                      as={'a'}
                      fontSize={'sm'}
                      fontWeight={600}
                      variant={'link'}
                      color={'red.400'}
                      _hover={{
                          color: 'red.300',
                      }}
                      onClick={async () => {
                          await auth.signOut();
                          window.location.href = '/';
                      }} 
                      size="sm" 
                      w="80px"
                  >
                      Logout
                  </Button>
              </>
          ) : (
              <>
                  <Button 
                    sx={{ marginLeft: ["auto", "0"]}}
                    as={'a'} 
                    fontSize={'sm'} 
                    fontWeight={400} 
                    variant={'link'} 
                    href='/signin'
                    color={'blue.500'} // Set the text color to blue
                    _hover={{
                        color: 'blue.400',  // Change the text color slightly on hover
                        textDecoration: 'underline' // Underline text on hover for a stylized effect
                    }}
                    size="sm"  
                    w="80px"
                >
                    Sign In
                </Button>
                  <Button
                      sx={{ marginLeft: ["auto", "0"]}}
                      as={'a'}
                      display={{ base: 'inline-flex', md: 'inline-flex' }}
                      fontSize={'sm'}
                      fontWeight={600}
                      color={'white'}
                      bg={'teal.500'}
                      href='/signup'
                      _hover={{
                          bg: 'orange.400',
                      }}
                      size="sm"  
                      w="80px" 
                  >
                      Sign Up
                  </Button>
              </>
          )}
          <ColorModeSwitcher /> 
      </Stack>

        </Flex>
  
        <Collapse in={isOpen} animateOpacity>
          <MobileNav />
        </Collapse>
      </Box>
    );
  }
  
  const DesktopNav = () => {
    const popoverContentBgColor = useColorModeValue('white', 'gray.800');
  
    return (
      <Flex justifyContent="center" alignItems="center" flexGrow={1}>
        <Stack direction={'row'} spacing={4}>
          {NAV_ITEMS.map((navItem) => (
          <Box key={navItem.label}>
            <Popover trigger={'hover'} placement={'bottom-start'}>
              <PopoverTrigger>
              <NextLink href={navItem.href ?? '#'} passHref>
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
    </Flex>
  );
};
  
const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
  const subLabelColor = useColorModeValue('black', 'white'); // White in dark mode, Black in light mode

  return (
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
                <NextLink href={href ?? '#'} passHref>
                    <Box
                        transition={'all .3s ease'}
                        _groupHover={{ color: 'red.400' }}
                        fontWeight={500}
                        fontSize={'lg'}
                        color={subLabelColor}
                    >
                        {label}
                    </Box>
                </NextLink>


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
    const textColor = useColorModeValue('gray.600', 'gray.200');

    const { isOpen, onToggle } = useDisclosure();

    return (
        <Stack spacing={4} onClick={onToggle}>
            <Flex py={2} justify={'space-between'} align={'center'} _hover={{ textDecoration: children ? 'none' : 'underline' }}>
                {/* If there's an href and no children, make it a link. Otherwise, just a text label. */}
                {href && !children ? (
                    <NextLink href={href} passHref>
                        <Box fontWeight={600} fontSize={'lg'} color={textColor}>
                            {label}
                        </Box>
                    </NextLink>
                
                
                
                ) : (
                    <Text fontWeight={600} fontSize={'lg'} color={textColor}>
                        {label}
                    </Text>
                )}
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
                          <NextLink key={child.label} href={child.href ?? '#'} passHref>
                              <Box py={2} color={textColor} transition="all .3s ease" _hover={{ textDecoration: 'underline' }}>
                                  {child.label}
                              </Box>
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
          subLabel: 'Take a journey',
          href: '/av/RNBO/simple-sampler-dna',
        }
      ],
    }
  ];
