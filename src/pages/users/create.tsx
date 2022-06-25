import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import { Input } from "../../components/Form/Input";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { api } from "../../services/api";
import { queryClient } from "../../services/queryClient";
import { useRouter } from "next/router";

type CreateUserFormData = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

const CreateUserFormSchema = yup.object().shape({
  name: yup.string().required("Nome é obrigatorio"),
  email: yup.string().email("Email inválido").required("Email é obrigatorio"),
  password: yup.string().required("Senha é obrigatoria"),
  password_confirmation: yup
    .string()
    .oneOf([null, yup.ref("password")], "Senhas não conferem"),
});

export default function UserCreate() {
  const createUser = useMutation(
    async (user: CreateUserFormData) => {
      const response = await api.post("users", {
        user: {
          ...user,
          created_at: new Date(),
        },
      });
      return response.data.user;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("users");
      },
    }
  );
  const router = useRouter();
  const { register, formState, handleSubmit } = useForm({
    resolver: yupResolver(CreateUserFormSchema),
  });
  const { errors } = formState;
  const handleCreateUser: SubmitHandler<CreateUserFormData> = async (
    values
  ) => {
    await createUser.mutateAsync(values);
    router.push("/users");
  };

  return (
    <Box>
      <Header />
      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <Box
          as="form"
          flex="1"
          borderRadius={8}
          bg="gray.800"
          p={["6", "8"]}
          onSubmit={handleSubmit(handleCreateUser)}
        >
          <Heading size="lg" fontWeight={"normal"}>
            Criar usuário
          </Heading>
          <Divider my="6" borderColor={"gray.700"} />
          <VStack spacing={8}>
            <SimpleGrid minChildWidth={"240px"} spacing={["6", "8"]} w="100%">
              <Input
                name="name"
                label="Nome completo"
                ref={register}
                {...register("name")}
                error={errors.name}
              />
              <Input
                name="email"
                label="E-mail"
                type="email"
                ref={register}
                {...register("email")}
                error={errors.email}
              />
            </SimpleGrid>
            <SimpleGrid minChildWidth={"240px"} spacing={["6", "8"]} w="100%">
              <Input
                name="password"
                label="Senha"
                type="password"
                ref={register}
                {...register("password")}
                error={errors.password}
              />
              <Input
                name="password_confirmation"
                label="Confirme sua senha"
                type="password"
                ref={register}
                {...register("password_confirmation")}
                error={errors.password_confirmation}
              />
            </SimpleGrid>
          </VStack>
          <Flex mt="8" justify={"flex-end"}>
            <HStack spacing="4">
              <Link href="/users" passHref>
                <Button colorScheme={"whiteAlpha"}>Cancelar</Button>
              </Link>
              <Button
                type="submit"
                colorScheme={"pink"}
                isLoading={formState.isSubmitting}
              >
                Salvar
              </Button>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}
