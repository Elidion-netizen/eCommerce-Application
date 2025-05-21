'use client';

import { Icon, CloseButton, Drawer, Portal, VStack } from '@chakra-ui/react';
import { RxHamburgerMenu } from 'react-icons/rx';

export const DrawerMenu = ({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element => {
  return (
    <Drawer.Root>
      <Drawer.Trigger asChild>
        <Icon size="lg">
          <RxHamburgerMenu />
        </Icon>
      </Drawer.Trigger>
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.Header>
              <Drawer.Title cursor={'default'}>Menu</Drawer.Title>
            </Drawer.Header>
            <Drawer.Body>
              <Drawer.ActionTrigger asChild>
                <VStack align="stretch" pt={4}>
                  {children}
                </VStack>
              </Drawer.ActionTrigger>
            </Drawer.Body>
            <Drawer.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Drawer.CloseTrigger>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
};
