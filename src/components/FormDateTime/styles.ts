import { StyleSheet } from "react-native";

const getStyles = (theme: ReactNativePaper.Theme, width?: number) =>
  StyleSheet.create({
    dateInput: {
      minWidth: width ?? 250,
    },
    errorText: {
      color: theme.colors.error,
    },
    inputContainer: {
      marginTop: 10,
      marginBottom: 10,
    },
  });

export default getStyles;
