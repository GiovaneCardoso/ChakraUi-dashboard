import { api } from "../services/api";
import { useQuery, UseQueryOptions } from "react-query";

export interface User {
  name: string;
  email: string;
  created_at: string;
  id: string;
}
export type GetUserReturn = {
  totalCount: number;
  users: User[];
};

export async function getUsers(page: number): Promise<GetUserReturn> {
  const { data, headers } = await api.get("users", {
    params: {
      page: page.toString(),
    },
  });
  const totalCount = Number(headers["x-total-count"]) || 200;

  const users: User[] = data.users.map((user: User) => {
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

  return {
    users,
    totalCount,
  };
}
export function useUsers(page: number, options?: UseQueryOptions) {
  return useQuery(["users", page], () => getUsers(page), {
    staleTime: 1000 * 5,
    ...options,
  });
}
