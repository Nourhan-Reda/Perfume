import axios from "axios";
import type { PerfumeProduct } from "../types/main";

// IMPORTANT: Do NOT include /Perfume in the Base URL if you want to use modular calls
const MOCK_API_BASE = "https://690e4923bd0fefc30a040b18.mockapi.io";

export const fetchAllPerfumes = async (): Promise<PerfumeProduct[]> => {
  try {
    // We add the resource name /Perfume here
    const response = await axios.get(`${MOCK_API_BASE}/Perfume`);

    // Log this to your browser console to see what MockAPI is actually sending
    console.log("MockAPI Response:", response.data);

    return response.data;
  } catch (error) {
    console.error("Error fetching from MockAPI:", error);
    throw error;
  }
};
