import React from "react";
import image1 from "../../assets/pexels-expressivestanley-1454360.jpg";
import image2 from "../../assets/pexels-pixabay-207692.jpg";
import image3 from "../../assets/pexels-polina-zimmerman-3747505.jpg";
import image4 from "../../assets/pexels-teona-swift-6913721.jpg";
import mobileBg from "../../assets/pexels-teona-swift-6913721.jpg";
import { FaRocket, FaUserPlus } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { UsersContext } from "../../store/AuthProvider";
const Hero = () => {
	const { user, logout } = useContext(UsersContext);

	return (
		<div className="relative bg-blue-100 py-6 sm:py-24 lg:py-3">
			<div className="absolute inset-0 lg:hidden">
				<img
					src={mobileBg}
					alt="Background"
					className="w-full h-full object-cover opacity-70"
				/>
				<div className="absolute inset-0 bg-blue-200 opacity-20"></div>
			</div>
			<div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
				<div className="lg:grid lg:grid-cols-2 lg:gap-24 lg:items-center">
					<div className="relative text-left z-10 lg:w-3/3 ">
						<h1 className="text-5xl font-extrabold sm:text-blue-100  lg:text-gray-900 sm:text-2xl lg:text-6xl drop-shadow-lg animate-fade-in">
							Zeus Scholarly
						</h1>
						<h2 className="mt-4 text-2xl  sm:text-indigo-900 lg:text-indigo-600 sm:text-3xl lg:text-4xl animate-fade-in">
							Empowering Scholars Worldwide
						</h2>
						<p className="mt-6 text-lg  lg:text-gray-700  sm:text-xl lg:text-2xl animate-fade-in ">
							Lightning-Fast Support for gaining scholarships based on our
							Artificial Intelligence recommendation system...
						</p>
						<div className="mt-8 sm:mt-12 sm:flex space-y-4 sm:space-y-0 sm:space-x-4 animate-slide-in">
							<div className="rounded-md shadow">
								<NavLink
									to="/scholarships"
									className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition duration-300 ease-in-out transform hover:-translate-y-1 md:py-4 md:text-lg md:px-10"
								>
									<FaRocket className="mr-2" /> Get Started
								</NavLink>
							</div>
							{!user && (
								<div className="rounded-md shadow">
									<NavLink
										to="/signup"
										className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-100 transition duration-300 ease-in-out transform hover:-translate-y-1 md:py-4 md:text-lg md:px-10"
									>
										<FaUserPlus className="mr-2" /> Sign Up
									</NavLink>
								</div>
							)}
						</div>
					</div>
					<div className="hidden lg:block mt-10 lg:mt-0 animate-fade-in">
						<div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-2">
							{[image1, image2, image3, image4].map((image, index) => (
								<div key={index} className="relative group">
									<img
										src={image}
										alt={`Image ${index + 1}`}
										className="w-full h-full object-cover rounded-lg transition duration-300 ease-in-out transform group-hover:scale-105"
									/>
									<div className="absolute inset-0 bg-gray-900 opacity-50 rounded-lg transition duration-300 ease-in-out group-hover:opacity-75"></div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Hero;
