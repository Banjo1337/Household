import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View } from "react-native";
import { Title } from "react-native-paper";
import { RootStackParamList } from "../NavContainer";
import { SignUpReplyType } from "../features/authentication/authenticationTypes";
import { useState } from "react";

type SignUpFormType = {
  [fieldName: string]: string;
};

interface SignUpFormData {
  username: string;
  password: string;
  passwordConfirmation: string;
}

export default function SignUpScreen(Props: NativeStackScreenProps<RootStackParamList, "SignUp">) {
  const [fields, setFields] = useState<SignUpFormData>({
    username: "",
    password: "",
    passwordConfirmation: "",
  });
  const dispatch = useAppDispatch();

  return (
    <View>
      <Title>Hello from SignUpScreen</Title>
    </View>
  );
}
