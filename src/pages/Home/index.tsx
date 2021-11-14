import * as React from "react";
import { View } from "react-native";

import { ParamList } from "src/types/navigation";
import { StackScreenProps } from "@react-navigation/stack";
import { Button, Headline } from "react-native-paper";
import styles from "./styles";
import PageContainer from "components/PageContainer";

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
      </PageContainer>
    </View>
  );
}
