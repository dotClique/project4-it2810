import { Button, Menu, Searchbar } from "react-native-paper";

import React, { Dispatch, SetStateAction } from "react";
import { StyleSheet, View } from "react-native";

type Props = {
  setSearchString: Dispatch<SetStateAction<string>>;
  setToDate: Dispatch<SetStateAction<string>>;
  setFromDate: Dispatch<SetStateAction<string>>;
};

export default function EventFilter(props: Props) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [visible, setVisible] = React.useState(false);
  return (
    <View style={styles.filterGrid}>
      <Searchbar
        placeholder={"Search for event by title"}
        value={searchQuery}
        onChangeText={(text) => {
          props.setSearchString(text);
          setSearchQuery(text);
        }}
      />
      <Menu
        visible={visible}
        onDismiss={() => {
          setVisible(false);
        }}
        anchor={
          <Button
            onPress={() => {
              setVisible(true);
            }}
          >
            Dato
          </Button>
        }
      >
        <Menu.Item
          title={"Upcoming events 1 week"}
          onPress={() => {
            const date = new Date();
            date.setDate(date.getDate() + 7);
            props.setToDate(date.toISOString());
            props.setFromDate(new Date().toISOString());
          }}
        />
        <Menu.Item
          title={"Upcoming events 1 month"}
          onPress={() => {
            const date = new Date();
            date.setMonth(date.getMonth() + 1);
            props.setToDate(date.toISOString());
            props.setFromDate(new Date().toISOString());
          }}
        />
        <Menu.Item
          title={"Upcoming events 1 year"}
          onPress={() => {
            const date = new Date();
            date.setFullYear(date.getFullYear() + 1);
            props.setToDate(date.toISOString());
            props.setFromDate(new Date().toISOString());
          }}
        />
        <Menu.Item
          title={"All upcoming Events"}
          onPress={() => {
            props.setToDate("9999-12-30T23:59:59.999Z");
            props.setFromDate(new Date().toISOString());
          }}
        />
        <Menu.Item
          title={"All"}
          onPress={() => {
            props.setToDate("9999-12-30T23:59:59.999Z");
            props.setFromDate("0001-01-01T00:00:01.000Z");
          }}
        />
      </Menu>
    </View>
  );
}

const styles = StyleSheet.create({
  filterGrid: {
    width: "100%",
    height: "10%",
  },
});
