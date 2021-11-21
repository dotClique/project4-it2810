import { StyleSheet } from "react-native";

const getStyles = (theme: ReactNativePaper.Theme) =>
  StyleSheet.create({
    movieGroupList: {
      display: "flex",
      width: "100%",
    },
    container: {
      width: "100%",
      display: "flex",
      flex: 1,
      justifyContent: "flex-start",
    },
  });

export default getStyles;
