import {
	Disclosure,
	DisclosureButton,
	DisclosurePanel,
	Menu,
	MenuButton,
	MenuItem,
	MenuItems,
} from "@headlessui/react";
import { useContext } from "react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { AiFillHome } from "react-icons/ai"; // Home icon
import { MdSchool } from "react-icons/md"; // Scholarship icon
import { RiVipDiamondFill } from "react-icons/ri"; // Exclusive icon
import { FaBriefcase } from "react-icons/fa";
import { UsersContext } from "../store/AuthProvider";
import logo from "../assets/Zeus_Scholarly_logo.svg";
import UserProfileImage from "./UserProfileImage";
import Cookies from "js-cookie";

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

export default function NavBar() {
	const { user, logout } = useContext(UsersContext);
	const navigate = useNavigate();

	// Define the navigation array inside the NavBar function to access the user state
	const navigation = [
		{ name: "Home", href: "/" },
		{ name: "Scholarships", href: "/scholarships" },
		// Conditionally include these based on the user state
		...(user
			? [
					{ name: "Exclusive", href: "/exclusive" },
					{ name: "Internship", href: "/internship" },
			  ]
			: []),
		// { name: "Research Grant", href: "/researchgrant" },
	];

	const handleLogout = async () => {
		try {
			await logout();
			Cookies.remove("user");
			navigate("/login");
		} catch (error) {
			console.error(error);
		}
	};
	return (
		<Disclosure as="nav" className=" sticky top-0  w-full z-50 bg-blue-200">
			{({ open }) => (
				<>
					<div className=" mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
						<div className="relative flex h-16 items-center justify-between">
							<div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
								{/* Mobile menu button*/}
								<DisclosureButton className="relative inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-blue-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
									<span className="absolute -inset-0.5" />
									<span className="sr-only">Open main menu</span>
									{open ? (
										<XMarkIcon
											className="block h-6 w-6 text-indigo-900"
											aria-hidden="true"
										/>
									) : (
										<Bars3Icon
											className="block h-6 w-6 text-indigo-900"
											aria-hidden="true"
										/>
									)}
								</DisclosureButton>
							</div>
							<div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
								<div className="flex flex-shrink-0 items-center">
									<NavLink to="/">
										<img
											className="h-11 w-auto"
											src={logo}
											alt="Zeus Scholarly"
										/>
									</NavLink>
								</div>
								<div className="hidden sm:ml-6 sm:block">
									<div className="flex space-x-4 space-y-1 px-2 pb-3 pt-2">
										{navigation.map((item) => (
											<NavLink
												key={item.name}
												to={item.href}
												className={({ isActive }) =>
													classNames(
														isActive
															? "bg-blue-900 text-white"
															: "text-indigo-900 hover:bg-blue-700 hover:text-white ",
														"rounded-md px-3 py-2 text-sm font-medium"
													)
												}
												aria-current={item.current ? "page" : undefined}
											>
												{/* Conditionally render icons based on the item name */}
												{item.name === "Home" && (
													<AiFillHome className="mr-2" />
												)}
												{item.name === "Scholarships" && (
													<MdSchool className="mr-2" />
												)}
												{item.name === "Exclusive" && (
													<RiVipDiamondFill className="mr-2" />
												)}
												{item.name === "Internship" && (
													<FaBriefcase className="mr-2" />
												)}
												{item.name}
											</NavLink>
										))}
									</div>
								</div>
							</div>
							<div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
								<button
									type="button"
									className="relative rounded-full bg-blue-800 p-1 text-white hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-800"
								>
									<span className="absolute -inset-1.5" />
									<span className="sr-only">View notifications</span>
									<BellIcon className="h-6 w-6" aria-hidden="true" />
								</button>

								{/* Profile dropdown */}
								<Menu as="div" className="relative ml-3">
									<div>
										<MenuButton className="relative flex rounded-full bg-blue-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-800">
											<span className="absolute -inset-1.5" />
											<span className="sr-only">Open user menu</span>
											<UserProfileImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" />
										</MenuButton>
									</div>
									<MenuItems
										transition
										className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
									>
										{!user && ( // Assuming `user` is null or undefined when not logged in
											<MenuItem>
												{({ focus }) => (
													<a
														href="#signup"
														onClick={() => navigate("/signup")}
														className={classNames(
															focus ? "bg-gray-100" : "",
															"block px-4 py-2 text-sm text-gray-700 flex items-center"
														)}
													>
														Sign Up
													</a>
												)}
											</MenuItem>
										)}
										{user ? (
											<MenuItem>
												{({ focus }) => (
													<a
														href="#"
														onClick={handleLogout}
														className={classNames(
															focus ? "bg-gray-100" : "",
															"block px-4 py-2 text-sm text-gray-700"
														)}
													>
														Log out
													</a>
												)}
											</MenuItem>
										) : (
											<MenuItem>
												{({ focus }) => (
													<a
														href="#login"
														onClick={() => navigate("/login")}
														className={classNames(
															focus ? "bg-gray-100" : "",
															"block px-4 py-2 text-sm text-gray-700"
														)}
													>
														Log In
													</a>
												)}
											</MenuItem>
										)}
									</MenuItems>
								</Menu>
							</div>
						</div>
					</div>
					{/* Mobile view */}
					<DisclosurePanel className="sm:hidden">
						<div className="space-y-1 px-2 pb-3 pt-2">
							{navigation.map((item) => (
								<DisclosureButton
									key={item.name}
									as={NavLink}
									to={item.href}
									className={({ isActive }) =>
										classNames(
											isActive
												? "bg-blue-900 text-white"
												: "text-indigo-900 hover:bg-blue-700 hover:text-white",
											"flex items-center rounded-md px-3 py-2 text-base font-medium"
										)
									}
									aria-current={item.current ? "page" : undefined}
								>
									{/* Conditionally render icons based on the item name */}
									{item.name === "Home" && <AiFillHome className="mr-2" />}
									{item.name === "Scholarships" && (
										<MdSchool className="mr-2" />
									)}
									{item.name === "Exclusive" && (
										<RiVipDiamondFill className="mr-2" />
									)}
									{item.name === "Internship" && (
										<FaBriefcase className="mr-2" />
									)}
									{item.name}
								</DisclosureButton>
							))}
						</div>
					</DisclosurePanel>
				</>
			)}
		</Disclosure>
	);
}
