import { api } from "../services/api";
import { useQuery } from "react-query";
import { User } from "../pages/users";
async function getUsers(): Promise<User[]> {
  const { data } = await api.get("users");
  const users = data.users.map((user: User) => {
    return {
      name: user.name,
      email: user.email,
      created_at: new Date(user.created_at).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
      id: user.id,
    };
  });

  return users;
}
export function useUsers() {
  return useQuery("users", getUsers, {
    staleTime: 1000 * 5,
  });
}
