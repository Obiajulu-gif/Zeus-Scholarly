import React, { useState } from "react";
import { BiWorld } from "react-icons/bi";
import { MdAccessTime, MdLocationOn } from "react-icons/md";
import { FaBriefcase, FaBuilding } from "react-icons/fa";

const JobDetail = ({ job, onBackClick }) => {
	if (!job) return null;

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
	const applyLink = related_links[0].link;
	const [time_interval, employment_form] = extensions;

	console.log(job);
	return (
		<div className="bg-white p-6 rounded-lg shadow-md">
			<button onClick={onBackClick} className="mb-4 p-2 bg-gray-200 rounded-lg">
				Back to Listings
			</button>
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
			<p className="text-gray-700 mb-1">{company_name}</p>
			<div className="flex items-center text-gray-500 mb-2">
				<BiWorld className="mr-2" />
				<strong>{via}</strong>
			</div>
			<div className="flex items-center text-gray-500 mb-2">
				<MdAccessTime className="mr-2" />
				<strong>Duration:</strong> {time_interval}
			</div>
			<p className="flex items-center text-gray-500 mb-2">
				<FaBriefcase className="mr-2" />
				<strong>Employment Type:</strong> {employment_form}
			</p>
			<p className="flex items-center text-gray-500 mb-2">
				<MdLocationOn className="mr-2" />
				<strong>Location:</strong> {location}
			</p>

			<a
				href={related_links[0].link}
				target="_blank"
				rel="noopener noreferrer"
				className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:-translate-y-1"
			>
				Apply
			</a>
			<h3 className="text-xl font-bold mt-4 mb-2">Job Description</h3>
			<div className="max-w-2xl mx-auto my-5 p-2 bg-gray-50 border border-gray-200 rounded-lg shadow-sm">
				<pre className="whitespace-pre-wrap break-words bg-white p-4 border border-gray-200 rounded-lg text-base leading-relaxed text-justify">
					{description}
				</pre>
			</div>
		</div>
	);
};

export default JobDetail;
