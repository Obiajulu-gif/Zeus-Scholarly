import React, { useEffect, useState } from "react";
import axios from "axios";

const ScholarshipLayout = () => {
	const [countries, setCountries] = useState([]);
	const [selectedCountry, setSelectedCountry] = useState("USA");
	const [selectedDegree, setSelectedDegree] = useState("Master");
	const [scholarships, setScholarships] = useState([]);
	const [error, setError] = useState(null);
	const [page, setPage] = useState(1);
	const [totalResults, setTotalResults] = useState(0);

	const apiKey =
		"f55e91be239c78f7408114ee755e48afd78887fdea255740fbd31d1664fd7b8c";

	useEffect(() => {
		axios
			.get("/api/countries")
			.then((response) => {
				if (Array.isArray(response.data)) {
					setCountries(response.data);
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
		if (selectedCountry && selectedDegree) {
			axios
				.get("/api/scholarships", {
					params: {
						selectedCountry,
						selectedDegree,
						apiKey: apiKey,
						page,
					},
				})
				.then((response) => {
					if (response.data && Array.isArray(response.data.scholarships)) {
						setScholarships(response.data.scholarships);
						setTotalResults(response.data.totalResults || 0);
					} else {
						setScholarships([]);
						setTotalResults(0);
					}
				})
				.catch((error) => {
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
		setPage(1); // Reset to the first page
	};

	const handlePageChange = (newPage) => {
		setPage(newPage);
	};

	return (
		<div className="flex p-20">
			<div className="w-1/4">
				<div className="mb-4">
					<label
						htmlFor="country-select"
						className="block text-lg font-medium text-gray-700"
					>
						Where will you study?
					</label>
					<select
						id="country-select"
						value={selectedCountry}
						onChange={handleCountryChange}
						className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
					>
						<option value="">Find your location</option>
						{countries.map((country, index) => (
							<option key={index} value={country.name}>
								{country.name}
							</option>
						))}
					</select>
				</div>
				<div>
					<p className="text-lg font-medium text-gray-700">Degree level</p>
					<ul className="mt-2 space-y-2">
						<li
							className="cursor-pointer text-blue-500"
							onClick={() => handleDegreeChange("All")}
						>
							All
						</li>
						<li
							className="cursor-pointer text-gray-700"
							onClick={() => handleDegreeChange("PHD")}
						>
							PHD
						</li>
						<li
							className="cursor-pointer text-gray-700"
							onClick={() => handleDegreeChange("Master")}
						>
							Master
						</li>
						<li
							className="cursor-pointer text-gray-700"
							onClick={() => handleDegreeChange("Bachelor")}
						>
							Bachelor
						</li>
						<li
							className="cursor-pointer text-gray-700"
							onClick={() => handleDegreeChange("Course")}
						>
							Course
						</li>
					</ul>
				</div>
			</div>
			<div className="w-3/4 pl-4">
				{error && <div className="text-red-500">{error}</div>}
				<h2 className="text-2xl font-semibold text-gray-700">
					{scholarships.length} Scholarships to Study in {selectedCountry}
				</h2>
				<div className="mt-4 space-y-4">
					{scholarships.map((scholarship, index) => (
						<div
							key={index}
							className="flex items-center p-4 bg-white border border-gray-300 rounded-md shadow-sm"
						>
							<img
								src={scholarship.logo}
								alt={`${scholarship.name} logo`}
								className="h-12 w-12 rounded-full"
							/>
							<div className="ml-4">
								<h3 className="text-lg font-semibold text-gray-900">
									{scholarship.name}
								</h3>
								<p className="text-sm text-gray-500">
									{scholarship.university}
								</p>
								<p className="text-sm text-gray-500">
									{scholarship.description}
								</p>
								<p className="text-sm text-gray-500">{scholarship.degree}</p>
								<p className="text-sm text-gray-500">{scholarship.amount}</p>
							</div>
						</div>
					))}
				</div>
				<div className="mt-4 flex justify-between">
					<button
						onClick={() => handlePageChange(page - 1)}
						disabled={page === 1}
						className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md"
					>
						Previous
					</button>
					<button
						onClick={() => handlePageChange(page + 1)}
						disabled={scholarships.length < 10}
						className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md"
					>
						Next
					</button>
				</div>
			</div>
		</div>
	);
};

export default ScholarshipLayout;
