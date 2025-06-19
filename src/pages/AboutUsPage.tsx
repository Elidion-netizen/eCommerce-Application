import {
  Box,
  Container,
  Flex,
  Heading,
  Text,
  VStack,
  HStack,
  Image,
  Link,
} from '@chakra-ui/react';
import { colors } from '../components/ui/colors';
import { useColorMode } from '../components/ui/color-mode';

interface RSLogoProps {
  colorMode: 'light' | 'dark';
}

const RSLogo = ({ colorMode }: RSLogoProps): React.JSX.Element => (
  <svg
    viewBox="0 0 64 64"
    width="100"
    height="100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_5701_38384)">
      <circle
        cx="32"
        cy="32"
        r="32"
        fill={colorMode === 'dark' ? 'white' : 'black'}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13 21.5095V42.5L19.3067 42.4621V33.9474C20.0567 33.9474 20.7616 33.9775 21.4049 34.4267C21.8946 34.8785 22.2838 35.4335 22.546 36.054L25.9202 42.4621H33C31.5957 39.6675 30.4706 36.1327 28.0552 34.0104C27.5455 33.6749 26.9919 33.4158 26.411 33.241C27.1873 33.0779 27.9357 32.7973 28.6319 32.4084C30.3855 31.3375 31.3915 29.3808 31.3436 27.3374C31.3798 26.1328 31.0495 24.9466 30.3988 23.9441C28.9256 21.6883 25.9337 21.4213 23.4663 21.5095H13ZM21.9939 30.0116H19.3313V25.6975H22.1043C23.4807 25.5594 25.1814 26.1754 25.0859 27.8041C25.1499 29.5621 23.3647 29.9127 21.9939 30.0116Z"
        fill="#FFB749"
      />
      <path
        d="M39.4768 35.089L33 35.4666C33.1262 37.3671 34.0021 39.16 35.4636 40.5088C36.9117 41.8323 39.5076 42.4941 43.2515 42.4941C46.3564 42.5823 49.9058 41.8146 51.821 39.1569C52.5929 38.0934 53.0033 36.8427 52.9998 35.564C53.0217 33.1848 51.4339 31.2297 49.3044 30.3147C47.2632 29.4766 45.1198 28.8674 42.9204 28.5C42.1107 28.41 41.3327 28.1563 40.6423 27.757C39.9039 27.2597 40.078 26.2272 40.735 25.7596C42.6084 24.5207 45.6299 25.5545 45.8608 27.9032L52.2845 27.5621C52.1703 25.768 51.1844 24.0545 49.6356 22.9583C47.6987 21.8887 45.4532 21.3874 43.1986 21.5212C41.3493 21.4527 39.5037 21.7218 37.7682 22.3128C35.6082 23.1125 33.829 25.064 33.8344 27.4525C33.7931 28.9377 34.5158 30.4088 35.755 31.3621C37.6454 32.6238 39.8325 33.4582 42.139 33.798C43.3833 33.9637 44.5727 34.3795 45.6224 35.0159C46.5878 35.7309 46.5807 37.167 45.5959 37.8903C44.5078 38.6532 42.9034 38.7416 41.6818 38.2468C40.3717 37.716 39.6048 36.4784 39.4768 35.089Z"
        fill="#FFB749"
      />
    </g>
    <defs>
      <clipPath id="clip0_5701_38384">
        <rect width="64" height="64" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export default function AboutUsPage(): React.JSX.Element {
  const { colorMode } = useColorMode();
  const currentColors = colors[colorMode];

  return (
    <Container maxW="container.xl" py={8}>
      <VStack gap={3} align="stretch">
        <Flex justify="center" mb={1}>
          <Link
            href="https://rs.school/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Box
              _hover={{ transform: 'scale(1.05)' }}
              transition="transform 0.2s"
            >
              <RSLogo colorMode={colorMode} />
            </Box>
          </Link>
        </Flex>

        <Box>
          <Heading
            as="h1"
            size="xl"
            mb={6}
            textAlign="center"
            color={currentColors.text}
          >
            Our Team
          </Heading>

          <VStack gap={12} align="stretch">
            <Box
              p={6}
              borderRadius="lg"
              bg={currentColors.bg}
              boxShadow="md"
              _hover={{ transform: 'translateY(-5px)', boxShadow: 'lg' }}
              transition="all 0.3s"
            >
              <HStack gap={6} align="start">
                <Image
                  src="https://i.postimg.cc/0Q1y3q1W/Kelvin.png"
                  alt="Team Member"
                  boxSize="150px"
                  borderRadius="full"
                  objectFit="cover"
                />
                <VStack align="start" gap={3} flex={1}>
                  <Heading as="h2" size="lg" color={currentColors.text}>
                    Elidion Netizen
                  </Heading>
                  <Text color={currentColors.text}>
                    Team Lead Frontend Developer
                  </Text>
                  <Text color={currentColors.text}>
                    Contribution: Project creation and initial configuration,
                    task management in the Kanban board, GitHub repository
                    maintenance, login page, authorisation logic implementation,
                    routing, favicon and metategs implementation.
                  </Text>
                  <Link
                    href="https://github.com/elidion-netizen"
                    target="_blank"
                    rel="noopener noreferrer"
                    color="blue.500"
                    _hover={{ textDecoration: 'underline' }}
                  >
                    GitHub Profile
                  </Link>
                </VStack>
              </HStack>
            </Box>

            <Box
              p={6}
              borderRadius="lg"
              bg={currentColors.bg}
              boxShadow="md"
              _hover={{ transform: 'translateY(-5px)', boxShadow: 'lg' }}
              transition="all 0.3s"
            >
              <HStack gap={6} align="start">
                <Image
                  src="https://i.postimg.cc/fL7RQgww/Nelli.jpg"
                  alt="Team Member"
                  boxSize="150px"
                  borderRadius="full"
                  objectFit="cover"
                />
                <VStack align="start" gap={3} flex={1}>
                  <Heading as="h2" size="lg" color={currentColors.text}>
                    Abukhovich Neli
                  </Heading>
                  <Text color={currentColors.text}>Frontend Developer</Text>
                  <Text color={currentColors.text}>
                    Former elite gymnast (World Cup/Championship competitor) who
                    transitioned to tech through Belarusian State University.
                    Currently completing a final-year JavaScript learning game
                    project while specializing in frontend development
                  </Text>
                  <Text color={currentColors.text}>
                    Contribution: Creation of an API client, implementation of a
                    header, implementation of routing, catalog page
                    implementation, user profile page, basket page.
                  </Text>
                  <Link
                    href="https://github.com/abukhovichneli"
                    target="_blank"
                    rel="noopener noreferrer"
                    color="blue.500"
                    _hover={{ textDecoration: 'underline' }}
                  >
                    GitHub Profile
                  </Link>
                </VStack>
              </HStack>
            </Box>

            <Box
              p={6}
              borderRadius="lg"
              bg={currentColors.bg}
              boxShadow="md"
              _hover={{ transform: 'translateY(-5px)', boxShadow: 'lg' }}
              transition="all 0.3s"
            >
              <HStack gap={6} align="start">
                <Image
                  src="https://i.postimg.cc/HnpsY4xb/ketchupanezz-Rss.png"
                  alt="Ketchupanezz"
                  boxSize="150px"
                  borderRadius="full"
                  objectFit="cover"
                />
                <VStack align="start" gap={3} flex={1}>
                  <Heading as="h2" size="lg" color={currentColors.text}>
                    Sokalava Iryna
                  </Heading>
                  <Text color={currentColors.text}>Frontend Developer</Text>
                  <Text color={currentColors.text}>
                    From despising Pascal to embracing JavaScript – a programmer
                    who reinvented themselves as a frontend developer. Combines
                    academic computer science knowledge with practical web
                    development skills acquired through RSS courses.
                  </Text>
                  <Text color={currentColors.text}>
                    Contribution: Overall app design, home page, registration,
                    API completion, product cards and detailed product
                    information, about us page, tests.
                  </Text>
                  <Link
                    href="https://github.com/ketchupanezz"
                    target="_blank"
                    rel="noopener noreferrer"
                    color="blue.500"
                    _hover={{ textDecoration: 'underline' }}
                  >
                    GitHub Profile
                  </Link>
                </VStack>
              </HStack>
            </Box>
          </VStack>
        </Box>

        <Box mt={8}>
          <Heading as="h2" size="lg" mb={4} color={currentColors.text}>
            Our Collaboration
          </Heading>
          <VStack
            align="start"
            gap={4}
            color={currentColors.text}
            fontSize="lg"
          >
            <Text>
              Our team implemented a structured workflow to ensure smooth
              project project execution. The team leader created a Kanban board
              StriveApp, where all tasks were clearly defined. Team members
              selected tasks from the board, ensuring transparency of
              responsibilities and progress.
            </Text>

            <Text>
              For smooth communication, we created a dedicated Discord channel
              for:
            </Text>
            <Box pl={6}>
              <Text>• Discussing current tasks</Text>
              <Text>• Quick problem-solving sessions</Text>
              <Text>
                • Voice calls to clarify requirements and remove obstacles
              </Text>
            </Box>

            <Text>
              When working on interrelated tasks, team members often used
              private private Discord chats for focused discussions. This
              prevented general announcements from getting lost in conversations
              specific tasks.
            </Text>

            <Text>Our code review process was rigorous:</Text>
            <Box pl={6}>
              <Text>
                • All pull requests required approval from every team member
              </Text>
              <Text>
                • Comments with suggestions for improvement were provided
              </Text>
              <Text>
                • We maintained high code quality through collaborative reviews
              </Text>
            </Box>

            <Text>
              This multi-channel approach to communication and strict quality
              control allowed us to create a successful product and strengthen
              teamwork.
            </Text>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
}
