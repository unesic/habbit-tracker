import React, { useState, useReducer, useEffect } from "react";
import { View } from "react-native";
import { t } from "react-native-tailwindcss";
import {
	Modal,
	Portal,
	TextInput,
	IconButton,
	Button,
	Title,
} from "react-native-paper";

import { ColorPicker } from "./ColorPicker";
import { HabbitState } from "./Habbit";

type Actions =
	| { type: "SET_NAME"; payload: string }
	| { type: "SET_COLOR"; payload: string }
	| { type: "SET_STATE"; payload: HabbitState }
	| { type: "RESET_STATE" };

const HabbitPopupReducer = (
	state: HabbitState,
	action: Actions
): HabbitState => {
	switch (action.type) {
		case "SET_NAME":
			return {
				...state,
				name: action.payload,
			};
		case "SET_COLOR":
			return {
				...state,
				color: action.payload,
			};
		case "SET_STATE":
			return {
				...action.payload,
			};
		case "RESET_STATE":
			return {
				id: "",
				name: "",
				color: "#4fd1c5",
				icon: "",
				days: [],
			};
		default:
			return state;
	}
};

interface HabbitPopupProps {
	habbit?: HabbitState;
	visible: boolean;
	setVisible: (v: boolean) => void;
	onSave: (obj: HabbitState) => void;
}

export const HabbitPopup: React.FC<HabbitPopupProps> = ({
	habbit,
	visible,
	setVisible,
	onSave,
}) => {
	const [state, dispatch] = useReducer(HabbitPopupReducer, {
		id: habbit?.id ?? "",
		name: habbit?.name || "",
		color: habbit?.color ?? "#4fd1c5",
		icon: habbit?.icon ?? "",
		days: habbit?.days ?? [],
	});
	const [CPVisible, setCPVisible] = useState<boolean>(false);

	useEffect(() => {
		if (habbit?.id) {
			dispatch({
				type: "SET_STATE",
				payload: habbit,
			});
		} else {
			dispatch({
				type: "RESET_STATE",
			});
		}
	}, [habbit]);

	const onNameChangeHandler = (text: string) => {
		dispatch({
			type: "SET_NAME",
			payload: text,
		});
	};

	const onColorSelectedHandler = (color: string) => {
		dispatch({
			type: "SET_COLOR",
			payload: color,
		});
	};

	const onSaveHandler = () => {
		const newHabbit: HabbitState = {
			...state,
			name: state.name.trim(),
		};

		if (newHabbit.name !== "") {
			onSave(newHabbit);
			setVisible(false);
			dispatch({
				type: "RESET_STATE",
			});
		} else {
			alert("Name cannot be empty!");
		}
	};

	const onDiscard = () => {
		setVisible(false);
		dispatch({
			type: "RESET_STATE",
		});
	};

	return (
		<Portal>
			<Modal
				visible={visible}
				onDismiss={onDiscard}
				contentContainerStyle={[t.mX3, t.roundedLg, t.p6, t.bgGray100]}
			>
				<Title>
					{habbit?.name ? "Edit habbit" : "Track a new habbit"}
				</Title>
				<View style={[t.flexRow, t.itemsCenter, t.mY2]}>
					<TextInput
						mode="outlined"
						label="Title"
						value={state.name}
						onChangeText={onNameChangeHandler}
						style={{ flex: 1 }}
						dense
					/>
					<IconButton
						icon="palette"
						size={26}
						color={state.color}
						onPress={() => setCPVisible(true)}
					/>
				</View>
				<View
					style={{ flexDirection: "row", justifyContent: "flex-end" }}
				>
					<Button
						dark
						icon="plus-circle-outline"
						mode="contained"
						onPress={onSaveHandler}
						style={{ marginRight: 10 }}
						focusable
					>
						Save
					</Button>
					<Button
						dark
						icon="close-circle-outline"
						mode="contained"
						onPress={onDiscard}
						focusable
					>
						Discard
					</Button>
				</View>
				<ColorPicker
					visible={CPVisible}
					setVisible={setCPVisible}
					color={state.color}
					onColorSelected={onColorSelectedHandler}
				/>
			</Modal>
		</Portal>
	);
};
