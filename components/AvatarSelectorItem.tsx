import { StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import { Avatar } from "../features/profile/profileTypes";
import { useAvatar } from "../hooks/useAvatar";

interface Props {
  avatar: Avatar;
  handlePress: (avatar: Avatar) => void;
  selectedAvatar: Avatar;
}
export default function AvatarSelectorItem({ avatar, handlePress, selectedAvatar }: Props) {
  const avatarAttributes = useAvatar(avatar);

  return avatarAttributes ? (
    <TouchableOpacity
      onPress={() => handlePress(avatar)}
      style={[styles.bubble, selectedAvatar === avatar && styles.selectedAvatar, { backgroundColor: avatarAttributes.color }]}
    >
      <Text style={styles.avatar}>{avatarAttributes.emoji}</Text>
    </TouchableOpacity>
  ) : null;
}

const styles = StyleSheet.create({
  bubble: {
    width: 75,
    height: 75,
    borderRadius: 50,
    justifyContent: "center",
    marginVertical: 15,
  },
  avatar: {
    fontSize: 30,
    textAlign: "center",
  },
  selectedAvatar: {
    borderColor: "#37fab2",
    borderWidth: 2,
    shadowColor: "#000",
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },
});
