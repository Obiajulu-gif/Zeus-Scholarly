import React, { useState, useEffect } from "react";
import JobPreview from "./JobPreview";
import JobDetail from "./JobDetail";
import { FaSearch, FaMapMarkerAlt } from "react-icons/fa";
const jobCache = {};

const JobLayout = () => {
	const [jobs, setJobs] = useState([]);
	const [loading, setLoading] = useState(true);
	const [title, setTitle] = useState("software developer");
	const [location, setLocation] = useState("nigeria");
	const [selectedJob, setSelectedJob] = useState(null);

	useEffect(() => {
		fetchJobs();
	}, []);

	const fetchJobs = async () => {
		const cacheKey = `${title}-${location}`;
		// Check if the data is in localStorage
		const cachedJobs = localStorage.getItem(cacheKey);
		if (cachedJobs) {
			setJobs(JSON.parse(cachedJobs));
			setLoading(false);
			return;
        }
        
		try {
			const response = await fetch(
				`https://zeus-scholarly-backend.onrender.com/api/jobs?title=${title}&location=${location}`
			);
			const data = await response.json();
			setJobs(data.jobs);
			setLoading(false);
			// Store the fetched data in localStorage
			localStorage.setItem(cacheKey, JSON.stringify(data.jobs));
		} catch (error) {
			console.error("Error fetching jobs:", error);
			setLoading(false);
		}
	};

	const handleSearch = () => {
		setLoading(true);
		fetchJobs();
	};

	const handleJobClick = (job) => {
		setSelectedJob(job);
	};

	const handleBackClick = () => {
		setSelectedJob(null);
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
							onChange={(e) => setTitle(e.target.value)}
						/>
					</div>
					<div className="flex-grow relative">
						<FaMapMarkerAlt className="absolute left-3 top-3 text-gray-400" />
						<input
							type="text"
							className="w-full p-2 pl-10 border border-gray-300 rounded-r-lg"
							placeholder="Location"
							value={location}
							onChange={(e) => setLocation(e.target.value)}
						/>
					</div>
					<button
						onClick={handleSearch}
						className="ml-2 p-2 bg-blue-500 text-white rounded-lg"
					>
						Search
					</button>
				</div>
				{loading ? (
					<p>Loading...</p>
				) : selectedJob ? (
					<JobDetail job={selectedJob} onBackClick={handleBackClick} />
				) : (
					<div className="grid gap-4">
						{jobs.map((job) => (
							<JobPreview
								key={job.job_id}
								job={job}
								onClick={() => handleJobClick(job)}
							/>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default JobLayout;
