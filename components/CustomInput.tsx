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
  children?: JSX.Element;
  maxLength?: number;
  keyboardType?: KeyboardTypeOptions;
  value?: string;
  style?: any;
  multiline?: boolean;
  numOfLines?: number;
}
const CustomInput = ({
  control,
  name,
  rules = {},
  placeholder,
  secureTextEntry,
  defaultValue,
  maxLength,
  children,
  keyboardType,
  multiline,
  numOfLines,
  style,
}: Props) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
        <>
          <View style={styles.container}>
            <TextInput
              value={value ? value : defaultValue}
              onChangeText={onChange}
              onBlur={onBlur}
              maxLength={maxLength}
              keyboardType={keyboardType}
              placeholder={placeholder}
              secureTextEntry={secureTextEntry}
              style={[styles.input, style]}
              multiline={multiline}
              numberOfLines={numOfLines}
              defaultValue={defaultValue}
            ></TextInput>
            {children}
            {error && (
              <Text
                style={{
                  color: "red",
                  alignSelf: "stretch",
                  position: "absolute",
                  top: 75,
                  fontSize: 20,
                  fontWeight: "bold",
                }}
              >
                {error.message}
              </Text>
            )}
          </View>
        </>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    minWidth: "100%",
    width: "100%",
    paddingBottom: 20,
  },
  input: { backgroundColor: "white", marginTop: 10, height: 60, borderWidth: 2, borderRadius: 5 },
});

export default CustomInput;
