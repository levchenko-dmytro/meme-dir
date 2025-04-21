import axios from "axios";

const BASE_URL = "https://memes-backend-production.up.railway.app/api/memes"; // бекенд

export async function getMemes() {
  const response = await axios.get(BASE_URL);
  return response.data;
}

export async function updateMeme(id: number, updatedFields: Partial<Meme>) {
  const response = await axios.put(`${BASE_URL}/${id}`, updatedFields);
  return response.data;
}

// Типізація
export interface Meme {
  id: number;
  title: string;
  image: string;
  likes: number;
}
