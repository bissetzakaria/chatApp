/** @format */

import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	StyleSheet,
	StatusBar,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
	login,
	saveUserInfo,
	isUserConnected,
	getCommonError,
} from "../services/userService";

const LoginPage = (props) => {
	const [email, setEmail] = useState("");
	const [password, setPwd] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const navigation = useNavigation(); //pas utile je crois

	useEffect(() => {
		const checkUserIsConnected = async () => {
			let isConnected = await isUserConnected();
			if (isConnected === false) {
				props.navigation.navigate("Login");
			}
		};

		checkUserIsConnected();
	}, [props]);

	const loginUser = () => {
		login(email, password, async (response) => {
			if (response.error) {
				const message = getCommonError(response.error.message);
				setErrorMessage(message);
			} else {
				//alert(JSON.stringify(response.data, null, 2));
				await saveUserInfo(response.data);
				props.navigation.navigate("Inbox");
			}
		});
	};

	return (
		<View style={styles.container}>
			<StatusBar backgroundColor="#000" barStyle="light-content" />
			<Text style={styles.title}>WeChatApp </Text>
			<Text style={styles.titre}>Login</Text>

			{errorMessage.length > 0 && (
				<Text style={styles.errorMessage}>{errorMessage}</Text>
			)}

			<TextInput
				style={styles.input}
				placeholder="Email"
				value={email}
				onChangeText={(text) => setEmail(text)}
				autoCapitalize="none"
				autoCompleteType="email"
				keyboardType="email-address"
			/>
			<TextInput
				style={styles.input}
				placeholder="Mot de passe"
				value={password}
				onChangeText={(text) => setPwd(text)}
				secureTextEntry={true}
			/>
			<TouchableOpacity style={styles.button} onPress={() => loginUser()}>
				<Text style={styles.buttonText}>Login</Text>
			</TouchableOpacity>
			<TouchableOpacity
				style={styles.button}
				onPress={() => props.navigation.navigate("inscription")}>
				<Text style={styles.buttonText}>{"Créer un compte"}</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#fff",
		padding: 16,
	},
	titre: {
		fontSize: 32,
		fontWeight: "bold",
		marginBottom: 32,
		textAlign: "center",
		color: "#003300",
	},
	input: {
		width: "100%",
		height: 40,
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 8,
		paddingHorizontal: 16,
		marginBottom: 16,
	},
	button: {
		marginTop: 5,
		width: "100%",
		height: 40,
		backgroundColor: "#003300",
		borderRadius: 8,
		justifyContent: "center",
		alignItems: "center",
	},
	buttonText: {
		color: "#fff",
		fontSize: 16,
		fontWeight: "bold",
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
});

export default LoginPage;
