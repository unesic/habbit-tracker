import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Feather, Ionicons, FontAwesome } from "@expo/vector-icons";
import { t } from "react-native-tailwindcss";

export interface BottomBarProps {
	visible: boolean;
	setVisible: (v: boolean) => void;
}

export const BottomBar: React.FC<BottomBarProps> = ({
	visible,
	setVisible,
}) => {
	return (
		<View style={styles.BottomBar}>
			<TouchableOpacity activeOpacity={0.8} style={styles.Button}>
				<Feather name="edit" size={24} color="white" />
			</TouchableOpacity>
			<TouchableOpacity
				activeOpacity={0.8}
				style={[styles.Button, styles.ButtonMid]}
				onPress={() => setVisible(!visible)}
			>
				<Ionicons name="ios-add-circle-sharp" size={36} color="white" />
			</TouchableOpacity>
			<TouchableOpacity activeOpacity={0.8} style={styles.Button}>
				<FontAwesome name="gears" size={24} color="white" />
			</TouchableOpacity>
		</View>
	);
};

const styles = {
	BottomBar: [
		t.absolute,
		t.bottom0,
		t.left0,
		t.right0,
		t.flex,
		t.flexRow,
		t.itemsEnd,
	],
	Button: [
		t.flex,
		t.itemsCenter,
		t.justifyCenter,
		t.flex1,
		// tslint:disable-next-line
		t.bgGray801,
		t.p4,
		t.pB8,
	],
	ButtonMid: [t.bgGray901, t.roundedTLg],
};
