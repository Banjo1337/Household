import { MaterialCommunityIcons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import CustomInput from "../components/CustomInput";
import { useTogglePasswordVisibility } from "../hooks/useTogglePasswordVisibility";
import { RootStackParamList } from "../NavContainer";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import {
  postSignInThunk,
  selectHasError,
  selectErrorText,
  logout,
  selectDataWrittenToSecureStoreCounter,
} from "../features/authentication/authenticationSlice";
import * as SecureStore from "expo-secure-store";
import { Button, Title } from "react-native-paper";

export default function SignInScreen({
  navigation,
}: NativeStackScreenProps<RootStackParamList>) {
  const dispatch = useAppDispatch();
  const hasError = useAppSelector(selectHasError);
  const errorText = useAppSelector(selectErrorText);
  const dataWrittenToSecureStoreCounter = useAppSelector(
    selectDataWrittenToSecureStoreCounter
  );
  const { passwordVisibility, rightIcon, handlePasswordVisibility } =
    useTogglePasswordVisibility();
  const {
    control,
    handleSubmit,
    formState: {},
  } = useForm();

  const [token, setToken] = useState<string>("");
  const [authUserId, setAuthUserId] = useState<string>("");

  //Im not sure where to put this useEffect. Perhaps we need to move to a new file, or change dependency array. Time will tell.
  useEffect(() => {
    (async () => {
      const token = await SecureStore.getItemAsync("token");
      const authUserId = await SecureStore.getItemAsync("authUserId");
      if (token && token !== "" && authUserId && authUserId !== "") {
        setToken(token);
        setAuthUserId(authUserId);
        console.log(token, hasError, authUserId, errorText);
        navigation.navigate("SelectProfile");
      }
    })();
  }, [dataWrittenToSecureStoreCounter, navigation]);

  const onLoginPressed = (data: FieldValues) => {
    dispatch(
      postSignInThunk({ username: data.username, password: data.password })
    );
  };

  const onLogoutPressed = () => {
    setToken("");
    setAuthUserId("");
    dispatch(logout());
    console.log(token);
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <Title style={styles.title}>Sign In Screen</Title>
        <CustomInput
          style={styles.input}
          placeholder="Username"
          name="username"
          control={control}
          rules={{
            required: "Username is required",
            minLength: { value: 4, message: "Must be minimum 4 " },
            maxLength: { value: 50, message: "Cant be more than 50 letters" },
          }}
        />
        <CustomInput
          style={styles.input}
          placeholder="Password"
          name="password"
          control={control}
          secureTextEntry={passwordVisibility}
          rules={{ required: "Password is required" }}
        />
        <Text style={styles.title}>Toggle password visibility</Text>
        <Pressable style={styles.pressable} onPress={handlePasswordVisibility}>
          <MaterialCommunityIcons name={rightIcon} size={22} color="#232323" />
        </Pressable>
        <Button style={styles.button} onPress={handleSubmit(onLoginPressed)}>
          Sign In
        </Button>
        <Button style={styles.button} onPress={onLogoutPressed}>
          Logout
        </Button>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "green",
    padding: 20,
  },
  title: {
    backgroundColor: "white",
  },
  button: { backgroundColor: "hotpink" },
  pressable: { backgroundColor: "red" },
  input: { backgroundColor: "brown" },
  dropDownPicker: { backgroundColor: "yellow" },
});
