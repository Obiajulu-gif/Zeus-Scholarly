import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar"; // Assuming you have a NavBar component
import HomeLayout from "./pages/Home/HomeLayout"; // Assuming you have a HomeLayout component
import Footer from "./components/Footer";
import "./index.css";
import ScholarshipLayout from "./pages/ScholarshipSection/ScholarshipLayout";
import ExclusiveSectionLayout from "./pages/ExclusiveSection/ExclusiveSectionLayout";
import IntershipSectionLayout from "./pages/InternshipSection/IntershipSectionLayout";
import ResearchGrantLayout from "./pages/ResearchGrantSection/ResearchGrantLayout";
import Login from "../src/store/Login";
import Signup from "../src/store/Signup";
import PrivateRoute from "../src/store/PrivateRoute";
import { AuthContextProvider } from "./store/AuthProvider";
const App = () => {
	return (
		<AuthContextProvider>
			<NavBar />
			<Routes>
				{/* Render only when the user is login */}
				{/* <Route element={<PrivateRoute />}>
				</Route> */}
				<Route path="/exclusive" element={<ExclusiveSectionLayout />} />
				<Route path="/" element={<HomeLayout />} />
				<Route path="/scholarships" element={<ScholarshipLayout />} />
				{/* <Route path="/internship" element={<InternshipSectionLayout />} />
						<Route path="/researchgrant" element={<ResearchGrantLayout />} /> */}
				<Route path="/login" element={<Login />} />
				<Route path="/signup" element={<Signup />} />
			</Routes>
			<Footer />
		</AuthContextProvider>
	);
};

export default App;
