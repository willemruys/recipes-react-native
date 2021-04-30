import useSWR from "swr";
import { SERVER_ENDPOINT } from "@env";
const userRecipesFetcher = (...args) =>
  fetch(...args).then((res) => res.json());

export const useUserRecipes = (userId) => {
  const url = `${SERVER_ENDPOINT}/user/${userId}/recipes`;

  const { data, error } = useSWR(url, userRecipesFetcher);

  return {
    data: data,
    error: error,
  };
};
