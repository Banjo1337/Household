import { MaterialCommunityIcons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { Image, Pressable, ScrollView, StyleSheet, View, Text } from "react-native";
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

  const onSignupPressed = () => {
    navigation.navigate("SignUp");
  };

  const onLogoutPressed = () => {
    dispatch(logout());
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Image style={styles.image} source={require("../assets/household.png")} />
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
        <Pressable onPress={handlePasswordVisibility} style={styles.eye}>
          <MaterialCommunityIcons
            name={rightIcon}
            size={32}
            color={currentTheme.dark ? "#dedede" : "#232323"}
            // Places the icon between the two inputs, and draws it on top of the below CustomInput because of zIndex.
          />
        </Pressable>
        <CustomInput
          style={styles.input}
          placeholder='Password'
          name='password'
          control={control}
          secureTextEntry={passwordVisibility}
          rules={{ required: "Password is required" }}
        />
        <View style={{ display: "flex", flexDirection: "row" }}>
          <Button mode='outlined' style={styles.button} onPress={handleSubmit(onLoginPressed)}>
            <Text style={styles.text}>Sign In</Text>
          </Button>
          <Button mode='outlined' style={styles.button} onPress={onLogoutPressed}>
            <Text style={styles.text}>Logout</Text>
          </Button>
        </View>
        <Button mode='outlined' style={styles.button} onPress={onSignupPressed}>
          <Text style={styles.text}>Sign up</Text>
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
  button: { width: "50%", height: "auto", justifyContent: "center", backgroundColor: "white" },
  input: { backgroundColor: "white", borderWidth: 2 },
  eye: { position: "relative", left: 150, top: 45, zIndex: 1 },
  text: {
    color: "black",
    elevation: 2,
    fontWeight: "bold",
    backgroundColor: "white",
    textAlignVertical: "center",
    textAlign: "center",
    fontSize: 20,
    height: 70,
  },
});
