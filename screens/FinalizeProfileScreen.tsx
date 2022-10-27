import { useState } from "react";
import { useForm } from "react-hook-form";
import { View, StyleSheet } from "react-native";
import { Title, Button } from "react-native-paper";
import CustomInput from "../components/CustomInput";
import { RootStackParamList } from "../NavContainer";
import { editProfile } from "../features/profile/profileSlice";
import AvatarSelectorItem from "../components/AvatarSelectorItem";
import { Avatar, Avatars } from "../features/profile/profileTypes";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { selectActiveProfile } from "../features/profile/profileSelector";
import { selectProfileByHousholdId } from "../features/household/householdSelectors";


export default function FinalizeProfileScreen(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  Props: NativeStackScreenProps<RootStackParamList, "FinalizeProfile">,
) {
  const dispatch = useAppDispatch();
  const profile = useAppSelector(selectActiveProfile);
  const householdProfiles = useAppSelector(selectProfileByHousholdId); 
  const [selectedAvatar, setSelectedAvatar] = useState<Avatar>(profile.avatar);
  const availableAvatars = Object.keys(Avatars)
    .filter(a => !householdProfiles
    .map(p => p.avatar)
    .includes(a as Avatar))
    .concat(profile.avatar)
    .map((a, index) => 
      <AvatarSelectorItem 
        key={index} 
        avatar={a as Avatar} 
        selectedAvatar={selectedAvatar} 
        handlePress={setSelectedAvatar}
      />
    );
  
  type FormValue= {
    name: string;
  }
    const {
    control,
    handleSubmit,
    formState: {},
  } = useForm<FormValue>({defaultValues: { name: profile.alias }});

  function submitProfileChanges(data: FormValue) {
    dispatch(editProfile({
      profileEditDto: 
      {
        alias: data.name,
        avatar: selectedAvatar
      }, 
        profileId: profile.id
    }));
  }

  return (
    <View style={styles.container} >
        <Title style={styles.title}>Select your avatar:</Title>
        <View style={styles.avatarContainer}>
            {availableAvatars}      
      </View>
      <Title style={styles.title}>Enter your new name:</Title>
      <View style={styles.formContainer}>
        <CustomInput
          placeholder='Name'
          name='name'
          control={control}
          defaultValue={control._defaultValues.name && ""}
          rules={{
            required: "Name is required",
            minLength: { value: 2, message: "Must be 2 or more letters." },
            maxLength: {
              value: 20,
              message: "Name can be maximum 20 letters.",
            },
          }}
        />
        <Button 
          mode="contained"
          onPress={handleSubmit(submitProfileChanges)}
          >
          <Title style={styles.title}>Save</Title>
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    width: "90%",
    height: "50%",
    marginLeft: "auto",
    marginRight: "auto",
    alignContent: "space-between",
    justifyContent: "space-between",
    
  },
  formContainer: {
    height: 200,
    justifyContent: "space-around"
  },
  avatarContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
    flexWrap: "wrap",
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    // alignContent: "center",
  },
  title: {
    fontWeight: "400",
    marginVertical: 20,
  }
});