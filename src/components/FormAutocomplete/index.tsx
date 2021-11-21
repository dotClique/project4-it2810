import { useField } from "formik";
import React, { useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import Autocomplete from "react-native-autocomplete-input";
import { Menu, Text, TextInput, useTheme } from "react-native-paper";
import getStyles from "./styles";

type FormAutocompleteProps<DataType> = {
  name: string;
  width?: number;
  data: DataType[];
  label?: string;
  keyExtractor: (item: DataType, index: number) => string;
  //renderItem?: ListRenderItem<DataType> | null | undefined;¨
  onChangeText?: (text: string) => void;
  textExtractor: (item: DataType) => string;
};

export default function FormAutocomplete<DataType>(props: FormAutocompleteProps<DataType>) {
  const theme = useTheme();
  const styles = getStyles(theme, props.width);
  const [options, setOptions] = useState<string[]>([]);
  const [{ value, onChange, onBlur }, { error }] = useField<string>(props.name);
  const [hideResults, setHideResults] = useState(true);

  useEffect(() => {
    setOptions(props.data.map(props.textExtractor));
  }, [props.data]);

  return (
    <View>
      <View style={styles.inputContainer}>
        <View style={styles.autocompleteContainer}>
          <Autocomplete
            hideResults={hideResults}
            style={styles.autocomplete}
            onBlur={onBlur(props.name)}
            data={options.length === 1 && options[0] === value ? [] : props.data}
            value={value}
            onFocus={() => setHideResults(false)}
            onChangeText={(text) => {
              onChange(props.name)(text);
              props.onChangeText?.(text);
            }}
            flatListProps={{
              keyExtractor: props.keyExtractor,
              renderItem: ({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    const text = props.textExtractor(item);
                    onChange(props.name)(text);
                    props.onChangeText?.(text);
                    setHideResults(true);
                  }}
                >
                  <Menu.Item style={styles.itemText} title={props.textExtractor(item)} />
                </TouchableOpacity>
              ),
              scrollEnabled: true,
              style: styles.flatList,
            }}
            renderTextInput={({ value, onChangeText, onBlur }) => (
              <TextInput
                value={value}
                onChangeText={onChangeText}
                onBlur={onBlur}
                error={error != undefined}
                label={props.label}
                style={styles.textInput}
                onFocus={() => setHideResults(false)}
                //onEndEditing={() => setHideResults(true)}
              />
            )}
          />
        </View>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    </View>
  );
}
