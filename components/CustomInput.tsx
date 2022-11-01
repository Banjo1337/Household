import React from "react";
import { Control, Controller, RegisterOptions } from "react-hook-form";
import { KeyboardTypeOptions, StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-paper";

interface Props {
  control: Control<any, any>;
  defaultValue?: string;
  name: string;
  rules?: Partial<RegisterOptions>;
  placeholder: string;
  secureTextEntry?: boolean;
  maxLength?: number;
  keyboardType?: KeyboardTypeOptions;
  value?: string;
  style?: any;
  multiline?: boolean;
  numOfLines?: number;
}
const CustomInput = ({
  style,
  control,
  name,
  rules = {},
  placeholder,
  secureTextEntry,
  defaultValue,
  maxLength,
  keyboardType,
  multiline,
  numOfLines,
}: Props) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
        <>
          <View style={[styles.container, { borderColor: error ? "red" : "white" }]}>
            <TextInput
              value={value ? value : defaultValue}
              onChangeText={onChange}
              onBlur={onBlur}
              maxLength={maxLength}
              keyboardType={keyboardType}
              placeholder={placeholder}
              secureTextEntry={secureTextEntry}
              style={style}
              multiline={multiline}
              numberOfLines={numOfLines}
              defaultValue={defaultValue}
            />
          </View>
          {error && <Text style={{ color: "red", alignSelf: "stretch" }}>{error.message}</Text>}
        </>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",

    minWidth: "100%",
    width: "100%",

    borderWidth: 1,
  },
  input: {},
});

export default CustomInput;
