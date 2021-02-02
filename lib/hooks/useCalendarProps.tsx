import { useState } from "react";
import { DateObject } from "react-native-calendars";

export const useCalendarProps = (dates: {}): {} => {
	const [today] = useState(Date());
	return {
		current: today,
		firstDay: 1,
		monthFormat: "MMMM yyyy",
		onDayPress: (day: DateObject) => {},
		onDayLongPress: (day: DateObject) => {},
		onMonthChange: (month: DateObject) => {},
		markedDates: { ...dates },
	};
};
