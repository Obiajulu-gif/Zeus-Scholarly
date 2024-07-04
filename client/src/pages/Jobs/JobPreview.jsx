import React from "react";
import { FaBriefcase, FaMapMarkerAlt, FaBuilding } from "react-icons/fa";

const JobPreview = ({ job, onClick }) => {
	const {
		title,
		company_name,
		location,
		via,
		description,
		thumbnail,
	} = job;

	return (
		<div
			className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
			onClick={onClick}
		>
			<div className="flex items-center mb-2">
				{thumbnail ? (
					<img
						src={thumbnail}
						alt="Thumbnail"
						className="w-16 h-16 mr-4 rounded-full object-cover"
					/>
				) : (
					<FaBuilding className="w-16 h-16 mr-4 text-gray-400" />
				)}
				<h2 className="text-2xl font-bold">{title}</h2>
			</div>
			<p className="text-gray-700 mb-1">
				<FaBriefcase className="inline mr-1" />
				{company_name}
			</p>
			<p className="text-gray-600 mb-1">
				<FaMapMarkerAlt className="inline mr-1" />
				{location}
			</p>
			<p className="text-gray-500 mb-2">{via}</p>
			<p className="text-gray-600">
				{description ? description.slice(0, 100) : "No description available"}
				...
			</p>
		</div>
	);
};

export default JobPreview;
