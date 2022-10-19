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

export default function SignInScreen({
  navigation,
}: NativeStackScreenProps<RootStackParamList>) {
  const dispatch = useAppDispatch();
  const hasError = useAppSelector(selectHasError);
  const errorText = useAppSelector(selectErrorText);
  const dataWrittenToSecureStoreCounter = useAppSelector(
    selectDataWrittenToSecureStoreCounter
  );
  const { passwordVisibility, handlePasswordVisibility } =
    useTogglePasswordVisibility();
  const {
    control,
    handleSubmit,
    //formState: {},
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
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <Text style={styles.title}>Create an account</Text>
        <CustomInput placeholder="Username" name="username" control={control} />
        <View>
          <Pressable onPress={handlePasswordVisibility}>
            <MaterialCommunityIcons size={22} color="#232323" />
          </Pressable>
          <CustomInput
            placeholder="Password"
            name="password"
            control={control}
            secureTextEntry={passwordVisibility}
          />
          <Pressable
            style={styles.pressable}
            onPress={handleSubmit(onLoginPressed)}
          >
            <Text>Sign in</Text>
          </Pressable>
          <Pressable
            style={styles.pressable}
            onPress={handleSubmit(onLogoutPressed)}
          >
            <Text>Logout</Text>
          </Pressable>
        </View>
      </View>

      <Text style={styles.title}>authUserId: {authUserId}</Text>
      <Text style={styles.title}>token: {token}</Text>
      <Text style={styles.title}>hasError: {hasError}</Text>
      <Text style={styles.title}>errorText: {errorText}</Text>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
    backgroundColor: "gray",
    margin: 10,
  },
  pressable: {
    fontSize: 50,
    fontWeight: "bold",
    width: 100,
    height: 30,
    backgroundColor: "gray",
    borderRadius: 5,
    margin: 2,
    borderColor: "black",
  },
});
