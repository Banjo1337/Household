import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import { Profile } from "../features/profile/profileTypes";
import { useAvatar } from "../hooks/useAvatar";

interface Props {
  profile: Profile;
  handleSelectUser: (profile: Profile) => void;
}

export default function SelectProfileButton({ profile, handleSelectUser }: Props) {
  const { emoji, color } = useAvatar(profile.avatar);

  return (
    <View style={[styles.profilePortrait, { backgroundColor: color }]}>
      <TouchableOpacity onPress={() => handleSelectUser(profile)}>
        <Text style={styles.avatar}>{emoji}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  profilePortrait: {
    width: 150,
    height: 150,
    borderRadius: 75,
    justifyContent: "center",
    marginBottom: 15,
  },
  profilePortraitPressable: {
    height: "100%",
    width: "100%",
  },
  avatar: {
    fontSize: 50,
    textAlign: "center",
  },
});
