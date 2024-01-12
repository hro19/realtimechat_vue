import axiosCommon from '../api/axiosCommon';

export async function getAllRooms() {
  try {
    const response = await axiosCommon.get(`${import.meta.env.VITE_API_URL}/rooms`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export function createChatRoom(name:string) {
  return axiosCommon
    .post(`${import.meta.env.VITE_API_URL}/rooms`, { name })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.error(err);
      throw err;
    });
}