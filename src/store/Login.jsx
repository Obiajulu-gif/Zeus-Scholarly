import { useState } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UsersContext } from "./AuthProvider";
import { useNavigate } from "react-router-dom";
import { MdEmail, MdLock } from "react-icons/md"; // Ensure these are imported
import Cookies from "js-cookie";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState(""); // Add state for error
	const { signInUser, signGoogleAccount } = useContext(UsersContext);
	const navigate = useNavigate();

	const validateInput = (email, password) => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		const passwordRegex =
			/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
		if (!emailRegex.test(email)) {
			return "Invalid email format.";
		}
		if (!passwordRegex.test(password)) {
			return "Password must contain at least one letter, one number, and one special character.";
		}
		return "";
	};

	const handleLogin = async (e) => {
		e.preventDefault();
		const validationError = validateInput(email, password);
		if (validationError) {
			setError(validationError);
			return;
		}
		try {
			await signInUser(email, password);
			setEmail("");
			setPassword("");
			navigate("/");
			Cookies.set("user", email, { expires: 7, path: "/" });
			console.log("Log in");
		} catch (error) {
			console.error(error.message);
			setError(error.message); // Use setError to display error from signInUser
		}
	};

	const handleGoogleLogin = async () => {
		try {
			const result = await signGoogleAccount();
			Cookies.set("user", result.user.email, { expires: 7, path: "/" });
			console.log("Google Account Login");
		} catch (error) {
			console.error(error.message);
			setError(error.message); // Use setError to display error from signGoogleAccount
		}
	};

	return (
		<div className="flex items-center justify-center min-h-screen bg-blue-100">
			<div className="px-8 py-6 mt-4 text-left bg-white shadow-lg">
				<h3 className="text-2xl font-bold text-center">Login</h3>
				<form onSubmit={handleLogin}>
					{" "}
					{/* Changed from handleSignup to handleLogin */}
					<div className="mt-4">
						<div>
							<label className="block" htmlFor="email">
								Email
							</label>
							<div className="flex items-center mt-1">
								<MdEmail className="w-5 h-5 mr-2 text-gray-700" />
								<input
									type="email"
									placeholder="Email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1"
									required
								/>
							</div>
						</div>
						<div className="mt-4">
							<label className="block">Password</label>
							<div className="flex items-center mt-1">
								<MdLock className="w-5 h-5 mr-2 text-gray-700" />
								<input
									type="password"
									placeholder="Password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1"
									required
								/>
							</div>
						</div>
						<div className="flex flex-col items-center space-y-2">
							<button className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900">
								Login
							</button>
							<p className="mt-4">
								<Link
									to="/login"
									className="text-sm text-blue-600 hover:underline"
								>
									Already have an account? Sign in
								</Link>
							</p>
							<button type="button" onClick={handleGoogleLogin} className="px-6 py-2 text-white bg-red-600 rounded-lg hover:bg-red-900">
                            Login with Google
                        </button>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Login;
