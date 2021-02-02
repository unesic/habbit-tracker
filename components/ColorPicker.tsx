import React, { useState } from "react";
import { View } from "react-native";
import { ColorPicker as Picker, fromHsv } from "react-native-color-picker";
import { HsvColor } from "react-native-color-picker/dist/typeHelpers";
import { t } from "react-native-tailwindcss";
import { Modal, Portal, Button, Title } from "react-native-paper";

interface ColorPickerProps {
	visible: boolean;
	setVisible: (v: boolean) => void;
	color: string;
	onColorSelected: (color: string) => void;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({
	visible,
	setVisible,
	color,
	onColorSelected,
}) => {
	const [clr, setClr] = useState<string>(color);

	const pickColor = () => {
		setVisible(false);
		onColorSelected(clr);
	};

	const onColorChangeHandler = (c: HsvColor) => setClr(fromHsv(c));

	const onColorSelectedHandler = (c: string) => {
		setVisible(false);
		onColorSelected(c);
	};

	const onOldColorSelectedHandler = (c: string) => setClr(c);

	return (
		<Portal>
			<Modal
				visible={visible}
				onDismiss={pickColor}
				contentContainerStyle={[t.mX3, t.roundedLg, t.p6, t.bgGray100]}
			>
				<Title>Pick a color</Title>
				<View style={[t.mB4, { height: 350 }]}>
					<Picker
						oldColor={color}
						onColorChange={onColorChangeHandler}
						onColorSelected={onColorSelectedHandler}
						onOldColorSelected={onOldColorSelectedHandler}
						style={{ flex: 1 }}
						hideSliders={false}
					/>
				</View>
				<View
					style={{ flexDirection: "row", justifyContent: "flex-end" }}
				>
					<Button
						dark
						icon="plus-circle-outline"
						mode="contained"
						onPress={pickColor}
						style={{ marginRight: 10 }}
					>
						Save
					</Button>
					<Button
						dark
						icon="close-circle-outline"
						mode="contained"
						onPress={pickColor}
					>
						Discard
					</Button>
				</View>
			</Modal>
		</Portal>
	);
};
