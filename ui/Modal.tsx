import React from "react";
import { Text, View, Modal as ModalWrap, TouchableOpacity } from "react-native";
import { t } from "react-native-tailwindcss";

export interface ModalProps {
	isVisible: boolean;
	title: string;
	onSave: () => void;
	saveLabel: string;
	onDiscard: () => void;
	discardLabel: string;
	children: any;
}

export const Modal: React.FC<ModalProps> = ({
	isVisible,
	title,
	onSave,
	saveLabel,
	onDiscard,
	discardLabel,
	children,
}) => {
	return (
		<ModalWrap animationType="fade" transparent={true} visible={isVisible}>
			<View style={styles.ModalWrapper}>
				<TouchableOpacity
					style={styles.ModalBackdrop}
					onPress={onDiscard}
				></TouchableOpacity>
				<View
					style={[
						...styles.ModalInner,
						{
							shadowOffset: {
								width: 0,
								height: 12,
							},
							shadowOpacity: 0.3,
							shadowRadius: 12,
							elevation: 24,
						},
					]}
				>
					{title !== "" ? (
						<Text style={styles.ModalTitle}>{title}</Text>
					) : null}
					{children}
					<View style={styles.ButtonsContainer}>
						<TouchableOpacity
							style={[styles.Button, styles.ButtonSave]}
							onPress={onSave}
						>
							<Text style={styles.ButtonLabel}>{saveLabel}</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={[styles.Button, styles.ButtonDiscard]}
							onPress={onDiscard}
						>
							<Text style={styles.ButtonLabel}>
								{discardLabel}
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</ModalWrap>
	);
};

const styles = {
	ModalBackdrop: [
		t.absolute,
		t.top0,
		t.right0,
		t.bottom0,
		t.left0,
		t.bgBlack,
		t.opacity25,
	],
	ModalWrapper: [t.flex1, t.itemsCenter, t.justifyCenter, t.pX8, t.pY32],
	ModalInner: [t.wFull, t.roundedLg, t.p6, t.bgGray800],
	ModalTitle: [t.textCenter, t.textLg, t.fontBold, t.textGray300],
	ButtonsContainer: [t.flex, t.flexRow, t.justifyEnd, t.mT4],
	Button: [t.mL2, t.rounded, t.pX4, t.pY2],
	ButtonSave: [t.bgTeal500],
	ButtonDiscard: [t.bgGray700],
	ButtonLabel: [t.fontSemibold, t.textGray100],
};
