import React from "react";
import { View, Animated } from "react-native";
import { Card, IconButton } from "react-native-paper";
import { t } from "react-native-tailwindcss";

type ControlSide = "LEFT" | "RIGHT";

interface HabbitControlProps {
	done?: boolean;
	side: ControlSide;
	dragX: Animated.AnimatedInterpolation;
	press: () => void;
}

export const HabbitControl: React.FC<HabbitControlProps> = ({
	done,
	side,
	dragX,
	press,
}) => {
	const translateX = dragX.interpolate({
		inputRange: side === "LEFT" ? [0, 80] : [-80, 0],
		outputRange: side === "LEFT" ? ["-100%", "0%"] : ["0%", "100%"],
		extrapolate: "clamp",
	});

	const styles = {
		base: [t.flexRow, t.itemsCenter, t.justifyCenter, t.mT3, t.mB1, t.w20],
		left: [done ? t.bgTeal400 : t.bgTrueGray400, t.roundedTlNone, t.roundedBlNone],
		right: [t.bgRed600, t.roundedTrNone, t.roundedBrNone],
	};

	const icons = {
		LEFT: done
			? "check-circle-outline"
			: "close-circle-outline",
		RIGHT: "delete-outline",
	};

	return (
		<Card
			style={[
				...styles.base,
				side === "LEFT" ? styles.left : styles.right,
				{
					transform: [{ translateX: translateX }],
				},
			]}
			onPress={press}
		>
			<View style={[t.itemsCenter]}>
				<IconButton icon={icons[side]} color="#fff" size={32} />
			</View>
		</Card>
	);
};
