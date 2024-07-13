import { createContext, useEffect, useState } from "react";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signInWithPopup,
	signOut,
	onAuthStateChanged,
	getAuth,
	GoogleAuthProvider,
} from "firebase/auth";
import { AppFirebase } from "./firebase";

export const UsersContext = createContext();

export const AuthContextProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [profileImage, setProfileImage] = useState("");
	const [username, setUsername] = useState("");
	const auth = getAuth(AppFirebase);
	const provider = new GoogleAuthProvider();

	const createUser = (email, password) => {
		return createUserWithEmailAndPassword(auth, email, password);
	};

	const signInUser = (email, password) => {
		return signInWithEmailAndPassword(auth, email, password);
	};

	const signGoogleAccount = () => {
    return signInWithPopup(auth, provider).then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // Extract profile information
        setProfileImage(user.photoURL);
        setUsername(user.displayName);
        return result;
    });
};

	const logout = () => {
		return signOut(auth);
	};

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			setUser(currentUser);
		});

		return () => {
			unsubscribe();
		};
	}, [auth]);

	return (
		<UsersContext.Provider
			value={{
				createUser,
				user,
				logout,
				signInUser,
				signGoogleAccount,
				setUser,
				profileImage,
				setProfileImage,
				username,
				setUsername,
			}}
		>
			{children}
		</UsersContext.Provider>
	);
};
