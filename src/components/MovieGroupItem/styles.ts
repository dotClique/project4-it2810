import { StyleSheet } from "react-native";

const getStyles = (theme: ReactNativePaper.Theme, width?: number) =>
  StyleSheet.create({
    link: {},
    title: { color: theme.colors.background },
    container: {
      position: "relative",
      width: "100%",
      height: 80,
      backgroundColor: theme.colors.accent,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 10,
      marginBottom: 20,
    },
  });

export default getStyles;
