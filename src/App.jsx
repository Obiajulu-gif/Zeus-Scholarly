import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import LoadingSpinner from "./components/LoadingSpinner"
import HomeLayout from "./pages/Home/HomeLayout"; // Direct import
import "./index.css";
import PrivateRoute from "../src/store/PrivateRoute";
import { AuthContextProvider } from "./store/AuthProvider";

// Lazy loading components
const ScholarshipLayout = lazy(() =>
	import("./pages/ScholarshipSection/ScholarshipLayout")
);
const ExclusiveSectionLayout = lazy(() =>
	import("./pages/ExclusiveSection/ExclusiveSectionLayout")
);
const IntershipSectionLayout = lazy(() =>
	import("./pages/InternshipSection/IntershipSectionLayout")
);
const ResearchGrantLayout = lazy(() =>
	import("./pages/ResearchGrantSection/ResearchGrantLayout")
);
const Login = lazy(() => import("../src/store/Login"));
const Signup = lazy(() => import("../src/store/Signup"));

const App = () => {
	return (
		<AuthContextProvider>
			<NavBar />
			<Suspense fallback={<LoadingSpinner/>}>
				<Routes>
					<Route path="/" element={<HomeLayout />} />
					<Route path="/scholarships" element={<ScholarshipLayout />} />
					<Route
						path="/exclusive"
						element={
							<PrivateRoute>
								<ExclusiveSectionLayout />
							</PrivateRoute>
						}
					/>
					<Route
						path="/internship"
						element={
							<PrivateRoute>
								<IntershipSectionLayout />
							</PrivateRoute>
						}
					/>
					<Route path="/login" element={<Login />} />
					<Route path="/signup" element={<Signup />} />
				</Routes>
			</Suspense>
			<Footer />
		</AuthContextProvider>
	);
};

export default App;
