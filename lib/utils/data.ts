import moment, { Moment } from "moment";

export const generateDaysArray = (num: number, date?: Date): string[] => {
	return Array(num)
		.fill(null)
		.map((_, idx) =>
			moment(date).subtract(idx, "days").format("YYYY-MM-DD")
		);
};

export const generateThisWeekDaysArray = (): Moment[] => {
	return Array(7)
		.fill(null)
		.map((_, idx) => moment().startOf("isoWeek").add(idx, "days"));
};

export const createDay = (date: Date) => {
	return moment(date).format("YYYY-MM-DD");
};

export const dayExists = (day: string, days: string[]): [boolean, number] => {
	return [days.includes(day), days.findIndex((d) => d === day)];
};

export const getMonthLength = (
	year: number = moment().year(),
	month: number = moment().month() + 1
): number => {
	return moment(`${year}-${month}`, "YYYY-MM").daysInMonth();
};

export const completedDaysInMonth = (
	days: string[],
	year: number = moment().year(),
	month: number = moment().month() + 1
): number => {
	return days.reduce((acc, day, idx) => {
		const [y, m] = day.split("-");
		if (
			dayExists(day, days) &&
			parseInt(y) === year &&
			parseInt(m) === month
		)
			acc++;
		return acc;
	}, 0);
};

export const getYearData = (
	days: string[],
	year: number = moment().year()
): number[] => {
	return Array(12)
		.fill(null)
		.map((_, idx) => completedDaysInMonth(days, year, idx + 1))
		.filter(Boolean);
};

export const getYearAverage = (year: number[]) => {
	return year.reduce((acc, curr) => acc + curr, 0) / year.length;
};

export const weeksOfMonth = (input: Moment): number => {
	const y = input.year();
	const m = input.month();

	const startM = moment(`${y}-${m}-01`, "YYYY-MM-DD").startOf("month");
	const startW = startM.clone().startOf("isoWeek");
	const startOff = startM.diff(startW, "days");

	const endM = moment(`${y}-${m}-01`, "YYYY-MM-DD").endOf("month");
	const endW = endM.clone().endOf("isoWeek");
	const endOff = endW.diff(endM, "days");

	const lines = Math.ceil(
		(endM.diff(startM, "days") + startOff + endOff) / 7
	);

	return lines * 42 + 90;
};

type Datum = {
	x: string;
	y: number;
	label: number;
};

export const generateData = (days: string[]): Datum[] => {
	return getYearData(days).map((val, idx) => ({
		x: moment().month(idx).format("MMM"),
		y: val,
		label: val,
	}));
};
