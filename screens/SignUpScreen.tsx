import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { FieldValues, useForm } from "react-hook-form";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import CustomInput from "../components/CustomInput";
import { useTogglePasswordVisibility } from "../hooks/useTogglePasswordVisibility";
import { RootStackParamList } from "../NavContainer";

interface SignUpDto {
  username: string;
  password: string;
}

//This is the body from BE. Note that status here is not a HTTP status code.
type SignUpResponse = {
  status: string;
  message: string;
};

const BASE_URL =
  "https://household-backend.azurewebsites.net/api/V01/Authenticate/";

export default function SignUpScreen({
  navigation,
}: NativeStackScreenProps<RootStackParamList>) {
  const { passwordVisibility, handlePasswordVisibility } =
    useTogglePasswordVisibility();
  const { control, handleSubmit, watch } = useForm({});
  const pwd = watch("password");

  const onRegisterPressed = (data: FieldValues) => {
    console.log(data.username + data.password);
    const signUpDto: SignUpDto = {
      username: data.username,
      password: data.password,
    };

    (async () => {
      const signUpResponse: SignUpResponse = await signUp(signUpDto);
      if (signUpResponse.status === "Success") {
        navigation.navigate("SignIn");
      }
    })();
  };

  const onRegisterFailed = () => {
    alert("Failed");
  };

  async function signUp(signUpDto: SignUpDto) {
    {
      const response: Response = await PostSignUp(signUpDto);
      try {
        if (response.status != 200) {
          throw new Error(
            "Httprequest to get token failed, response is not 200"
          );
        }
        const signUpResponse = (await response.json()) as SignUpResponse;
        return signUpResponse;
      } catch (error) {
        console.log("Error in signUp in SignUpScreen.tsx: ", error);
        return {} as SignUpResponse;
      }
    }
  }

  const PostSignUp = async (signUpDto: SignUpDto): Promise<Response> => {
    try {
      console.log("About to send signUp post request");
      const response: Response = await fetch(BASE_URL + `register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signUpDto),
      });

      //const jsonBody = await response.json();
      //console.log("Response.status in PostSingUp: ", response.status);
      //console.log("jsonBody in PostSingUp: ", jsonBody);
      return response;
    } catch (error) {
      console.log("Error in PostSignUp in SignUpScreen.tsx: ", error);
      return {} as Response;
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <Text style={styles.title}>Create an account</Text>
        <CustomInput
          placeholder="Username"
          name="username"
          control={control}
          rules={{ required: "Username is required" }}
        />
        <CustomInput
          placeholder="Password"
          name="password"
          control={control}
          secureTextEntry={passwordVisibility}
        />
        <Pressable onPress={handlePasswordVisibility}>
          <MaterialCommunityIcons size={22} color="#232323" />
        </Pressable>
        <CustomInput
          placeholder="Repeat password"
          name="passwordRepeat"
          control={control}
          secureTextEntry={passwordVisibility}
          rules={{
            required: "Repeat password",
            validate: (value: any) => value === pwd || "Password not matching",
          }}
        />
        <Pressable
          style={styles.pressable}
          onPress={handleSubmit(onRegisterPressed, onRegisterFailed)}
        >
          <Text>Register</Text>
        </Pressable>
      </View>
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
