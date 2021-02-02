import React from "react";
import { Avatar } from "react-native-paper";
import { t } from "react-native-tailwindcss";

interface HabbitLeftProps {
	done: boolean;
	color: string;
}

export const HabbitLeft: React.FC<HabbitLeftProps> = ({ done, color }) => {
	return (
		<Avatar.Icon
			icon="check-circle-outline"
			size={30}
			style={[
				done
					? {
							backgroundColor: color,
					  }
					: t.bgTrueGray500,
			]}
		/>
	);
};
