import { MaterialCommunityIcons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as SecureStore from "expo-secure-store";
import React, { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";
import { useTheme } from "../features/theme/ThemeContext";
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

  const { currentTheme } = useTheme();

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
      <CustomInput
        placeholder='Username'
        name='username'
        control={control}
        rules={{
          required: "Username is required",
          minLength: { value: 4, message: "Must be minimum 4 " },
          maxLength: { value: 50, message: "Cant be more than 50 letters" },
        }}
      />

      <MaterialCommunityIcons
        name={rightIcon}
        size={32}
        color={currentTheme.dark ? "#232323" : "#333"}
        onPress={handlePasswordVisibility}
        style={[styles.passwordPosition, { zIndex: 1 }]}
        // Places the icon between the two inputs, and draws it on top of the below CustomInput because of zIndex.
      />
      <CustomInput
        placeholder='Password'
        name='password'
        control={control}
        secureTextEntry={passwordVisibility}
        rules={{ required: "Password is required" }}
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
    paddingHorizontal: 20,
    marginTop: 100,
  },
  button: { marginTop: 50 },
  passwordPosition: { position: "relative", left: 150, top: 45 },
});
