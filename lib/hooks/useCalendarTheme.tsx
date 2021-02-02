import { CalendarTheme } from "react-native-calendars";
import { useTheme } from "react-native-paper";
import { getContrast } from "../utils/colors";

export const useCalendarTheme = (color: string): CalendarTheme => {
	const { colors } = useTheme();

	return {
		// textSectionTitleColor: "#b6c1cd",
		// textSectionTitleDisabledColor: "#d9e1e8",
		selectedDayBackgroundColor: color,
		selectedDayTextColor: getContrast(color) ? colors.text : "#ffffff",
		todayTextColor: color,
		// dayTextColor: "#2d4150",
		// textDisabledColor: "#d9e1e8",
		// dotColor: "#00adf5",
		// selectedDotColor: "#ffffff",
		arrowColor: color,
		// disabledArrowColor: "#d9e1e8",
		// monthTextColor: "blue",
		indicatorColor: "blue",
		// textDayFontFamily: "monospace",
		// textMonthFontFamily: "monospace",
		// textDayHeaderFontFamily: "monospace",
		textDayFontWeight: "400",
		textMonthFontWeight: "600",
		// textDayHeaderFontWeight: "300",
		textDayFontSize: 12,
		// textMonthFontSize: 16,
		// textDayHeaderFontSize: 16,
	};
};
