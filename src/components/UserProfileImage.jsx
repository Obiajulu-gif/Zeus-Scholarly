import { FaUser } from "react-icons/fa";

const UserProfileImage = ({ src }) =>
	src ? (
		<img className="h-8 w-8 rounded-full" src={src} alt="" />
	) : (
		<FaUser className="h-8 w-8 text-blue-400" aria-hidden="true" />
	);
export default UserProfileImage;
