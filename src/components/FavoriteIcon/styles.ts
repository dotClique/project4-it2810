import { StyleSheet } from "react-native";

const getStyles = (theme: ReactNativePaper.Theme) =>
  StyleSheet.create({
    icon: { color: theme.colors.primary },
    container: {
      position: "absolute",
      right: 10,
      top: 10,
    },
  });

export default getStyles;
