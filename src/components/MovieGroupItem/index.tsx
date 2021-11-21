import * as React from "react";
import { Headline, TouchableRipple, useTheme } from "react-native-paper";
import getStyles from "./styles";
import FavoriteIcon from "components/FavoriteIcon";
import { TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack";
import { ParamList } from "types/navigation";

type Props = {
  title: string;
  id: string;
  onToggleFavorite?: () => void;
  favorite?: boolean;
};

type NavigationProps = StackNavigationProp<ParamList, "MovieGroupsPage">;

export default function MovieGroupItem(props: Props) {
  const navigation = useNavigation<NavigationProps>();
  const theme = useTheme();
  const styles = getStyles(theme);
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.container}
        onPress={() => navigation.navigate("MovieGroupPage", { MovieGroupId: props.id })}
      >
        <Headline style={styles.title}>{props.title}</Headline>
      </TouchableOpacity>
      <FavoriteIcon size={34} isFilled={props.favorite || false} onClick={props.onToggleFavorite} />
    </View>
  );
}
