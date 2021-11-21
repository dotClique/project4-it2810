import * as React from "react";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { ParamList } from "types/navigation";
import { TouchableOpacity, View } from "react-native";
import FavoriteIcon from "components/FavoriteIcon";
import { Headline, Subheading, useTheme } from "react-native-paper";
import getStyles from "./styles";

type Props = {
  title: string;
  id: string;
  onUnFavorite: () => void;
  events: { title: string; date: string; movieEventId: string }[];
};

type NavigationProps = StackNavigationProp<ParamList>;

export default function MovieGroupWithUpcomingEvents(props: Props) {
  const navigation = useNavigation<NavigationProps>();
  const theme = useTheme();
  const styles = getStyles(theme);
  return (
    <View style={styles.container}>
      <View style={styles.movieGroup}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("MovieGroupPage", { movieGroupId: props.id });
          }}
        >
          <Headline style={styles.movieGroupTitle}>{props.title}</Headline>
        </TouchableOpacity>
        <FavoriteIcon
          size={30}
          isFilled
          onClick={() => {
            props.onUnFavorite();
          }}
        />
      </View>

      <View style={styles.movieEventContainer}>
        {props.events.map((item) => (
          <TouchableOpacity
            key={item.movieEventId}
            onPress={() => {
              navigation.navigate("MovieEventPage", { movieEventId: item.movieEventId });
            }}
            style={styles.movieEvent}
          >
            <Headline>{item.title}</Headline>
            <Subheading>{item.date.replace("T", " ").replace("Z", "").slice(0, -4)}</Subheading>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
