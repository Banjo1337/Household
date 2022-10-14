import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { useForm } from "react-hook-form";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import CustomInput from "../components/CustomInput";
import { RootStackParamList } from "../NavContainer";

//Skall nog inte användas. Skall tjuvkolla på reactnative forms i puppy appen. :)
// type SignUpFormType = {
//   [fieldName: string]: string;
// };

// interface SignUpFormData {
//   username: string;
//   password: string;
//   passwordConfirmation: string;
// }

export default function SignUpScreen(Props: NativeStackScreenProps<RootStackParamList, "SignUp">) {
  // const [fields, setFields] = useState<SignUpFormData>({
  //   username: "",
  //   password: "",
  //   passwordConfirmation: "",
  // });
  const { control, handleSubmit, watch } = useForm({});
  const pwd = watch("password");

  const onRegisterPressed = (data: any) => {
    alert(data.username + data.password)
  };
  const onRegisterFailed = () => {
    alert("Failed")
  };


  // const dispatch = useAppDispatch();

  //on submit something something...med RTK query
  //const reply: SignUpReplyType = await signUpHttpRequestAsync(dispatch, { username, email, password });

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <Text style={styles.title}>Create an account</Text>
        <CustomInput
          placeholder='Username'
          name='username'
          control={control}
          rules={{ required: "Username is required" }}
        />
        <CustomInput
          placeholder='Password'
          name='password'
          control={control}
          secureTextEntry
        />
        <CustomInput
          placeholder='Repeat password'
          name='passwordRepeat'
          control={control}
          secureTextEntry
          rules={{
            required: "Repeat password",
            validate: (value: any) => value === pwd || "Password not matching",
          }}
        />
        <Pressable style={styles.pressable} onPress={handleSubmit(onRegisterPressed, onRegisterFailed)}>
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
    borderColor: "black"
  }
});