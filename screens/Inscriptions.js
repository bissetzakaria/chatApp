/** @format */
import { getOrCreateUser, updateUser } from "../config/firebaseConfig";
import React, { useState, useEffect } from "react";
import {
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
	StatusBar,
	Platform,
} from "react-native";
import {
	signUp,
	getCommonError,
	isUserConnected,
} from "../services/userService";

export default function App(props) {
	const [email, setEmail] = useState("");
	const [tel, setTel] = useState("");
	const [nom, setNom] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	useEffect(() => {
		const checkUserIsConnected = async () => {
			let isConnected = await isUserConnected();
			if (isConnected) {
				props.navigation.navigate("Inbox");
			}
		};
		checkUserIsConnected();
	}, [props]);

	const signUpUser = () => {
		if (password !== confirmPassword) {
			setErrorMessage("Les mots de passe ne sont pas identiques.");
			return;
		}

		if (!password || password.length < 4) {
			setErrorMessage("Le mot de passe est trop court.");
			return;
		}
		//
		signUp(email, password, tel, nom, (response) => {
			if (response.error) {
				const message = getCommonError(response.error.message);
				setErrorMessage(message);
			} else {
				let userId = response.data.localId;
				getOrCreateUser(nom, email, tel, userId);
				props.navigation.navigate("Login");
			}
		});
	};

	return (
		<View style={styles.container}>
			<StatusBar backgroundColor="black" barStyle="light-content" />
			<Text style={styles.title}>WeChatApp </Text>
			<Text style={styles.text}> Restez connecté avec vos proches </Text>
			<TextInput
				style={styles.input}
				placeholder="Nom complet"
				autoCapitalize="words"
				value={nom}
				onChangeText={(text) => setNom(text)}
			/>
			<TextInput
				style={styles.input}
				placeholder="Email"
				keyboardType="email-address"
				autoCapitalize="none"
				value={email}
				onChangeText={(text) => setEmail(text)}
			/>
			<TextInput
				style={styles.input}
				placeholder="Mot de passe"
				secureTextEntry={true}
				value={password}
				onChangeText={(text) => setPassword(text)}
			/>
			<TextInput
				style={styles.input}
				placeholder="Confirmation"
				secureTextEntry={true}
				value={confirmPassword}
				onChangeText={(text) => setConfirmPassword(text)}
			/>
			<TextInput
				style={styles.input}
				placeholder="Cellulaire"
				keyboardType="phone-pad"
				value={tel}
				onChangeText={(text) => setTel(text)}
			/>

			<TouchableOpacity
				style={styles.button}
				onPress={() => signUpUser()}>
				<Text style={styles.buttonText}>Inscription</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	text: {
		justifyContent: "center",
		fontWeight: "bold",
		fontSize: 16,
		marginBottom: "100px",
	},
	title: {
		borderWidth: 10,
		borderColor: "#003300",
		fontSize: 24,
		fontWeight: "bold",
		backgroundColor: "#003300",
		color: "white",
		width: "100%",
		position: "absolute",
		top: 0,
		paddingVertical: 5,
		paddingHorizontal: 5,
	},
	input: {
		width: "90%",
		borderColor: "#B2B2B2",
		borderWidth: StyleSheet.hairlineWidth,
		borderRadius: 10,
		paddingHorizontal: 10,
		marginTop: "20px",
		backgroundColor: "#E0E0E0",
		fontSize: 20,
	},
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
		height: "100%",
	},
	button: {
		width: "60%",
		height: 40, // augmenter la hauteur du bouton
		backgroundColor: "#003300",
		borderRadius: 10,
		alignItems: "center",
		justifyContent: "center",
		marginTop: 100,
	},
	buttonText: {
		color: "#fff",
		fontSize: 16,
		fontWeight: "bold",
	},
});
