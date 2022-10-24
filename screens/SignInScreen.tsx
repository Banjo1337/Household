import { MaterialCommunityIcons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";
import { useTheme } from "../features/theme/ThemeContext";
import CustomInput from "../components/CustomInput";
import { useTogglePasswordVisibility } from "../hooks/useTogglePasswordVisibility";
import { RootStackParamList } from "../NavContainer";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { postSignInThunk, logout } from "../features/authentication/authenticationSlice";
import {
  selectHasError,
  selectError,
  selectToken,
  selectAuthUserId,
} from "../features/authentication/authenticationSelectors";

export default function SignInScreen({ navigation }: NativeStackScreenProps<RootStackParamList>) {
  const dispatch = useAppDispatch();
  const hasError = useAppSelector(selectHasError);
  const errorText = useAppSelector(selectError);
  const token = useAppSelector(selectToken);
  const authUserId = useAppSelector(selectAuthUserId);
  const { passwordVisibility, rightIcon, handlePasswordVisibility } = useTogglePasswordVisibility();
  const {
    control,
    handleSubmit,
    formState: {},
  } = useForm();

  useEffect(() => {
    console.log(" ############## In SignInScreen##############");
    console.log("token: ", token);
    console.log("authUserId: ", authUserId);
    console.log("hasError: ", hasError);
    console.log("errorText: ", errorText);
    console.log(" ############## ##############");
  }, [token, authUserId, hasError, errorText]);

  const { currentTheme } = useTheme();

  useEffect(() => {
    if (token) {
      navigation.navigate("SelectProfile");
    }
  }, [navigation, token]);

  const onLoginPressed = (data: FieldValues) => {
    dispatch(postSignInThunk({ username: data.username, password: data.password }));
  };

  const onLogoutPressed = () => {
    dispatch(logout());
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
