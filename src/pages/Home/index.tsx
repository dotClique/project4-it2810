import PageContainer from "components/PageContainer";
import * as React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import LoginForm from "./LoginForm";
import styles from "./styles";

export default function Home() {
  return (
    <PageContainer title="FilmFlokk">
      <View style={styles.content}>
        <Text style={styles.text}>
          Welcome to FilmFlokk, a website for sharing the unique joy of watching movies together.
          Please enter an alias before continuing.
        </Text>
        <LoginForm />
      </View>
    </PageContainer>
  );
}
