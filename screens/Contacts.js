/** @format */

import React, { useState, useEffect } from "react";
import {
	TouchableOpacity,
	View,
	Text,
	FlatList,
	StyleSheet,
	StatusBar,
	Dimensions, // Ajouter cette ligne
} from "react-native";
import * as Contacts from "expo-contacts";
import { Octicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

const Contact = ({ navigation }) => {
	const [contact, setContact] = useState([]);
	const windowHeight = Dimensions.get("window").height; // Ajouter cette ligne

	useEffect(() => {
		(async () => {
			const { status } = await Contacts.requestPermissionsAsync();
			if (status === "granted") {
				const { data } = await Contacts.getContactsAsync({
					fields: [Contacts.Fields.PhoneNumbers],
				});
				if (data.length > 0) {
					setContact(data);
				}
			}
		})();
	}, []);

	const renderItem = ({ item }) => {
		return (
			<View style={styles.contact}>
				<StatusBar backgroundColor="black" barStyle="light-content" />
				<Text style={styles.nom}>{item.name}</Text>
				{item.phoneNumbers &&
					item.phoneNumbers.map((phoneNumber, index) => (
						<Text key={index} style={styles.tel}>
							{phoneNumber.number}
						</Text>
					))}
			</View>
		);
	};

	return (
		<View style={styles.container}>
			<StatusBar backgroundColor="black" barStyle="light-content" />
			<Text style={styles.title}>WeChatApp</Text>
			<Text style={styles.contactsText}>Contacts</Text>
			{contact.length > 0 ? (
				<FlatList
					data={contact}
					renderItem={renderItem}
					keyExtractor={(item) => item.id}
					style={[styles.liste, { height: windowHeight - 320 }]} // Modifier cette ligne
				/>
			) : (
				<Text style={styles.noContact}>Aucun contact trouvé</Text>
			)}
			<View style={styles.boutons}>
				<View style={styles.inputContainer}>
					<TouchableOpacity
						onPress={() => navigation.navigate("Inbox")}>
						<Octicons
							style={{ marginLeft: 40 }}
							name="comment-discussion"
							size={24}
							color="black"
						/>
						<Text style={styles.iconDiscussions}>Discussions</Text>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => navigation.navigate("contact")}>
						<AntDesign
							style={{ marginLeft: 30 }}
							name="contacts"
							size={24}
							color="green"
						/>
						<Text style={styles.iconText}>Contacts</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
		marginBottom: 0,
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		backgroundColor: "#003300",
		color: "white",
		width: "100%",
		height: 50,
		paddingVertical: 5,
		paddingHorizontal: 5,
		textAlign: "center",
	},
	contactsText: {
		fontSize: 24,
		fontWeight: "bold",
		marginVertical: 20,
		marginLeft: 20,
		width: "100%",
	},
	noContact: {
		marginBottom: 295,
		marginTop: 295,
	},
	liste: {
		width: "100%",
		paddingHorizontal: 16,
	},
	contact: {
		paddingVertical: 8,
		borderBottomWidth: 1,
		borderBottomColor: "#ccc",
	},
	nom: {
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 4,
	},
	tel: {
		fontSize: 16,
		color: "#333",
	},
	boutons: {
		flexDirection: "row",
		justifyContent: "center",
		width: "100%",
		marginTop: 20,
	},
	inputContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		borderTopWidth: StyleSheet.hairlineWidth,
		borderColor: "#ddd",
		paddingHorizontal: 20,
		paddingVertical: 10,
		width: "100%",
		position: "absolute",
		bottom: 0,
		backgroundColor: "#fff",
	},
	iconText: {
		fontSize: 12,
		marginTop: 5,
		textAlign: "center",
		backgroundColor: "#1E8449",
		color: "#FFFFFF",
		borderRadius: 15,
		paddingHorizontal: 15,
		paddingVertical: 5,
		marginLeft: 5,
		opacity: 0.9,
		activeOpacity: 0.7,
	},
	iconDiscussions: {
		fontSize: 12,
		marginTop: 5,
		textAlign: "center",
		color: "black",
		borderRadius: 15,
		paddingHorizontal: 15,
		paddingVertical: 5,
		opacity: 0.9,
		activeOpacity: 0.7,
	},
});

export default Contact;
