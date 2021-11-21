import { StyleSheet } from "react-native";

const getStyles = (theme: ReactNativePaper.Theme, width?: number) =>
  StyleSheet.create({
    errorText: {
      color: theme.colors.error,
    },
    inputContainer: {
      marginTop: 10,
      marginBottom: 10,
      flex: 1,
      position: "relative",
      //borderWidth: 1,
    },
    autocompleteContainer: {
      flex: 1,
      left: 0,
      position: "absolute",
      right: 0,
      top: 0,
      zIndex: 5,
      padding: 5,
    },
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
    flatList: {
      maxHeight: 300,
    },
  });

export default getStyles;
