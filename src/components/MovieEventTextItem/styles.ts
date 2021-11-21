import { StyleSheet } from "react-native";

const getStyles = (theme: ReactNativePaper.Theme) =>
  StyleSheet.create({
    headline: {
      color: theme.colors.primary,
    },
    surface: {
      backgroundColor: theme.colors.surface,
      marginTop: 15,
      marginBottom: 15,
    },
    body: {},
  });

export default getStyles;
