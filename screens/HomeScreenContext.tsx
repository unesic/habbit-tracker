import { createContext } from "react";
import Swipeable from "react-native-gesture-handler/Swipeable";

import { HomeScreenNavigationProp } from "./HomeScreen";

const contextState: {
	navigation: HomeScreenNavigationProp | undefined;
	swiping: { id: string; ref: React.RefObject<Swipeable> | null };
	setSwiping: React.Dispatch<
		React.SetStateAction<{
			id: string;
			ref: React.MutableRefObject<Swipeable> | null;
		}>
	>;
} = {
	navigation: undefined,
	swiping: { id: "", ref: null },
	setSwiping: () => {},
};

export const HomeScreenContext = createContext(contextState);
