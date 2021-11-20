import { StackNavigationProp } from "@react-navigation/stack";
import LogOutButton from "components/LogOutButton";
import * as React from "react";
import { ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import { Headline, Surface } from "react-native-paper";
import { ParamList } from "types/navigation";

type Props = {
  children: ReactNode;
  title?: string;
  footer?: ReactNode;
  navigation: StackNavigationProp<ParamList>;
};

export default function PageContainer(props: Props) {
  return (
    <Surface style={styles.container}>
      {props.title ? <Headline style={styles.title}>{props.title}</Headline> : false}
      <View style={styles.content}>{props.children}</View>

      <View>
        {props.footer ? (
          <View>
            <LogOutButton navigation={props.navigation} />
            {props.footer}
          </View>
        ) : (
          false
        )}
      </View>
    </Surface>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    width: "100%",
    overflow: "scroll",
  },
  title: {
    fontSize: 28,
    marginTop: 40,
    // fontFamily: "Verdana",
  },
  content: {
    flex: 1,
    alignItems: "center",
    width: "100%",
    maxHeight: "80%",
    justifyContent: "center",
  },
  footer: {
    flex: 1,
    alignItems: "center",
  },
});
