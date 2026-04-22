import { Navigate } from "react-router-dom";

type Props = {
  children: React.ReactNode;
};

export default function AuthRoute({ children }: Props) {
  const user = sessionStorage.getItem("vyra_user");

  if (user) {
    return <Navigate to="/" replace />;
  }

  return children;
}