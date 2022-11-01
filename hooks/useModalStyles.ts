import { StyleSheet } from "react-native";
import { useTheme } from "../features/theme/ThemeContext";

export default function useModalStyles() {
  const { currentTheme } = useTheme();

  return StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22,
    },
    modalView: {
      margin: 20,
      backgroundColor: currentTheme.colors.background,
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: currentTheme.dark ? "#FFF" : "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center",
      color: currentTheme.colors.text,
    },
  });
}
