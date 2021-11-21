import { StyleSheet } from "react-native";

const getStyles = (theme: ReactNativePaper.Theme, width?: number) =>
  StyleSheet.create({
    errorText: {
      color: theme.colors.error,
    },
    inputContainer: {
      //borderWidth: 1,
    },
    autocompleteContainer: {},
    textInput: {
      minWidth: width ?? 250,
    },
    itemText: {
      fontSize: 15,
      margin: 2,
      minWidth: width ?? 250,
    },
    autocomplete: {
      width: width ?? 250,
    },
  });

export default getStyles;
