import { useEffect, useState } from "react";
import { createContext, Dispatch, ReactNode, useContext } from "react";
import { Appearance } from "react-native";
import useSecureStorage from "../../hooks/useSecureStorage";
import { DarkTheme, LightTheme, Theme } from "./themeTypes";

interface ContextValue {
  darkmode: boolean;
  setDarkmode: Dispatch<React.SetStateAction<boolean>>;
  systemTheme: boolean;
  setSystemTheme: Dispatch<React.SetStateAction<boolean>>;
  currentTheme: Theme;
  setCurrentTheme: Dispatch<React.SetStateAction<Theme>>;
}

const ThemeContext = createContext<ContextValue>({} as ContextValue);

interface Props {
  children: ReactNode;
}

export default function ThemeProvider({ children }: Props) {
  const [darkmode, setDarkmode] = useSecureStorage<boolean>("darkmode", false);
  const [systemTheme, setSystemTheme] = useSecureStorage<boolean>(
    "autoTheme",
    true
  );
  const [currentTheme, setCurrentTheme] = useState<Theme>(LightTheme);

  useEffect(() => {
    if (systemTheme) {
      const systemTheme = Appearance.getColorScheme();
      setCurrentTheme(systemTheme === "dark" ? DarkTheme : LightTheme);
    } else {
      setCurrentTheme(darkmode ? DarkTheme : LightTheme);
    }
  }, [systemTheme, darkmode]);

  return (
    <ThemeContext.Provider
      value={{
        darkmode,
        setDarkmode,
        systemTheme,
        setSystemTheme,
        currentTheme,
        setCurrentTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
