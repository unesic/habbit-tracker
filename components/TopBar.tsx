import React from "react";
import { View, Text } from "react-native";
import moment from "moment";
import { t } from "react-native-tailwindcss";

export interface TopBarProps {
	days: string[];
}

export const TopBar: React.FC<TopBarProps> = ({ days }) => {
	return (
		<View style={styles.TopBar}>
			<View style={styles.Days}>
				{days.map((day) => (
					<View key={day} style={styles.Day}>
						<Text style={styles.ddd}>
							{moment(day).format("ddd")}
						</Text>
						<Text style={styles.DD}>
							{moment(day).format("DD")}
						</Text>
					</View>
				))}
			</View>
		</View>
	);
};

export default TopBar;

const styles = {
	TopBar: [
		t.flex,
		t.flexRow,
		t.itemsCenter,
		t.justifyEnd,
		t.p2,
		t.roundedLg,
		t.border,
		t.borderSolid,
		t.borderTrueGray700,
	],
	Days: [t.flex, t.flexRow, t.itemsCenter, t.justifyBetween],
	Day: [t.flex, t.flexCol, t.w8],
	ddd: [t.textXs, t.textCenter, t.fontSemibold, t.uppercase, t.textWhite],
	DD: [t.textXs, t.textCenter, t.fontSemibold, t.uppercase, t.textWhite],
};
