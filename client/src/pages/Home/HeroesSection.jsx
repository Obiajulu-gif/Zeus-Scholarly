import React from "react";
import image1 from "../../assets/pexels-expressivestanley-1454360.jpg";
import image2 from "../../assets/pexels-pixabay-207692.jpg";
import image3 from "../../assets/pexels-polina-zimmerman-3747505.jpg";
import image4 from "../../assets/pexels-teona-swift-6913721.jpg";
import mobileBg from "../../assets/pexels-teona-swift-6913721.jpg";

const Hero = () => {
	return (
		<div className="relative bg-w py-9 sm:py-30 lg:py-15">
			<div className="absolute inset-0 lg:hidden">
				<img
					src={mobileBg}
					alt="Background"
					className="w-full h-full object-cover"
				/>
				<div className="absolute inset-0 bg-gray-900 opacity-50"></div>{" "}
				{/* Changed to dark color */}
			</div>
			<div className="relative max-w-7xl mx-auto px-4 sm:px-15 lg:px-8">
				<div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
					<div className="relative text-left z-10">
						<div className="absolute inset-0 hidden lg:block">
							<div className="absolute inset-0 opacity-50"></div>
						</div>
						<div className="relative">
							<h1 className="text-3xl sm:p-30 sm:mt-8  font-bold lg:text-gray-900 sm:text-blue-400 sm:text-yellow sm:text-7xl lg:text-5xl xl:text-6xl">
								Zeus Scholarly
							</h1>
							<h2 className="mt-2 text-xl lg:text-indigo-600 sm:text-indigo-200 sm:mt-4 sm:text-2xl lg:text-3xl xl:text-4xl">
								Empowering Scholars Worldwide
							</h2>
							<p className="mt-4 text-white lg:text-gray-700 sm:text-white-700 sm:mt-6 lg:text-lg">
								Lightning-Fast Support for gaining scholarship based on
								Artificial intelligence recommendation system.
							</p>
							<div className="mt-8 sm:mt-12 sm:flex">
								<div className="rounded-md shadow">
									<a
										href="#"
										className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
									>
										Get started
									</a>
								</div>
								<div className="mt-3 sm:mt-0 sm:ml-3">
									<a
										href="#"
										className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
									>
										Sign Up
									</a>
								</div>
							</div>
						</div>
					</div>
					<div className="hidden lg:block mt-10 lg:mt-0">
						<div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-2">
							{[image1, image2, image3, image4].map((image, index) => (
								<div key={index} className="relative">
									<img
										src={image}
										alt={`Image ${index + 1}`}
										className="w-full h-full object-cover rounded-lg"
									/>
									<div className="absolute inset-0 bg-gray-900 opacity-50 rounded-lg"></div>{" "}
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
