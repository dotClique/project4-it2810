import { StyleSheet } from "react-native";

const getStyles = (theme: ReactNativePaper.Theme, width?: number) =>
  StyleSheet.create({
    textInput: {
      minWidth: width ?? 250,
    },
    errorText: {
      color: theme.colors.error,
    },
    inputContainer: {
      marginTop: 20,
      marginBottom: 20,
      height: 80,
    },
  });

export default getStyles;
