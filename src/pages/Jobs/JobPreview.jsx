import React from "react"; // Importing React
import { FaBriefcase, FaMapMarkerAlt, FaBuilding } from "react-icons/fa"; // Importing icons from react-icons

// JobPreview component to display a brief overview of a job
const JobPreview = ({ job, onClick }) => {
	// Destructuring job properties for easy access
	const { title, company_name, location, via, description, thumbnail } = job;

	return (
		<div
			className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
			onClick={onClick} // Handle click event to select the job
		>
			<div className="flex items-center mb-2">
				{thumbnail ? ( // Display thumbnail if available, otherwise show building icon
					<img
						src={thumbnail}
						alt="Thumbnail"
						className="w-16 h-16 mr-4 rounded-full object-cover"
					/>
				) : (
					<FaBuilding className="w-16 h-16 mr-4 text-gray-400" />
				)}
				<h2 className="text-2xl font-bold">{title}</h2> {/* Job title */}
			</div>
			<p className="text-gray-700 mb-1">
				<FaBriefcase className="inline mr-1" /> {/* Briefcase icon */}
				{company_name} {/* Company name */}
			</p>
			<p className="text-gray-600 mb-1">
				<FaMapMarkerAlt className="inline mr-1" /> {/* Location icon */}
				{location} {/* Job location */}
			</p>
			<p className="text-gray-500 mb-2">{via}</p> {/* Job via source */}
			<p className="text-gray-600">
				{/* Job description snippet (first 100 characters) */}
				{description ? description.slice(0, 100) : "No description available"}
				...
			</p>
		</div>
	);
};

export default JobPreview; // Exporting JobPreview component
