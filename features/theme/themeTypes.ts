import { MD3LightTheme as PaperDefaultTheme, MD3DarkTheme as PaperDarkTheme, MD3Theme as NavTheme} from "react-native-paper";
import { DefaultTheme as NavigationDefaultTheme, DarkTheme as NavigationDarkTheme, Theme as PaperTheme} from "@react-navigation/native";
import merge from "deepmerge";

export type Theme = NavTheme & PaperTheme;

export const DarkTheme: Theme = merge(PaperDarkTheme, NavigationDarkTheme);

export const LightTheme: Theme = merge(PaperDefaultTheme, NavigationDefaultTheme);