/** @format */

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Convo from "../screens/Convos";
import Contact from "../screens/Contacts";
import Inbox from "../screens/Inbox";
import Inscription from "../screens/Inscriptions";
import Login from "../screens/Logins";

import { StyleSheet } from "react-native";

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName="Login">
				<Stack.Screen
					name="Login"
					component={Login}
					options={{ title: "Se connecter" }}
				/>
				<Stack.Screen
					name="convo"
					component={Convo}
					options={{ title: "conversation" }}
				/>
				<Stack.Screen
					name="Inbox"
					options={{ title: "inbox" }}
					component={Inbox}
				/>

				<Stack.Screen
					name="contact"
					component={Contact}
					options={{ title: "contact" }}
				/>
				<Stack.Screen
					name="inscription"
					component={Inscription}
					options={{ title: "Sinscrire" }}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}
