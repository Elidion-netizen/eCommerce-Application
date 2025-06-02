import { Button } from '@chakra-ui/react';
import type { ButtonProps } from '@chakra-ui/react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  currentColors: Record<string, string>;
}

const tabs = ['User Information', 'User Adresses', 'Settings'];

export default function Sidebar({
  activeTab,
  setActiveTab,
  currentColors,
}: SidebarProps): React.JSX.Element {
  const getButtonStyles = (tab: string): ButtonProps => ({
    variant: 'ghost',
    justifyContent: 'flex-start',
    fontSize: 16,
    height: 12,
    color: currentColors.text,
    _hover: {
      bg: currentColors.soft || currentColors.secondary,
      transform: 'translateX(2px)',
      borderRightColor: currentColors.primary,
      borderRightWidth: '2px',
    },
    transition: 'all 0.2s',
    ...(activeTab === tab && {
      bg: currentColors.soft || currentColors.secondary,
      borderRightColor: currentColors.primary,
      borderRightWidth: '2px',
      transform: 'translateX(2px)',
    }),
  });

  return (
    <>
      {tabs.map((tab) => (
        <Button
          key={tab}
          {...getButtonStyles(tab)}
          onClick={() => {
            setActiveTab(tab);
          }}
          w="100%"
        >
          {tab}
        </Button>
      ))}
    </>
  );
}
