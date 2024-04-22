import {createContext} from "react";

export const ThemeCtx = createContext<{mode: "light" | "dark" }>({mode:"light"});
