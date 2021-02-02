import React, { useContext, useRef } from "react";
import { Animated } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { Card } from "react-native-paper";
import { t } from "react-native-tailwindcss";

import { dayExists, createDay } from "../lib/utils/data";
import { HomeScreenContext } from "../screens/HomeScreenContext";
import { HabbitControl } from "./HabbitControl";
import { HabbitRight } from "./HabbitRight";
import { HabbitLeft } from "./HabbitLeft";

export type HabbitState = {
	id: string;
	name: string;
	color: string;
	icon: string;
	days: string[];
};

export interface HabbitProps {
	habbit: HabbitState;
	editHabbit: (obj: HabbitState) => void;
	dayClick: (habbitId: string, day: string) => void;
	currDays: string[];
}

export const Habbit: React.FC<HabbitProps> = ({
	habbit,
	editHabbit,
	dayClick,
	currDays,
}) => {
	const ref = useRef() as React.MutableRefObject<Swipeable>;
	const context = useContext(HomeScreenContext);

	const { id, name, color, icon, days } = habbit;
	const [done] = dayExists(createDay(new Date()), days);

	const onPressHandler = () => {
		context.navigation?.navigate("Habbit", { habbit: habbit });
	};

	const onLongPressHandler = () => {
		editHabbit({ id, name, color, icon, days });
	};

	const leftSwipeHandler = (
		_: any,
		dragX: Animated.AnimatedInterpolation
	) => (
		<HabbitControl
			side="LEFT"
			dragX={dragX}
			press={() => {
				dayClick(id, createDay(new Date()));
				ref.current?.close();
			}}
			done={!done}
		/>
	);

	const rightSwipeHandler = (
		_: any,
		dragX: Animated.AnimatedInterpolation
	) => <HabbitControl side="RIGHT" dragX={dragX} press={() => {}} />;

	const willOpenHandler = () => {
		if (context.swiping.id !== id) {
			context.swiping.ref?.current?.close();
			context.setSwiping({ id: id, ref: ref });
		} else {
			context.setSwiping({ id: "", ref: null });
		}
	};

	return (
		<Swipeable
			renderLeftActions={leftSwipeHandler}
			renderRightActions={rightSwipeHandler}
			onSwipeableWillOpen={willOpenHandler}
			ref={ref}
		>
			<Card
				onPress={onPressHandler}
				onLongPress={onLongPressHandler}
				style={[t.mX2, t.mT3, t.mB1, t.pY3]}
			>
				<Card.Title
					title={name}
					titleStyle={{ color: color }}
					subtitle="Subtitle"
					left={() => <HabbitLeft done={done} color={color} />}
					right={() => <HabbitRight days={days} color={color} />}
				/>
			</Card>
		</Swipeable>
	);
};
