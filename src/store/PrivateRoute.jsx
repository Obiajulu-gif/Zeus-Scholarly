import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UsersContext } from "./AuthProvider";

const PrivateRoute = ({ children }) => {
	const { user } = useContext(UsersContext);

	if (!user) {
		return <Navigate to="/login" />;
	}

	return children;
};

export default PrivateRoute;
