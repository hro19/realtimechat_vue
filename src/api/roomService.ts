import axios from "axios";

export async function getAllRooms() {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/rooms`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
