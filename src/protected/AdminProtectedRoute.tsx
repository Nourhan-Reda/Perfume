import { Navigate } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}

const AdminProtectedRoute = ({ children }: Props) => {
  const storedUser = sessionStorage.getItem("vyra_user");

  if (!storedUser) {
    return <Navigate to="/auth" replace />;
  }

  const user = JSON.parse(storedUser);

  if (user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminProtectedRoute;