import * as React from "react";
import { Headline, TouchableRipple, useTheme } from "react-native-paper";
import getStyles from "./styles";
import FavoriteIcon from "components/FavoriteIcon";
import { TouchableOpacity, View } from "react-native";

type Props = {
  title: string;
  id?: string;
  onToggleFavorite?: () => void;
  favorite?: boolean;
};
export default function MovieGroupItem(props: Props) {
  const theme = useTheme();
  const styles = getStyles(theme);
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.container}>
        <Headline style={styles.title}>{props.title}</Headline>
      </TouchableOpacity>
      <FavoriteIcon size={34} isFilled={props.favorite || false} onClick={props.onToggleFavorite} />
    </View>
  );
}
