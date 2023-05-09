/** @format */
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	Image,
	StyleSheet,
	TouchableOpacity,
	FlatList,
	StatusBar,
	ScrollView,
} from "react-native";
import { Octicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { removeUserInfo, isUserConnected } from "../services/userService";
import { getUserById, getUserContacts } from "../data/userData";

const ChatHistory = (props) => {
	const [contacts, setContacts] = useState([]);

	useEffect(() => {
		const fetchContacts = async () => {
			const userData = await AsyncStorage.getItem("USER_DATA");
			if (userData) {
				const { localId } = JSON.parse(userData);
				const contactsData = await getUserById(localId);
				setContacts(contactsData);
			}
		};
		fetchContacts();
	}, []);

	const signOutUser = async () => {
		await removeUserInfo();
		props.navigation.navigate("Login");
	};
	const renderConversation = ({ item }) => {
		return (
			<View>
				<TouchableOpacity
					onPress={() => props.navigation.navigate("convo")}
					style={styles.conversationContainer}>
					<View style={styles.detailsContainer}>
						<Text style={styles.name}>{item.nom}</Text>
					</View>
				</TouchableOpacity>
			</View>
		);
	};

	return (
		<View style={styles.container}>
			<StatusBar backgroundColor="black" barStyle="light-content" />
			<Text style={styles.title}>WeChatApp</Text>
			<Text style={styles.inboxText}>Inbox</Text>
			<TouchableOpacity onPress={() => signOutUser()}>
				<Text>Deconnexion</Text>
			</TouchableOpacity>
			<FlatList
				style={{ height: "80%" }}
				data={contacts}
				renderItem={renderConversation}
				keyExtractor={(item) => item.id.toString()}
				showsVerticalScrollIndicator={false}
			/>

			<View style={styles.boutons}>
				<View style={styles.inputContainer}>
					<TouchableOpacity
						onPress={() => props.navigation.navigate("Inbox")}>
						<Octicons
							style={{ marginLeft: 35 }}
							name="comment-discussion"
							size={24}
							color="green"
						/>
						<Text style={styles.iconTextDiscu}>Discussions</Text>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => props.navigation.navigate("contact")}>
						<AntDesign
							style={{ marginLeft: 100 }}
							name="contacts"
							size={24}
							color="black"
						/>
						<Text style={styles.iconTextContact}>Contacts</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#F4F4F4",
		height: "100%",
	},

	conversationContainer: {
		flexDirection: "row",
		alignItems: "center",
		padding: 10,
		borderBottomWidth: 1,
		borderBottomColor: "#ECECEC",
	},
	avatarContainer: {
		marginRight: 10,
	},
	avatar: {
		width: 50,
		height: 50,
		borderRadius: 25,
	},
	detailsContainer: {
		flex: 1,
	},
	name: {
		fontWeight: "bold",
		fontSize: 18,
	},
	message: {
		color: "#666",
		fontSize: 16,
	},
	timeContainer: {
		marginLeft: 10,
	},
	time: {
		color: "#999",
		fontSize: 12,
	},
	inboxText: {
		fontSize: 23,
		marginTop: 3,
		marginLeft: 10,
		textAlign: "left",
		fontWeight: "bold",
		marginBottom: 30,
	},
	iconTextDiscu: {
		fontSize: 12,
		marginTop: 5,
		textAlign: "center",
		backgroundColor: "#1E8449",
		color: "#FFFFFF",
		borderRadius: 15,
		paddingHorizontal: 15,
		paddingVertical: 5,
		opacity: 0.9,
		activeOpacity: 0.7,
	},
	iconTextContact: {
		fontSize: 12,
		marginTop: 10,
		textAlign: "center",
		marginLeft: 85,
	},
	inputContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		borderTopWidth: StyleSheet.hairlineWidth,
		borderColor: "#ddd",
		paddingHorizontal: 20,
		paddingVertical: 10,
		marginTop: 10, // changer la valeur à 10
	},

	title: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 20,
		backgroundColor: "#003300",
		color: "white",
		width: "100%",
		justifyContent: "center",
		height: 50,
		paddingVertical: 5,
		paddingHorizontal: 5,
	},
	boutons: {
		flexDirection: "row",
		justifyContent: "center",
		width: "100%",
		marginTop: 20,
	},
});

export default ChatHistory;
