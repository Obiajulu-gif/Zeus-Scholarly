import React from "react";
import dealsImage from "../../assets/undraw_education.svg";

const InfoSection = () => {
	return (
		<div className="min-h-screen bg-gray-100 py-8 px-8">
			<div className="max-w-7xl mx-auto text-center md:text-left md:flex md:items-center">
				<div className="md:w-1/2">
					<h1 className="text-4xl font-bold text-blue-600">Zeus Scholarly</h1>
					<p className="mt-2 text-xl text-gray-700">
						Empowering Scholars Worldwide
					</p>
					<p className="mt-4 text-lg text-gray-600">
						Access Student Deals, Discounts, and Resources
					</p>
					<p className="mt-2 text-md text-gray-600">
						Save time, money, and energy with AI-powered scholarship
						recommendations.
					</p>
					<button className="mt-6 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
						Access Deals
					</button>
				</div>
				<div className="md:w-1/2 mt-8 md:mt-0 md:pl-8 flex justify-center md:block hidden">
					<img
						src={dealsImage}
						alt="Deals"
						className="rounded-lg w-3/4 md:w-full"
					/>
				</div>
			</div>
			<div className="max-w-7xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
				<div className="bg-white shadow-lg rounded-lg p-6 text-center">
					<p className="text-2xl font-bold text-blue-600">$150</p>
					<p className="text-lg text-gray-700">Off Services</p>
				</div>
				<div className="bg-white shadow-lg rounded-lg p-6 text-center">
					<p className="text-2xl font-bold text-blue-600">25%</p>
					<p className="text-lg text-gray-700">Off Subscriptions</p>
				</div>
				<div className="bg-white shadow-lg rounded-lg p-6 text-center">
					<p className="text-2xl font-bold text-blue-600">$25</p>
					<p className="text-lg text-gray-700">For Investing</p>
				</div>
				<div className="bg-white shadow-lg rounded-lg p-6 text-center">
					<p className="text-2xl font-bold text-blue-600">FREE</p>
					<p className="text-lg text-gray-700">Consultation</p>
				</div>
			</div>
		</div>
	);
};

export default InfoSection;
