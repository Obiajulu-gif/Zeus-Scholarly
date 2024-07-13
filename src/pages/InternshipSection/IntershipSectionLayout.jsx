import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaBuilding } from "react-icons/fa"; // Importing icons from react-icons

const InternshipSectionLayout = () => {
	const [countries, setCountries] = useState([]);
	const [internships, setInternships] = useState([]);
	const [discipline, setDiscipline] = useState("");
	const [state, setState] = useState("");
	const [country, setCountry] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	useEffect(() => {
		const cacheKey = "countries";
		const cachedCountries = localStorage.getItem(cacheKey);
		if (cachedCountries) {
			setCountries(JSON.parse(cachedCountries));
			return;
		}

		axios
			.get("https://zeus-scholarly-backend.onrender.com/api/countries")
			.then((response) => {
				if (Array.isArray(response.data)) {
					setCountries(response.data);
					localStorage.setItem(cacheKey, JSON.stringify(response.data));
				} else {
					throw new Error("Invalid data received for countries");
				}
			})
			.catch((error) => {
				console.error("Error fetching the countries:", error);
				setError("Error fetching countries");
			});
	}, []);
	useEffect(() => {
		handleSearch(); // Fetch jobs on component mount
	}, []);
	const handleSearch = () => {
		setLoading(true);
		setError("");

		// Generate a unique cache key based on search parameters
		const cacheKey = `internships-${discipline}-${state}-${country}`;

		// Try to retrieve cached data
		const cachedData = localStorage.getItem(cacheKey);

		if (cachedData) {
			// Parse and use the cached data if available
			setInternships(JSON.parse(cachedData));
			console.log(JSON.parse(cachedData));
			setLoading(false);
		} else {
			// Make API call if no cached data is found
			axios
				.get("https://zeus-scholarly-backend.onrender.com/api/internships", {
					params: {
						discipline,
						state,
						country,
					},
				})
				.then((response) => {
					setInternships(response.data.internships);
					// Cache the fetched data
					localStorage.setItem(
						cacheKey,
						JSON.stringify(response.data.internships)
					);
					console.log(response.data.internships);
					setLoading(false);
				})
				.catch((error) => {
					console.error("Error fetching internships:", error);
					setError("Error fetching internships");
					setLoading(false);
				});
		}
	};

	return (
		<>
			<section className="relative bg-gradient-to-r from-green-400 to-blue-500 text-white">
				<div className="absolute inset-0 bg-black opacity-50"></div>
				<div className="relative container mx-auto px-4 py-24 text-center">
					<h1 className="text-4xl text-white font-bold">
						Internships Kick-Start Your Career
					</h1>
					<p className="mt-4 max-w-2xl mx-auto">
						Search for Internship Opportunity Worldwide.
					</p>
					<div className="mt-8 flex justify-center">
						<div className="flex bg-white rounded-lg overflow-hidden shadow-lg max-w-md w-full">
							<select
								className="block w-1/4 px-4 py-2 text-gray-700 bg-gray-200 border-none focus:outline-none"
								onChange={(e) => setCountry(e.target.value)}
							>
								<option>Select a country</option>
								{countries.map((country, index) => (
									<option key={index} value={country.name}>
										{country.name}
									</option>
								))}
							</select>
							<input
								type="text"
								placeholder="State"
								className="block w-1/4 px-4 py-2 text-gray-700 border-none focus:outline-none"
								onChange={(e) => setState(e.target.value)}
							/>
							<input
								type="text"
								placeholder="Discipline"
								className="block w-1/4 px-4 py-2 text-gray-700 border-none focus:outline-none"
								onChange={(e) => setDiscipline(e.target.value)}
							/>
							<button
								className="px-4 py-2 bg-green-500 text-white"
								onClick={handleSearch}
							>
								{loading ? "Searching..." : "Find Internship"}
							</button>
						</div>
					</div>
				</div>
			</section>

			<section className="container mx-auto px-4 py-8">
				{error && <div className="text-red-500 text-center">{error}</div>}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{internships.map((internship, index) => (
						<div
							key={index}
							className="bg-white p-6 rounded-lg shadow-lg cursor-pointer"
							onClick={() =>
								window.open(internship.related_links[0].link, "_blank")
							}
						>
							<div className="flex items-center mb-4">
								{internship.thumbnail ? (
									<img
										src={internship.thumbnail}
										alt="Thumbnail"
										className="w-16 h-16 mr-4"
									/>
								) : (
									<FaBuilding className="w-16 h-16 mr-4 text-gray-400" />
								)}
								<div>
									<h2 className="text-xl font-semibold">{internship.title}</h2>
									<p className="text-gray-500">{internship.company_name}</p>
									<p className="text-gray-400 text-sm">{internship.location}</p>
								</div>
							</div>
							<p className="mt-2 text-gray-700">
								{internship.description.slice(0, 300)}...
							</p>
							{internship.date && (
								<p className="mt-2 text-gray-500 text-sm">{internship.date}</p>
							)}
							<p className="mt-2 text-gray-500 text-sm">
								{internship.schedule_type}
							</p>
						</div>
					))}
				</div>
			</section>
		</>
	);
};

export default InternshipSectionLayout;
