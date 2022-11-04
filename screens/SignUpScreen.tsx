import { MaterialCommunityIcons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { FieldValues, useForm } from "react-hook-form";
import { Image, Pressable, ScrollView, StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import CustomInput from "../components/CustomInput";
import { useTheme } from "../features/theme/ThemeContext";
import { useTogglePasswordVisibility } from "../hooks/useTogglePasswordVisibility";
import { RootStackParamList } from "../NavContainer";

const PWD_REGEX = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@_$%^&*-]).{6,32}$/;

interface SignUpDto {
  username: string;
  password: string;
}

type SignUpResponse = {
  status: string;
  message: string;
};

const BASE_URL = "https://household-backend.azurewebsites.net/api/V01/Authenticate/";

export default function SignUpScreen({ navigation }: NativeStackScreenProps<RootStackParamList>) {
  const { passwordVisibility, rightIcon, handlePasswordVisibility } = useTogglePasswordVisibility();
  const {
    control,
    handleSubmit,
    watch,
    formState: { },
  } = useForm({});
  const pwd = watch("password");
  const { currentTheme } = useTheme();

  const onRegisterPressed = (data: FieldValues) => {
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

  const onSignInPressed = () => {
    navigation.navigate("SignIn");
  };

  async function signUp(signUpDto: SignUpDto) {
    {
      const response: Response = await PostSignUp(signUpDto);
      try {
        if (response.status != 200) {
          throw new Error("Httprequest to get token failed, response is not 200");
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
      return response;
    } catch (error) {
      console.log("Error in PostSignUp in SignUpScreen.tsx: ", error);
      return {} as Response;
    }
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        <Image style={styles.image} source={require("../assets/household.png")} />
        <CustomInput
          placeholder='Username'
          defaultValue=''
          name='username'
          control={control}
          rules={{
            required: "Username is required",
            minLength: { value: 4, message: "Must be minimum 4 " },
            maxLength: { value: 50, message: "Cant be more than 50 letters" },
          }}
        />
        <CustomInput
          placeholder='Password'
          name='password'
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
                "Minimum 6 characters, at least one uppercase letter, one lowercase letter, one number and one special character."
            },
          }}
        >
          <Pressable onPress={handlePasswordVisibility} style={styles.eye}>
            <MaterialCommunityIcons
              name={rightIcon}
              size={32}
              color={currentTheme.dark ? "#dedede" : "#232323"}
            />
          </Pressable>
        </CustomInput>

        <CustomInput
          placeholder='Repeat password'
          name='passwordRepeat'
          control={control}
          secureTextEntry={passwordVisibility}
          rules={{
            required: "Repeat password",
            validate: (value: string) => value === pwd || "Password not matching",
          }}
        />
        <View style={{ display: "flex", flexDirection: "row" }}>
          <Button
            mode='contained'
            style={[styles.button, { marginTop: 15 }]}
            onPress={handleSubmit(onRegisterPressed)}
          >
            <Text style={styles.text}>Register</Text>
          </Button>
          <Button
            mode='contained-tonal'
            style={[styles.button, { marginTop: 15 }]}
            onPress={onSignInPressed}
          >
            <Text style={styles.text}>Sign in</Text>
          </Button>
        </View>
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
  text: {
    fontWeight: "bold",
    textAlignVertical: "center",
    textAlign: "center",
    fontSize: 18,
  },
  input: { borderWidth: 2 },

  eye: { position: "absolute", right: 25, top: 25, zIndex: 1 },
  button: {
    width: "50%",
    height: 60,
    justifyContent: "center",
    margin: 3,
  },
});
