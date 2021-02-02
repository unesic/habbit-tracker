import React, { useState } from "react";
import { View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { StackNavigationProp } from "@react-navigation/stack";
import { t } from "react-native-tailwindcss";

import { HomeScreenContext } from "./HomeScreenContext";
import { dayExists, generateDaysArray } from "../lib/utils/data";
import { StackParamList } from "../App";
import { TopBar } from "../components/TopBar";
import { BottomBar } from "../components/BottomBar";
import { Habbit, HabbitState } from "../components/Habbit";
import { HabbitPopup } from "../components/HabbitPopup";
import Swipeable from "react-native-gesture-handler/Swipeable";

export type HomeScreenNavigationProp = StackNavigationProp<
	StackParamList,
	"Home"
>;

interface HomeScreenProps {
	navigation: HomeScreenNavigationProp;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
	const [swiping, setSwiping] = useState<{
		id: string;
		ref: React.MutableRefObject<Swipeable> | null;
	}>({
		id: "",
		ref: null,
	});
	const [modalVisible, setModalVisible] = useState<boolean>(false);
	const [days] = useState<string[]>(generateDaysArray(7));
	const [habbits, setHabbits] = useState<HabbitState[]>([]);
	const [editingHabbit, setEditingHabbit] = useState<
		HabbitState | undefined
	>();

	const onSaveHandler = (habbit: HabbitState) => {
		if (habbit.id) {
			const newHabbits = [...habbits];
			const habbitIdx = newHabbits.findIndex((h) => h.id === habbit.id);
			newHabbits[habbitIdx] = { ...habbit };

			setHabbits(newHabbits);
			setEditingHabbit(undefined);
		} else {
			const newHabbit: HabbitState = {
				id: Date.now().toString(),
				name: habbit.name,
				color: habbit.color,
				icon: habbit.icon,
				days: [
					"2021-01-01",
					"2021-01-05",
					"2021-01-10",
					"2021-01-15",
					"2021-01-20",
					"2021-01-25",
					"2021-01-27",
					"2021-01-29",
					"2021-01-30",
					"2021-01-31",

					"2021-02-01",
					"2021-02-05",
					"2021-02-10",
					"2021-02-15",
					"2021-02-20",
					"2021-02-25",
					"2021-02-27",
					"2021-02-29",
					"2021-02-30",

					"2021-03-01",
					"2021-03-05",
					"2021-03-10",
					"2021-03-15",
					"2021-03-20",
					"2021-03-25",
					"2021-03-27",
					"2021-03-29",

					"2021-04-01",
					"2021-04-05",
					"2021-04-10",
					"2021-04-15",
					"2021-04-25",
					"2021-04-27",

					"2021-05-01",
					"2021-05-05",
					"2021-05-10",
					"2021-05-15",
					"2021-05-20",
					"2021-05-25",
					"2021-05-27",
					"2021-05-29",

					"2021-06-01",
					"2021-06-05",
					"2021-06-10",
					"2021-06-20",
					"2021-06-25",
					"2021-06-27",
					"2021-06-29",

					"2021-07-01",
					"2021-07-05",
					"2021-07-10",
					"2021-07-15",
					"2021-07-20",
					"2021-07-25",
					"2021-07-27",
					"2021-07-29",
					"2021-07-30",
					"2021-07-31",

					"2021-08-01",
					"2021-08-05",
					"2021-08-10",
					"2021-08-15",
					"2021-08-20",
					"2021-08-27",
					"2021-08-29",
					"2021-08-30",
					"2021-08-31",

					"2021-09-01",
					"2021-09-05",
					"2021-09-10",
					"2021-09-15",
					"2021-09-20",
					"2021-09-27",
					"2021-09-29",
					"2021-09-30",
					"2021-09-31",

					"2021-10-01",
					"2021-10-05",
					"2021-10-10",
					"2021-10-15",
					"2021-10-20",
					"2021-10-25",
					"2021-10-27",
					"2021-10-29",
					"2021-10-30",
					"2021-10-31",

					"2021-11-01",
					"2021-11-05",
					"2021-11-10",
					"2021-11-15",
					"2021-11-20",
					"2021-11-29",
					"2021-11-30",
					"2021-11-31",

					"2021-12-01",
					"2021-12-05",
					"2021-12-15",
					"2021-12-20",
					"2021-12-25",
					"2021-12-27",
					"2021-12-29",
					"2021-12-30",
					"2021-12-31",
				],
			};

			setHabbits([...habbits, newHabbit]);
		}
	};

	const editHabbitHandler = (habbit: HabbitState) => {
		setEditingHabbit(habbit);
		setModalVisible(true);
	};

	const dayClickHandler = (habbitId: string, day: string) => {
		const newHabbits: HabbitState[] = [...habbits];
		const habbit: HabbitState | undefined = newHabbits.find(
			(h) => h.id === habbitId
		);

		if (habbit) {
			const [exists, dIdx] = dayExists(day, habbit.days);

			if (exists) habbit.days.splice(dIdx, 1);
			else habbit.days.push(day);

			const habbitIdx: number = newHabbits.findIndex(
				(h) => h.id === habbitId
			);
			newHabbits[habbitIdx] = habbit;
			setHabbits(newHabbits);
		}
	};

	const renderHabbit = ({ item: habbit }: { item: HabbitState }) => (
		<Habbit
			habbit={habbit}
			editHabbit={editHabbitHandler}
			dayClick={dayClickHandler}
			currDays={days}
		/>
	);

	return (
		<HomeScreenContext.Provider value={{ navigation, swiping, setSwiping }}>
			<View style={[t.flex1, t.bgTrueGray300]}>
				{/* <TopBar days={days} /> */}
				<FlatList
					data={habbits}
					renderItem={renderHabbit}
					keyExtractor={(h) => h.id}
				/>
				<HabbitPopup
					habbit={editingHabbit}
					visible={modalVisible}
					setVisible={setModalVisible}
					onSave={onSaveHandler}
				/>
				<BottomBar
					visible={modalVisible}
					setVisible={setModalVisible}
				/>
			</View>
		</HomeScreenContext.Provider>
	);
};
