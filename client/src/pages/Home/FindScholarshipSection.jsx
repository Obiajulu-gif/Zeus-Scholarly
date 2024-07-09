import React from "react";
import { FaSearch, FaListAlt, FaBook, FaAward } from "react-icons/fa";

const FindScholarshipSection = () => {
	return (
		<section className="bg-white py-12">
			<div className="container mx-auto px-4">
				<div className="text-center mb-12">
					<h1 className="text-4xl font-bold text-gray-800">
						How to Find College{" "}
						<span className="text-blue-500">Scholarships</span>
					</h1>
					<p className="text-xl text-gray-600 mt-4">
						Zeus Scholarly is a free college scholarship search platform that
						matches you to college scholarships you qualify for.
					</p>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
					<div className="flex items-start space-x-4">
						<div className="text-blue-500 text-4xl">
							<FaSearch />
						</div>
						<div>
							<h2 className="text-xl font-bold text-gray-800">
								Find College Scholarships Easily
							</h2>
							<p className="text-gray-600 mt-2 text-justify">
								Unlock scholarships for college using our sophisticated matching
								technology. Just fill out your profile, and our algorithm will
								comb through countless scholarship options to identify the ones
								that are the perfect match for you.
							</p>
						</div>
					</div>
					<div className="flex items-start space-x-4">
						<div className="text-blue-500 text-4xl">
							<FaListAlt />
						</div>
						<div>
							<h2 className="text-xl font-bold text-gray-800 text-justify">
								Explore Our College Scholarship Directory
							</h2>
							<p className="text-gray-600 mt-2 text-justify">
								Explore scholarships by category in our detailed Scholarship
								Directory. Seamlessly navigate through various college
								scholarships, organized for easy access. Whether your search
								criteria include academic major, school year, state of
								residence, or specific characteristics, our Scholarship
								Directory streamlines your search, making it efficient and
								fruitful.
							</p>
						</div>
					</div>
					<div className="flex items-start space-x-4">
						<div className="text-blue-500 text-4xl">
							<FaBook />
						</div>
						<div>
							<h2 className="text-xl font-bold text-gray-800">
								Organize Your Scholarship Matches
							</h2>
							<p className="text-gray-600 mt-2 text-justify">
								Refine your scholarship search by criteria like due dates or
								award amounts. Effortlessly monitor scholarships you favor,
								those you've submitted applications for, and the ones you've
								secured. With Zeus Scholarly, ensure you never overlook a
								scholarship chance or a critical deadline.
							</p>
						</div>
					</div>
					<div className="flex items-start space-x-4">
						<div className="text-blue-500 text-4xl">
							<FaAward />
						</div>
						<div>
							<h2 className="text-xl font-bold text-gray-800">
								Apply For and Win College Scholarships
							</h2>
							<p className="text-gray-600 mt-2 text-justify">
								We've created a personalized list of college scholarships just
								for you. Now's the time to apply to the scholarships you've been
								matched with. Remember, applying to more scholarships increases
								your chances of winning. Start your applications today and make
								college more affordable.
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default FindScholarshipSection;
