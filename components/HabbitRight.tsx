import React from "react";
import { View } from "react-native";
import { t } from "react-native-tailwindcss";
import moment from "moment";
import { Caption, Card } from "react-native-paper";

import {
	completedDaysInMonth,
	getMonthLength,
	generateThisWeekDaysArray,
	dayExists,
} from "../lib/utils/data";

interface HabbitRightProps {
	days: string[];
	color: string;
}

export const HabbitRight: React.FC<HabbitRightProps> = ({ days, color }) => {
	return (
		<Card.Content>
			<Caption style={[t.pX1]}>
				This month:{" "}
				<Caption
					style={completedDaysInMonth(days) ? { color: color } : null}
				>
					{completedDaysInMonth(days)}/{getMonthLength()}
				</Caption>
			</Caption>
			<View style={[t.flexRow]}>
				{generateThisWeekDaysArray().map((day) => (
					<View
						key={day.toISOString()}
						style={[t.itemsCenter, t.pX1]}
					>
						<Caption style={[t.textCenter]}>
							{day.format("dd")}
						</Caption>
						<View
							style={[
								t.w5,
								t.h5,
								t.roundedFull,
								t.bgTrueGray200,
								dayExists(
									moment(day).format("YYYY-MM-DD"),
									days
								)[0]
									? {
											backgroundColor: color,
									  }
									: null,
							]}
						></View>
					</View>
				))}
			</View>
		</Card.Content>
	);
};
