import { Box, IconButton, Image } from '@chakra-ui/react';
import { useColorMode } from './color-mode';
import { FaChevronLeft, FaChevronRight, FaTimes } from 'react-icons/fa';
import { useState } from 'react';

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: Array<{ url: string }>;
  initialImageIndex: number;
}

export const ImageModal = ({
  isOpen,
  onClose,
  images,
  initialImageIndex,
}: ImageModalProps): React.JSX.Element | undefined => {
  const [currentImageIndex, setCurrentImageIndex] = useState(initialImageIndex);
  const { colorMode } = useColorMode();

  const handleNextImage = (): void => {
    setCurrentImageIndex((previous) => (previous + 1) % images.length);
  };

  const handlePreviousImage = (): void => {
    setCurrentImageIndex(
      (previous) => (previous - 1 + images.length) % images.length
    );
  };

  if (!isOpen) return undefined;

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      bottom={0}
      zIndex={1000}
      display="flex"
      alignItems="center"
      justifyContent="center"
      pt="80px"
    >
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        bg="blackAlpha.700"
        onClick={onClose}
      />

      <Box
        position="relative"
        bg={colorMode === 'dark' ? 'gray.800' : 'white'}
        maxW="80vw"
        maxH="80vh"
        borderRadius="lg"
        overflow="hidden"
        zIndex={1001}
      >
        <IconButton
          aria-label="Close modal"
          position="absolute"
          right={2}
          top={2}
          zIndex={2}
          onClick={onClose}
          colorScheme="whiteAlpha"
          size="lg"
        >
          <FaTimes />
        </IconButton>

        <Box position="relative">
          <Image
            src={images[currentImageIndex]?.url}
            alt="Product image"
            w="100%"
            h="100%"
            objectFit="contain"
            maxH="80vh"
          />

          {images.length > 1 && (
            <>
              <IconButton
                aria-label="Previous image"
                position="absolute"
                left={4}
                top="50%"
                transform="translateY(-50%)"
                onClick={handlePreviousImage}
                colorScheme="whiteAlpha"
                size="lg"
                cursor="pointer"
              >
                <FaChevronLeft />
              </IconButton>
              <IconButton
                aria-label="Next image"
                position="absolute"
                right={4}
                top="50%"
                transform="translateY(-50%)"
                onClick={handleNextImage}
                colorScheme="whiteAlpha"
                size="lg"
                cursor="pointer"
              >
                <FaChevronRight />
              </IconButton>
            </>
          )}

          <Box
            position="absolute"
            bottom={4}
            left="50%"
            transform="translateX(-50%)"
            display="flex"
            gap={2}
          >
            {images.map((_, index) => (
              <Box
                key={index}
                w={2}
                h={2}
                borderRadius="full"
                bg={index === currentImageIndex ? 'white' : 'whiteAlpha.500'}
                cursor="pointer"
                onClick={() => {
                  setCurrentImageIndex(index);
                }}
              />
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
