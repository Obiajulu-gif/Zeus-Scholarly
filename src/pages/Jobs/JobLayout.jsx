import React, { useState, useEffect } from "react"; // Importing necessary hooks from React
import JobPreview from "./JobPreview"; // Importing JobPreview component
import JobDetail from "./JobDetail"; // Importing JobDetail component
import { FaSearch, FaMapMarkerAlt } from "react-icons/fa"; // Importing search and location icons from react-icons

const jobCache = {}; // An object to cache job data

const JobLayout = () => {
	const [jobs, setJobs] = useState([]); // State to store job listings
	const [loading, setLoading] = useState(true); // State to manage loading state
	const [title, setTitle] = useState("software developer"); // State to store job title for search
	const [location, setLocation] = useState("nigeria"); // State to store location for search
	const [selectedJob, setSelectedJob] = useState(null); // State to store the selected job for detail view

	// useEffect to fetch jobs when the component mounts
	useEffect(() => {
		fetchJobs(); // Fetch jobs on component mount
	}, []);

	// Function to fetch jobs from API or cache
	const fetchJobs = async () => {
		const cacheKey = `${title}-${location}`; // Cache key based on title and location
		// Check if the data is in localStorage
		const cachedJobs = localStorage.getItem(cacheKey);
		if (cachedJobs) {
			setJobs(JSON.parse(cachedJobs)); // Set jobs from cache if available
			setLoading(false); // Set loading to false since data is loaded
			return;
		}

		try {
			const response = await fetch(
				`https://zeus-scholarly-backend.onrender.com/api/jobs?title=${title}&location=${location}`
			); // Fetch jobs from API
			const data = await response.json(); // Parse response data
			setJobs(data.jobs); // Set jobs state with fetched data
			setLoading(false); // Set loading to false after data is loaded
			// Store the fetched data in localStorage
			localStorage.setItem(cacheKey, JSON.stringify(data.jobs));
		} catch (error) {
			console.error("Error fetching jobs:", error);
			setLoading(false); // Set loading to false if there's an error
		}
	};

	// Function to handle search button click
	const handleSearch = () => {
		setLoading(true); // Set loading to true before fetching new data
		fetchJobs(); // Fetch jobs based on new title and location
	};

	// Function to handle job click to show job details
	const handleJobClick = (job) => {
		setSelectedJob(job); // Set the selected job for detail view
	};

	// Function to handle back button click in job details view
	const handleBackClick = () => {
		setSelectedJob(null); // Reset selected job to null to go back to job listings
	};

	return (
		<div className="min-h-screen bg-gray-100 p-4">
			<div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
				<h1 className="text-2xl font-bold mb-4">Job Listings</h1>
				<div className="flex mb-4">
					<div className="flex-grow relative">
						<FaSearch className="absolute left-3 top-3 text-gray-400" />
						<input
							type="text"
							className="w-full p-2 pl-10 border border-gray-300 rounded-l-lg"
							placeholder="Job Title"
							value={title}
							onChange={(e) => setTitle(e.target.value)} // Update title state on input change
						/>
					</div>
					<div className="flex-grow relative">
						<FaMapMarkerAlt className="absolute left-3 top-3 text-gray-400" />
						<input
							type="text"
							className="w-full p-2 pl-10 border border-gray-300 rounded-r-lg"
							placeholder="Location"
							value={location}
							onChange={(e) => setLocation(e.target.value)} // Update location state on input change
						/>
					</div>
					<button
						onClick={handleSearch} // Trigger job search on button click
						className="ml-2 p-2 bg-blue-500 text-white rounded-lg"
					>
						Search
					</button>
				</div>
				{loading ? (
					<p>Loading...</p> // Show loading message if data is still loading
				) : selectedJob ? (
					<JobDetail job={selectedJob} onBackClick={handleBackClick} /> // Show job detail view if a job is selected
				) : (
					<div className="grid gap-4">
						{jobs.map((job) => (
							<JobPreview
								key={job.job_id} // Unique key for each job
								job={job}
								onClick={() => handleJobClick(job)} // Set the selected job on click
							/>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default JobLayout;
