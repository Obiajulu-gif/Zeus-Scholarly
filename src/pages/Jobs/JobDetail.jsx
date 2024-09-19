import React, { useState } from "react"; // Importing useState hook from React
import { BiWorld } from "react-icons/bi"; // Importing world icon from react-icons
import { MdAccessTime, MdLocationOn } from "react-icons/md"; // Importing access time and location icons from react-icons
import { FaBriefcase, FaBuilding } from "react-icons/fa"; // Importing briefcase and building icons from react-icons

// JobDetail component to show detailed information about a job
const JobDetail = ({ job, onBackClick }) => {
	// Return null if no job is selected
	if (!job) return null;

	// Destructuring job properties for easy access
	const {
		title,
		company_name,
		location,
		via,
		description,
		duration,
		extensions,
		employment_type,
		monthly_income,
		thumbnail,
		related_links,
	} = job;

	const applyLink = related_links[0].link; // Extracting apply link from related_links
	const [time_interval, employment_form] = extensions; // Destructuring extensions for time interval and employment form

	console.log(job); // Logging job data for debugging

	return (
		<div className="bg-white p-2 rounded-lg shadow-md">
			{" "}
			{/* Main container */}
			<button onClick={onBackClick} className="mb-4 sm:p-2 lg:p-6  bg-gray-200 rounded-lg">
				Back to Listings {/* Button to go back to job listings */}
			</button>
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
				<h2 className="sm:text-1xl lg:text-2xl font-bold">{title}</h2> {/* Job title */}
			</div>
			<p className="text-gray-700 mb-1">{company_name}</p> {/* Company name */}
			<div className="flex items-center text-gray-800 mb-2">
				<BiWorld className="mr-2" />
				<strong>{via}</strong> {/* Job via source */}
			</div>
			<div className="flex items-center text-gray-800 mb-2">
				<MdAccessTime className="mr-2" />
				<strong>Duration:</strong> {time_interval} {/* Job duration */}
			</div>
			<p className="flex items-center text-gray-800 mb-2">
				<FaBriefcase className="mr-2" />
				<strong>Employment Type:</strong> {employment_form}{" "}
				{/* Employment type */}
			</p>
			<p className="flex items-center text-gray-800 mb-2">
				<MdLocationOn className="mr-2" />
				<strong>Location:</strong> {location} {/* Job location */}
			</p>
			<a
				href={related_links[0].link} // Apply link
				target="_blank"
				rel="noopener noreferrer"
				className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:-translate-y-1"
			>
				Apply {/* Apply button */}
			</a>
			<h3 className="text-xl font-bold mt-4 mb-2">Job Description</h3>{" "}
			{/* Job description header */}
			<div className="mx-auto my-5 border-gray-200 rounded-lg shadow-sm">
				<pre
					className="whitespace-pre-wrap break-words bg-white sm:text-2xl border-gray-200 rounded-lg text-base leading-relaxed text-justify"
					style={{ fontFamily: "Poppins, Courier, monospace" }}
				>
					{description} {/* Job description */}
				</pre>
			</div>
		</div>
	);
};

export default JobDetail;
