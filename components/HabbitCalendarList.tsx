import React, { useState, useEffect } from "react";
import { Dimensions } from "react-native";
import { Card } from "react-native-paper";
import {
	CalendarList,
	CalendarTheme,
	DateObject,
} from "react-native-calendars";
import { t } from "react-native-tailwindcss";
import moment from "moment";

import { weeksOfMonth } from "../lib/utils/data";

interface HabbitCalendarListProps {
	theme: CalendarTheme;
	mainProps: {};
}

const { width } = Dimensions.get("window");
const calendarWidth = width - 20;

export const HabbitCalendarList: React.FC<HabbitCalendarListProps> = ({
	theme,
	mainProps,
}) => {
	const [currentDate, setCurrentDate] = useState(moment());
	const [calendarHeight, setCalendarHeight] = useState(
		weeksOfMonth(currentDate)
	);

	useEffect(() => {
		setCalendarHeight(weeksOfMonth(currentDate));
	}, [currentDate]);

	const onVisibleMonthsChangeHandler = (data: DateObject[]): void => {
		const year = moment(data[0]).year();
		const month = moment(data[0]).month();
		const currY = currentDate.year();
		const currM = currentDate.month();

		if (year !== currY || month !== currM) setCurrentDate(moment(data[0]));
	};

	return (
		<Card style={[t.m2]}>
			<Card.Content style={[t.flexRow, t.justifyCenter]}>
				<CalendarList
					{...mainProps}
					theme={{ ...theme }}
					onVisibleMonthsChange={onVisibleMonthsChangeHandler}
					style={{
						width: calendarWidth,
						height: calendarHeight,
						overflow: "hidden",
					}}
					calendarWidth={calendarWidth}
					pastScrollRange={50}
					futureScrollRange={12}
					horizontal
					pagingEnabled
					showScrollIndicator
				/>
			</Card.Content>
		</Card>
	);
};
