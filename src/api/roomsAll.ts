import axios from "axios";

export function fetchChatRooms() {
  return axios.get(`${import.meta.env.VITE_API_URL}/rooms`).then((res) => res.data);
}
