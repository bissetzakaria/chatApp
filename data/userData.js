/** @format */

import { db } from "../config/firebaseConfig";
import {
	collection,
	addDoc,
	getDocs,
	getDoc,
	doc,
	deleteDoc,
} from "firebase/firestore";

const getUserById = async (userId) => {
	const user = [];
	const userRef = db.collection("users");
	const doc = await userRef.get(userId);
	if (!doc.exists) {
		console.log("No such document!");
	} else {
		console.log("Document data:", doc.data());
	}
	return user;
};
export const getUserContacts = async (userId) => {
	const contacts = [];
	const userRef = doc(db, "users", userId);
	const userSnapshot = await getDoc(userRef);

	if (userSnapshot.exists()) {
		const userData = userSnapshot.data();
		const userConvo = userData.nom;

		for (const contactId of userConvo) {
			const contactRef = doc(db, "users", contactId);
			const contactSnapshot = await getDoc(contactRef);

			if (contactSnapshot.exists()) {
				const contactData = contactSnapshot.data();
				contacts.push({
					id: contactSnapshot.id,
					...contactData,
				});
			}
		}
	}

	return contacts;
};

export { getUserById };
