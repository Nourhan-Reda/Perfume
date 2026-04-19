import axios from "axios";

const BASE_URL =
  "https://690e4923bd0fefc30a040b18.mockapi.io/Perfume";

export interface ApiUser {
  id?: string;
  type?: "user";
  fullName: string;
  email: string;
  phone?: string;
  password: string;
  registeredAt?: string;
}

// ─── Get all users ─────────────────────────────
export const getUsers = async (): Promise<ApiUser[]> => {
  const response = await axios.get(BASE_URL);
  return response.data.filter((item: ApiUser) => item.type === "user");
};

// ─── Register ─────────────────────────────
export const registerUser = async (
  user: ApiUser
): Promise<ApiUser> => {
  const response = await axios.post(BASE_URL, {
    ...user,
    type: "user",
    registeredAt: new Date().toISOString(),
  });

  return response.data;
};

// ─── Login check ─────────────────────────────
export const loginUser = async (
  email: string,
  password: string
): Promise<ApiUser> => {
  const users = await getUsers();

  const foundUser = users.find(
    (u) => u.email === email && u.password === password
  );

  if (!foundUser) {
    throw new Error("Invalid email or password");
  }

  return foundUser;
};