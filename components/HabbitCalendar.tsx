import React from "react";
import { Card } from "react-native-paper";
import { Calendar, CalendarTheme } from "react-native-calendars";
import { t } from "react-native-tailwindcss";

interface HabbitCalendarProps {
	theme: CalendarTheme;
	mainProps: {};
}

export const HabbitCalendar: React.FC<HabbitCalendarProps> = ({
	theme,
	mainProps,
}) => {
	return (
		<Card style={[t.m2]}>
			<Card.Content>
				<Calendar
					{...mainProps}
					theme={{ ...theme }}
					onPressArrowLeft={(subtractMonth) => subtractMonth()}
					onPressArrowRight={(addMonth) => addMonth()}
				/>
			</Card.Content>
		</Card>
	);
};
