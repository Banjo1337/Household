import { MaterialCommunityIcons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { Image, Pressable, ScrollView, StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";
import CustomInput from "../components/CustomInput";
import { selectToken } from "../features/authentication/authenticationSelectors";
import { logout, postSignInThunk } from "../features/authentication/authenticationSlice";
import { useTheme } from "../features/theme/ThemeContext";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { useTogglePasswordVisibility } from "../hooks/useTogglePasswordVisibility";
import { RootStackParamList } from "../NavContainer";

export default function SignInScreen({ navigation }: NativeStackScreenProps<RootStackParamList>) {
  const dispatch = useAppDispatch();
  const { passwordVisibility, rightIcon, handlePasswordVisibility } = useTogglePasswordVisibility();
  const {
    control,
    handleSubmit,
    formState: {},
  } = useForm();
  const { currentTheme } = useTheme();

  const Token = useAppSelector(selectToken);

  useEffect(() => {
    if (Token) {
      navigation.navigate("SelectProfile");
    }
  }, [navigation, Token]);

  const onLoginPressed = (data: FieldValues) => {
    dispatch(postSignInThunk({ username: data.username, password: data.password }));
  };

  const onLogoutPressed = () => {
    dispatch(logout());
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Image style={styles.image} source={require("../assets/household.png")} />
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
        <Pressable onPress={handlePasswordVisibility} style={styles.eye}>
          <MaterialCommunityIcons
            name={rightIcon}
            size={32}
            color={currentTheme.dark ? "#dedede" : "#232323"}
            // Places the icon between the two inputs, and draws it on top of the below CustomInput because of zIndex.
          />
        </Pressable>
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
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  image: {
    height: 225,
    width: 225,
    borderRadius: 40,
    marginVertical: 30,
  },
  button: { marginTop: 50 },
  eye: { position: "relative", left: 150, top: 45, zIndex: 1 },
});
