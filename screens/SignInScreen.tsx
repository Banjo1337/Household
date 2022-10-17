import { MaterialCommunityIcons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { FieldValue, FieldValues, useForm } from "react-hook-form";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import CustomInput from "../components/CustomInput";
import { useTogglePasswordVisibility } from "../hooks/useTogglePasswordVisibility";
import { RootStackParamList } from "../NavContainer";
import useSecureStorage from "../hooks/useSecureStorage";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { postSignInThunk, selectAuthUserId, selectToken } from "../features/authentication/authenticationSlice";

export default function SignInScreen({ navigation }: NativeStackScreenProps<RootStackParamList>) {
  const dispatch = useAppDispatch();
  const token = useAppSelector(selectToken);
  const userId = useAppSelector(selectAuthUserId);
  //const [token] = useSecureStorage("token", "");
  const { passwordVisibility, rightIcon, handlePasswordVisibility } = useTogglePasswordVisibility();
  const {
    control,
    handleSubmit,
    //formState: {},
  } = useForm();
  const OnLoginPressed = (data: FieldValues) => {
    //console.log(data.username + data.password);
    console.log("Dispatching");
    dispatch(postSignInThunk({ username: data.username, password: data.password }));
    //navigation.navigate("SelectProfile");
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
          <CustomInput placeholder="Password" name="password" control={control} secureTextEntry={passwordVisibility} />
          <Pressable style={styles.pressable} onPress={handleSubmit(OnLoginPressed)}>
            <Text>Sign in</Text>
          </Pressable>
        </View>
      </View>
      <Text style={styles.title}>token: {token}</Text>
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
