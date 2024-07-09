import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaSpinner } from "react-icons/fa"; // For loading spinner
import { IoMdSchool } from "react-icons/io"; // For dummy icon

const ScholarshipLayout = () => {
	const [countries, setCountries] = useState([]);
	const [selectedCountry, setSelectedCountry] = useState("Finland");
	const [scholarships, setScholarships] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [page, setPage] = useState(1);
	const [totalResults, setTotalResults] = useState(0);
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedDegree, setSelectedDegree] = useState("Master");
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
					localStorage.setItem(cacheKey, JSON.stringify(response.data)); // Cache the countries data
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
		const cacheKey = `scholarships-${selectedCountry}-${selectedDegree}-${page}`;
		const cachedData = localStorage.getItem(cacheKey);
		if (cachedData) {
			const parsedData = JSON.parse(cachedData);
			setScholarships(parsedData.scholarships);
			setTotalResults(parsedData.totalResults);
			setLoading(false);
			return;
		}
		if (selectedCountry && selectedDegree) {
			setLoading(true);
			axios
				.get("https://zeus-scholarly-backend.onrender.com/api/scholarships", {
					params: {
						selectedCountry,
						selectedDegree,
						page,
					},
				})
				.then((response) => {
					setLoading(false);
					if (response.data && Array.isArray(response.data.scholarships)) {
						setScholarships(response.data.scholarships);
						setTotalResults(response.data.totalResults || 0);
						// Cache the fetched data
						localStorage.setItem(
							cacheKey,
							JSON.stringify({
								scholarships: response.data.scholarships,
								totalResults: response.data.totalResults || 0,
							})
						);
					} else {
						setScholarships([]);
						setTotalResults(0);
					}
				})
				.catch((error) => {
					setLoading(false);
					console.error("Error fetching scholarships:", error);
					setError("Error fetching scholarships");
					setScholarships([]);
					setTotalResults(0);
				});
		}
	}, [selectedCountry, selectedDegree, page]);

	const handleCountryChange = (e) => {
		setSelectedCountry(e.target.value);
		setPage(1); // Reset to the first page
	};

	const handleDegreeChange = (degree) => {
		setSelectedDegree(degree);
		setIsDropdownOpen(false); // Close the dropdown
	};

	const handlePageChange = (newPage) => {
		setPage(newPage);
	};

	const filteredCountries = countries.filter((country) =>
		country.name.toLowerCase().includes(searchTerm.toLowerCase())
	);

	return (
		<div className="flex flex-col md:flex-row p-4 md:p-20 animate-fade-in">
			<div className="w-full md:w-1/4 mb-4 md:mb-0">
				<div className="mb-4">
					<label
						htmlFor="country-select"
						className="block text-lg font-medium text-gray-700"
					>
						Where will you study?
					</label>
					<input
						type="text"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						placeholder="Search for your location"
						className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
					/>
					<select
						id="country-select"
						value={selectedCountry}
						onChange={handleCountryChange}
						className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
					>
						{filteredCountries.map((country, index) => (
							<option key={index} value={country.name}>
								{country.name}
							</option>
						))}
					</select>
				</div>
				<p className="text-lg font-medium text-gray-700">Degree level</p>
				<div className="relative">
					<button
						className="block w-full text-left md:hidden px-4 py-2 bg-gray-200 rounded-md"
						onClick={() => setIsDropdownOpen(!isDropdownOpen)}
					>
						{selectedDegree}
						<span className="float-right text-blue-800">&#9660;</span> {/* Downward arrow */}
					</button>

					<div
						className={`absolute w-full mt-1 bg-white shadow-lg rounded-md ${
							isDropdownOpen ? "" : "hidden"
						} md:block`}
					>
						<ul className="max-h-60 overflow-auto">
							{["All", "PHD", "Master", "Bachelor", "Course"].map((degree) => (
								<li
									key={degree}
									className={`cursor-pointer px-2 py-1 rounded ${
										selectedDegree === degree
											? "bg-blue-500 text-white"
											: "text-gray-700"
									} hover:bg-blue-500 hover:text-white transition-colors duration-200`}
									onClick={() => handleDegreeChange(degree)}
								>
									{degree}
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
			<div className="w-full md:w-3/4 pl-0 md:pl-4">
				{loading ? (
					<div className="flex justify-center items-center h-64">
						<FaSpinner className="animate-spin text-4xl text-blue-500" />
					</div>
				) : (
					<>
						{error && <div className="text-red-500">{error}</div>}
						<h2 className="text-2xl font-semibold text-gray-700">
							{scholarships.length} Scholarships to Study in {selectedCountry}
						</h2>
						<div className="mt-4 space-y-4">
							{scholarships.map((scholarship, index) => (
								<div
									key={index}
									className="flex items-center p-4 bg-white border border-gray-300 rounded-md shadow-sm"
									onClick={() => window.open(scholarship.link, "_blank")}
								>
									<img
										src={scholarship.favicon || IoMdSchool}
										alt={`${scholarship.source} logo`}
										className="h-12 w-12 rounded-full"
									/>
									<div className="ml-4">
										<h3 className="text-lg font-semibold text-gray-900">
											{scholarship.source}
										</h3>
										<p className="text-sm text-gray-500">
											{scholarship.university}
										</p>
										<p className="text-sm text-gray-500">
											{scholarship.snippet}
										</p>
										<p className="text-sm text-gray-500">{scholarship.date}</p>
									</div>
								</div>
							))}
						</div>
						<div className="mt-4 flex justify-between">
							<button
								onClick={() => handlePageChange(page - 1)}
								disabled={page === 1}
								className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 disabled:bg-gray-100"
							>
								Previous
							</button>
							<button
								onClick={() => handlePageChange(page + 1)}
								disabled={scholarships.length < 10}
								className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 disabled:bg-gray-100"
							>
								Next
							</button>
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default ScholarshipLayout;
