import { api } from "../../../services/api";
import { getUserSession, saveUserSession } from "../utils/session";

export function useEditProfile() {
  const handleSave = async (
    name: string,
    email: string,
    newPassword?: string,
    currentPassword?: string
  ): Promise<void> => {
    const current = getUserSession();
    if (!current) throw new Error("No user session found");

    if (newPassword && currentPassword) {
      const res = await api.get("");
      const users = res.data;
      const dbUser = users.find(
        (u: { id: string; password: string }) => u.id === current.id
      );

      if (!dbUser || dbUser.password !== currentPassword) {
        throw new Error("Current password is incorrect.");
      }
    }

    const updatedData = {
      ...current,
      fullName: name,
      email,
      ...(newPassword ? { password: newPassword } : {}),
    };

    await api.put(`/${current.id}`, updatedData);

    saveUserSession({
      ...current,
      fullName: name,
      email,
    });
  };

  return { handleSave };
}