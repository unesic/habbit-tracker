import "react-native-gesture-handler";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { t } from "react-native-tailwindcss";

import { HomeScreen } from "./screens/HomeScreen";
import { HabbitScreen } from "./screens/HabbitScreen";
import { HabbitState } from "./components/Habbit";

export type StackParamList = {
	Home: undefined;
	Habbit: { habbit: HabbitState };
};

const Stack = createStackNavigator<StackParamList>();

interface AppProps {}

const theme = {
	...DefaultTheme,
	roundness: 20,
	colors: {
		...DefaultTheme.colors,
		primary: "#4fd1c5",
		accent: "#f1c40f",
		surface: "#ffffff",
		text: "#424242",
	},
};
const App: React.FC<AppProps> = ({}) => {
	return (
		<PaperProvider theme={theme}>
			<SafeAreaView style={[t.flex1, t.bgWhite]}>
				<NavigationContainer>
					<Stack.Navigator
						initialRouteName="Home"
						screenOptions={{
							headerStyle: [t.bgWhite],
							headerTintColor: "#424242",
							headerTitleStyle: [t.fontBold],
						}}
					>
						<Stack.Screen name="Habbit" component={HabbitScreen} />
						<Stack.Screen
							name="Home"
							component={HomeScreen}
							options={({ navigation, route }) => ({
								headerTitle: "Tracker",
							})}
						/>
					</Stack.Navigator>
				</NavigationContainer>
			</SafeAreaView>
		</PaperProvider>
	);
};

export default App;
