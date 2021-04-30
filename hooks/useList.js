import useSWR from "swr";
import { SERVER_ENDPOINT } from "@env";
const listFetcher = (...args) => fetch(...args).then((res) => res.json());

export const useUserLists = (userId) => {
  const url = `${SERVER_ENDPOINT}/user/${userId}/lists`;

  const { data, error } = useSWR(url, listFetcher);

  return {
    data: data,
    error: error,
  };
};

export const getListById = (listId) => {
  const url = `${SERVER_ENDPOINT}/list/${listId}`;

  const { data, error } = useSWR([url], listFetcher);

  return {
    data: data,
    error: error,
  };
};
