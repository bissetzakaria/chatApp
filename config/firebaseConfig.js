/** @format */

import { initializeApp } from "firebase/app";
import {
	addDoc,
	collection,
	doc,
	getDoc,
	getFirestore,
	setDoc,
} from "firebase/firestore";

//import firebase from 'firebase/app';
//import 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyCRHqZRsEhESroMg5t0gdMMhcAM3qYsMSU",
	authDomain: "travail-806b8.firebaseapp.com",
	projectId: "travail-806b8",
	storageBucket: "travail-806b8.appspot.com",
	messagingSenderId: "416084981129",
	appId: "1:416084981129:web:9a07cbfade563f9dad9d58",
	measurementId: "G-HN8N6G51K8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export const db = getFirestore(app);

const getOrCreateUser = async (nom, email, tel, userId) => {
	let user = {
		nom: nom,
		email: email,
		tel: tel,
	};
	const userRef = doc(db, "users", userId); // Utilisez l'`userId` comme ID du document
	try {
		await setDoc(userRef, user);
		console.log("Le document a été créé ou mis à jour avec succès !");
		return user;
	} catch (error) {
		console.error(
			"Erreur lors de la création ou de la mise à jour du document :",
			error
		);
		throw error;
	}
};

/*
const getOrCreateUser = async (nom, email, tel, userId) => {
	let user = {
		_id: userId,
		nom: nom,
		email: email,
		tel: tel,
	};
	addDoc(collection(db, "users"), user);
	console.log("on est rentrer dans la fonction");
	return user;
};*/

const updateUser = async (user) => {
	if (!(user && user.id)) return;
	try {
		// set
		user.updated = new Date().toISOString();
		await setDoc(doc(db, "contact_users", user.id), user);
	} catch (error) {
		console.error("Error setting document: ", e);
	}
};

export { getOrCreateUser, updateUser };
