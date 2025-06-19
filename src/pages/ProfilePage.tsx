import { useState } from 'react';
import { Box, VStack } from '@chakra-ui/react';
import { useColorMode } from '@/components/ui/color-mode';
import { colors } from '@/components/ui/colors';

import Sidebar from '@/components/ui/sidebar';
import UserInformation from '@/components/ui/user-information';
import Settings from '@/components/ui/settings-profile';
import UserAddresses from '@/components/ui/user-addresses';

export default function SliderBar(): React.JSX.Element {
  const { colorMode } = useColorMode();
  const [activeTab, setActiveTab] = useState('User Information');

  const currentColors = colors[colorMode];

  return (
    <Box
      py={10}
      px={{ base: 4, md: 6 }}
      display="flex"
      flexDirection={{ base: 'column', md: 'row' }}
      alignItems={{ base: 'stretch', md: 'center' }}
      justifyContent="start"
      height="100%"
      bg={currentColors.bg}
    >
      <VStack
        w={{ base: '100%', md: 200 }}
        align="stretch"
        mb={{ base: 4, md: 0 }}
        spacing={2}
      >
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          currentColors={currentColors}
        />
      </VStack>

      <Box flex="1" p={{ base: 0, md: 6 }}>
        {activeTab === 'User Information' && (
          <UserInformation
            currentColors={currentColors}
            colorMode={colorMode}
          />
        )}
        {activeTab === 'User Adresses' && (
          <UserAddresses currentColors={currentColors} colorMode={colorMode} />
        )}
        {activeTab === 'Settings' && (
          <Settings currentColors={currentColors} colorMode={colorMode} />
        )}
      </Box>
    </Box>
  );
}
