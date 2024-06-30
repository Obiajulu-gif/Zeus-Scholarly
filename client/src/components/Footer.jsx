import React from "react";
import {
	FaFacebookF,
	FaInstagram,
	FaTwitter,
	FaGithub,
	FaYoutube,
} from "react-icons/fa";

const Footer = () => {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="bg-white py-6 sm:py-3 border-t border-gray-200">
			<div className="container mx-auto px-4">
				<div className="flex flex-col  md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
					<div className="flex flex-row items-center justify-between space-x-4">
						<a href="#" className="text-gray-600 hover:text-gray-900">
							About
						</a>
						<a href="#" className="text-gray-600 hover:text-gray-900">
							Blog
						</a>
						<a href="#" className="text-gray-600 hover:text-gray-900">
							Jobs
						</a>
					</div>
					<div className="flex space-x-4">
						<a
							href="#"
							aria-label="Facebook"
							className="text-gray-600 hover:text-gray-900"
						>
							<FaFacebookF className="h-6 w-6" />
						</a>
						<a
							href="#"
							aria-label="Instagram"
							className="text-gray-600 hover:text-gray-900"
						>
							<FaInstagram className="h-6 w-6" />
						</a>
						<a
							href="#"
							aria-label="Twitter"
							className="text-gray-600 hover:text-gray-900"
						>
							<FaTwitter className="h-6 w-6" />
						</a>
						<a
							href="#"
							aria-label="GitHub"
							className="text-gray-600 hover:text-gray-900"
						>
							<FaGithub className="h-6 w-6" />
						</a>
						<a
							href="#"
							aria-label="YouTube"
							className="text-gray-600 hover:text-gray-900"
						>
							<FaYoutube className="h-6 w-6" />
						</a>
					</div>
				</div>
				<div className="mt-4 text-center text-gray-500 text-sm">
					&copy; {currentYear} Your Company, Inc. All rights reserved.
				</div>
			</div>
		</footer>
	);
};

export default Footer;
