import { Navigate } from "react-router-dom";

type Props = {
    children: React.ReactNode;
};

export default function UserRoute({ children }: Props) {
    const storedUser = sessionStorage.getItem("vyra_user");

    if (!storedUser) {
        return children;
    }

    const user = JSON.parse(storedUser);

    if (user.role === "admin") {
        return <Navigate to="/admin" replace />;
    }

    return children;
}