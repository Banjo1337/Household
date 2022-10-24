import { MaterialCommunityIcons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as SecureStore from "expo-secure-store";
import React, { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";
import CustomInput from "../components/CustomInput";
import {
  logout,
  postSignInThunk,
  selectDataWrittenToSecureStoreCounter,
  selectErrorText,
  selectHasError,
} from "../features/authentication/authenticationSlice";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { useTogglePasswordVisibility } from "../hooks/useTogglePasswordVisibility";
import { RootStackParamList } from "../NavContainer";

export default function SignInScreen({ navigation }: NativeStackScreenProps<RootStackParamList>) {
  const dispatch = useAppDispatch();
  const hasError = useAppSelector(selectHasError);
  const errorText = useAppSelector(selectErrorText);
  const dataWrittenToSecureStoreCounter = useAppSelector(selectDataWrittenToSecureStoreCounter);
  const { passwordVisibility, rightIcon, handlePasswordVisibility } = useTogglePasswordVisibility();
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
    dispatch(postSignInThunk({ username: data.username, password: data.password }));
  };

  const onLogoutPressed = () => {
    setToken("");
    setAuthUserId("");
    dispatch(logout());
    console.log(token);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      <CustomInput
        style={styles.input}
        placeholder='Username'
        name='username'
        control={control}
        rules={{
          required: "Username is required",
          minLength: { value: 4, message: "Must be minimum 4 " },
          maxLength: { value: 50, message: "Cant be more than 50 letters" },
        }}
      />

      <CustomInput
        style={styles.input}
        placeholder='Password'
        name='password'
        control={control}
        secureTextEntry={passwordVisibility}
        rules={{ required: "Password is required" }}
      />
      <MaterialCommunityIcons
        name={rightIcon}
        size={32}
        color='#232323'
        onPress={handlePasswordVisibility}
        style={{ position: "relative", bottom: 47, left: 150 }}
      />
      <Button style={styles.button} onPress={handleSubmit(onLoginPressed)}>
        Sign In
      </Button>
      <Button style={styles.button} onPress={onLogoutPressed}>
        Logout
      </Button>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 20,
  },
  title: { fontSize: 50 },
  button: { padding: 20 },
  input: {},
});
