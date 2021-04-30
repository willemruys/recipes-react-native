import axios from "axios";
import { SERVER_ENDPOINT } from "@env";

/**
 *
 * @param {*} jwt
 * @param {*} body {title: string, description: string}
 * @returns
 */
export const createList = async (jwt, body) => {
  const url = `${SERVER_ENDPOINT}/list`;

  const res = await axios.post(url, body, {
    headers: {
      Authorization: `Bearer ${jwt}`,
      "Content-Type": "application/json",
    },
  });
  return res;
};

export const addRecipeToList = async (jwt, listId, recipeId) => {
  const url = `${SERVER_ENDPOINT}list/${listId}/recipe/${recipeId}`;

  const res = await axios.post(url, null, {
    headers: {
      Authorization: `Bearer ${jwt}`,
      "Content-Type": "application/json",
    },
  });

  return res;
};
