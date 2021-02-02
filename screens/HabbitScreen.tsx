import React from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import moment from "moment";
import { Card } from "react-native-paper";
import { VictoryBar, VictoryChart, VictoryTheme } from "victory-native";
import { t } from "react-native-tailwindcss";
import { ScrollView } from "react-native-gesture-handler";

import { StackParamList } from "../App";
import { getYearAverage, getYearData, generateData } from "../lib/utils/data";
import { useCalendarTheme } from "../lib/hooks/useCalendarTheme";
import { HabbitCalendar } from "../components/HabbitCalendar";
import { HabbitCalendarList } from "../components/HabbitCalendarList";
import { useCalendarProps } from "../lib/hooks/useCalendarProps";

export type HabbitScreenNavigationProp = StackNavigationProp<
	StackParamList,
	"Habbit"
>;

type ProfileScreenRouteProp = RouteProp<StackParamList, "Habbit">;

interface HabbitScreenProps {
	route: ProfileScreenRouteProp;
	navigation: HabbitScreenNavigationProp;
}

export const HabbitScreen: React.FC<HabbitScreenProps> = ({
	route,
	navigation,
}) => {
	const {
		habbit: { name, color, days },
	} = route.params;
	const calendarTheme = useCalendarTheme(color);
	const calendarProps = useCalendarProps({
		"2021-02-01": {
			selected: true,
			marked: true,
		},
		"2021-02-16": {
			selected: true,
			marked: true,
		},
	});

	return (
		<ScrollView>
			<Card style={[t.m2]}>
				<Card.Title
					title={name}
					titleStyle={{ color: color }}
					subtitle="Subtitle"
				/>
			</Card>

			<HabbitCalendarList
				mainProps={calendarProps}
				theme={calendarTheme}
			/>

			<HabbitCalendar mainProps={calendarProps} theme={calendarTheme} />

			<Card style={[t.m2]}>
				<Card.Title
					title={`Overview for ${moment().format("YYYY")}`}
					subtitle={
						days.length
							? `Monthly average: ${getYearAverage(
									getYearData(days)
							  ).toFixed(1)}`
							: "You have not started tracking this habbit yet."
					}
				/>
				{days.length ? (
					<VictoryChart theme={VictoryTheme.material} height={300}>
						<VictoryBar
							data={generateData(days)}
							alignment="middle"
							style={{
								data: {
									fill: () => color,
								},
							}}
						/>
					</VictoryChart>
				) : null}
			</Card>
		</ScrollView>
	);
};
