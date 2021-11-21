import { StyleSheet } from "react-native";
import { black } from "react-native-paper/lib/typescript/styles/colors";

const getStyles = (theme: ReactNativePaper.Theme) =>
  StyleSheet.create({
    movieGroup: {
      color: theme.colors.background,
      backgroundColor: theme.colors.accent,
      padding: 20,
      borderTopStartRadius: 10,
      borderTopEndRadius: 10,
    },
    movieGroupTitle: {
      color: theme.colors.background,
    },
    movieEventContainer: {
      color: theme.colors.accent,
      backgroundColor: theme.colors.primary,
      borderBottomEndRadius: 10,
      borderBottomStartRadius: 10,
      padding: 20,
    },
    movieEvent: { paddingTop: 4, borderTopColor: "red", borderTopWidth: 1 },
    container: {
      marginBottom: 20,
    },
  });

export default getStyles;
