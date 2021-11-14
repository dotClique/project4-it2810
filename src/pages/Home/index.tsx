import { StackScreenProps } from "@react-navigation/stack";
import PageContainer from "components/PageContainer";
import * as React from "react";
import { View } from "react-native";
import { Button, Headline } from "react-native-paper";
import { ParamList } from "src/types/navigation";
import styles from "./styles";

type Props = StackScreenProps<ParamList, "Home">;

export default function Home({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <PageContainer navigation={navigation} title={"Home"} footer={<View></View>}>
        <Headline>Hello</Headline>
        <Button
          mode={"contained"}
          onPress={() => {
            navigation.reset({ routes: [{ name: "MovieGroupsPage" }] });
          }}
        >
          MovieGroupsPage
        </Button>
        <Button
          mode={"contained"}
          onPress={() => {
            navigation.reset({ routes: [{ name: "FavoriteGroupsPage" }] });
          }}
        >
          FavoriteMovieGroupsPage
        </Button>
        <Button
          mode={"contained"}
          onPress={() => {
            navigation.push("PopupPage", {
              title: "Title",
              message: "Here I am",
              type: "confirm",
            });
          }}
        >
          PopupPage
        </Button>
      </PageContainer>
    </View>
  );
}
