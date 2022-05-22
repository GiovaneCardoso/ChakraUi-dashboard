import { Flex, Input, Text, Icon, Stack, Box, Avatar } from "@chakra-ui/react";
import {
  RiNotificationLine,
  RiSearchLine,
  RiUserAddLine,
  RiUserLine,
} from "react-icons/ri";
export function Header() {
  return (
    <Flex
      w="100%"
      as="header"
      maxWidth="1480"
      h="20"
      mx="auto"
      mt="4"
      align="center"
      px="6"
    >
      <Text fontSize="3xl" fontWeight="bold" letterSpacing="tight" w="64">
        dashgo
        <Text color="pink.500" as="span" marginLeft={1}>
          .
        </Text>
      </Text>

      <Flex
        as="label"
        flex="1"
        py="4"
        px="8"
        ml="6"
        maxWidth={400}
        alignSelf="center"
        color="gray.200"
        position="relative"
        bg="gray.800"
        borderRadius="full"
      >
        <Input
          color="gray.50"
          variant="unstyled"
          placeholder="Buscar na plataforma"
          _placeholder={{ color: "gray.400" }}
          px="4"
          mr="4"
        />
        <Icon as={RiSearchLine} fontSize="20" />
      </Flex>
      <Flex align="center" ml="auto">
        <Stack
          spacing="8"
          mx="8"
          pr="8"
          py="1"
          color="gray.300"
          borderRightWidth="1px"
          borderColor="gray.700"
          direction="row"
        >
          <Icon as={RiNotificationLine} fontSize="20" />
          <Icon as={RiUserAddLine} fontSize="20" />
        </Stack>
        <Flex align="center">
          <Box mr="4" textAlign="right">
            <Text>Giovane</Text>
            <Text color="gray.300" fontSize="small">
              meuemail@asdas.com
            </Text>
          </Box>
          <Avatar size="md" name="Giovane Ferreira" />
        </Flex>
      </Flex>
    </Flex>
  );
}
