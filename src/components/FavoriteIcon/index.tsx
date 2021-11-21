import * as React from "react";
import { useTheme } from "react-native-paper";
import { HeartIcon as SolidHeart } from "react-native-heroicons/solid";
import { HeartIcon as OutlinedHeart } from "react-native-heroicons/outline";
import getStyles from "./styles";
import { View } from "react-native";

type Props = {
  size: number;
  isFilled: boolean;
  onClick?: () => void;
};
export default function FavoriteIcon(props: Props) {
  const theme = useTheme();
  const styles = getStyles(theme);

  const icon = props.isFilled ? (
    <SolidHeart style={styles.icon} size={props.size} data-testid={"solidHeart"} />
  ) : (
    <OutlinedHeart style={styles.icon} size={props.size} data-testid={"outlinedHeart"} />
  );

  return <View style={styles.container}>{icon}</View>;
}
