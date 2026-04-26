import { Navigate } from "react-router-dom";

type Props = {
  children: React.ReactNode;
};

export default function ProtectedRoute({ children }: Props) {
  const user = sessionStorage.getItem("vyra_user");

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return children;
}