import axios from "axios";
import Error from "../components/Error";

const baseUrl = "https://650bdced47af3fd22f6697e9.mockapi.io/items";

// Fetch items from the API based on page and limit
export const fetchItems = async (page, limit) => {
  try {
    const response = await axios.get(`${baseUrl}?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};
