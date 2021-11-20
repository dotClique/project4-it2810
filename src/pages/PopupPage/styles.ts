import { PopupType } from "helpers/types";
import { StyleSheet } from "react-native";

const getStyles = (type: PopupType, theme: ReactNativePaper.Theme) =>
  StyleSheet.create({
    card: {
      flex: 1,
      width: "80%",
      backgroundColor: type === "alert" ? theme.colors.backdrop : theme.colors.background,
      maxHeight: "30%",
      alignContent: "space-between",
    },
    cardContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    actions: {
      flex: 1,
      justifyContent: "flex-end",
      alignItems: "flex-end",
      padding: 15,
    },
  });
export default getStyles;
