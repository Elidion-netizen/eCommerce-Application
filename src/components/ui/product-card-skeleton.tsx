import { Skeleton, Stack, SkeletonText } from '@chakra-ui/react';

export const ProductCardSkeleton = (): React.JSX.Element => {
  return (
    <Stack
      w="300px"
      h="450px"
      borderRadius="2xl"
      border={1}
      display="flex"
      flexDirection="column"
    >
      <Skeleton height="250px" width="100%" />
      <SkeletonText noOfLines={1} gap="6" />
      <SkeletonText noOfLines={2} gap="2" />
      <SkeletonText noOfLines={1} gap="4" />
    </Stack>
  );
};
