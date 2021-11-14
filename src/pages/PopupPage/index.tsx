import { StackScreenProps } from "@react-navigation/stack";
import React from "react";
import { View } from "react-native";
import { Button, Card, Paragraph, useTheme } from "react-native-paper";
import { ParamList } from "src/types/navigation";
import getStyles from "./styles";

type PopupPageProps = StackScreenProps<ParamList, "PopupPage">;

/**
 * A page to handle Popups.
 */
export default function PopupPage({ route, navigation }: PopupPageProps) {
  const params = route.params;
  const theme = useTheme();
  const styles = getStyles(params.type, theme);
  return (
    <View style={styles.cardContainer}>
      <Card style={styles.card}>
        <Card.Title title={params.title} />
        <Card.Content>
          <Paragraph>{params.message}</Paragraph>
          <View>{params.content}</View>
        </Card.Content>
        <Card.Actions style={styles.actions}>
          {!params.disableClose && (
            <Button mode="text" onPress={() => navigation.goBack()}>
              Close
            </Button>
          )}
          <Button
            mode="text"
            onPress={() => {
              params.onConfirm?.();
              navigation.goBack();
            }}
          >
            {params.confirmButtonText ?? "Ok"}
          </Button>
        </Card.Actions>
      </Card>
    </View>
  );
}
