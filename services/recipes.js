import axios from "axios";
import { SERVER_ENDPOINT } from "@env";

export const createRecipe = async (jwt, body) => {
  const url = `${SERVER_ENDPOINT}/recipes`;

  const res = await axios.post(url, body, {
    headers: {
      Authorization: `Bearer ${jwt}`,
      "Content-Type": "application/json",
    },
  });
  return res;
};
