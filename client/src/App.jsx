import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import HomeLayout from "./pages/Home/HomeLayout";
import Footer from "./components/Footer";
import "./index.css";
import ScholarshipLayout from "./pages/ScholarshipSection/ScholarshipLayout";
import ExclusiveSectionLayout from "./pages/ExclusiveSection/ExclusiveSectionLayout";
import IntershipSectionLayout from "./pages/InternshipSection/IntershipSectionLayout";
import ResearchGrantLayout from "./pages/ResearchGrantSection/ResearchGrantLayout";

const App = () => {
	return (
		<div>
			<NavBar />
			<Routes>
				<Route path="/" element={<HomeLayout />} />
				<Route path="/scholarships" element={<ScholarshipLayout />} />
				<Route path="/exclusive" element={<ExclusiveSectionLayout />} />
				<Route path="/internship" element={<IntershipSectionLayout />} />
				<Route path="/researchgrant" element={<ResearchGrantLayout />} />
				{/* <Route path="*" element={<NotFound />}></Route> */}
			</Routes>
			<Footer />
		</div>
	);
};
export default App;
