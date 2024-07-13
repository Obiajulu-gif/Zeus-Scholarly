import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UsersContext } from "./AuthProvider";
import Cookies from "js-cookie";
import { MdEmail, MdLock } from "react-icons/md"; // Importing email and lock icons

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { signInUser } = useContext(UsersContext);
	const navigate = useNavigate();

	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			await signInUser(email, password);
			setEmail("");
			setPassword("");
			Cookies.set("user", email, { path: "/" });
			navigate("/");
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className="flex items-center justify-center min-h-screen bg-blue-100">
			<div className="px-8 py-6 mt-4 text-left bg-white shadow-lg">
				<h3 className="text-2xl font-bold text-center">
					Login to your account
				</h3>
				<form onSubmit={handleLogin}>
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
						<div className="flex items-baseline justify-between">
							<button className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900">
								Login
							</button>
							<p className="mt-4">
								<Link
									to="/signup"
									className="text-sm text-blue-600 hover:underline"
								>
									Don't have an account? Sign up
								</Link>
							</p>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Login;
