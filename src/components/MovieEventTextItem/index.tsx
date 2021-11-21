import React from "react";
import { Headline, Paragraph, Surface, useTheme } from "react-native-paper";
import getStyles from "./styles";

type Props = {
  title: string;
  body: string;
};
export default function MovieEventTextItem(props: Props) {
  const theme = useTheme();
  const styles = getStyles(theme);
  return (
    <Surface style={styles.surface}>
      <Headline style={styles.headline}>{props.title}</Headline>
      <Paragraph style={styles.body}>{props.body}</Paragraph>
    </Surface>
  );
}
