import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import Navbar from '../components/Navbar';  // Adjust the path based on your folder structure

const Profile = () => {
  return (
    <Box>
      <Navbar />

      <Flex direction="column" align="center" justify="center" minHeight="calc(100vh - 64px)">
        <Heading mb={4}>Your Profile</Heading>
        <Text>Username: JohnDoe</Text>
        <Text>Email: johndoe@example.com</Text>
        {/* More profile details */}
      </Flex>
    </Box>
  );
}

export default Profile;
