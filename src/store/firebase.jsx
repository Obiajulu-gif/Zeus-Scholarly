import { initializeApp } from "firebase/app";

const firebaseConfig = {
	apiKey: "AIzaSyCdak0osecWcNKrA9WoFhF__Zb9GfxlHqU",
	authDomain: "zeusscholarly.firebaseapp.com",
	projectId: "zeusscholarly",
	storageBucket: "zeusscholarly.appspot.com",
	messagingSenderId: "526079010889",
	appId: "1:526079010889:web:17538026d23261e378b798",
	measurementId: "G-K945QWFDGK",
};

export const AppFirebase = initializeApp(firebaseConfig);
