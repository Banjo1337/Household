import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { FieldValues, useForm } from "react-hook-form";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import CustomInput from "../components/CustomInput";
import { useTogglePasswordVisibility } from "../hooks/useTogglePasswordVisibility";
import { RootStackParamList } from "../NavContainer";
import { Button, Title } from "react-native-paper";

const PWD_REGEX =
  /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[]:;<>,.?~_+-=|).{6,32}$/;

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
  const { passwordVisibility, rightIcon, handlePasswordVisibility } =
    useTogglePasswordVisibility();
  const {
    control,
    handleSubmit,
    watch,
    formState: {},
  } = useForm({});
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
        <Title style={styles.title}>Sign Up Screen</Title>
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
        <Text style={styles.title}>Toggle password visibility</Text>
        <Pressable style={styles.pressable} onPress={handlePasswordVisibility}>
          <MaterialCommunityIcons name={rightIcon} size={22} color="#232323" />
        </Pressable>
        <CustomInput
          style={styles.input}
          placeholder="Password"
          name="password"
          control={control}
          secureTextEntry={passwordVisibility}
          rules={{
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password should be minimum 6 characters long",
            },
            pattern: {
              value: PWD_REGEX,
              message:
                "Password too weak. Requires: A number\nOne lower and one uppercase character.\nOne special character. Minimum length: 6.",
            },
          }}
        />
        <CustomInput
          style={styles.input}
          placeholder="Repeat password"
          name="passwordRepeat"
          control={control}
          secureTextEntry={passwordVisibility}
          rules={{
            required: "Repeat password",
            validate: (value: string) =>
              value === pwd || "Password not matching",
          }}
        />
        <Button
          style={styles.button}
          onPress={handleSubmit(onRegisterPressed, onRegisterFailed)}
        >
          Register
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
