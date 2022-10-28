import { Text } from "react-native-paper";
import { StyleSheet, TouchableOpacity } from "react-native";
import { useAvatar } from "../hooks/useAvatar";
import { Avatar } from "../features/profile/profileTypes";

interface Props {
  avatar: Avatar;
  handlePress: (avatar: Avatar) => void;
  selectedAvatar: Avatar;
}
export default function AvatarSelectorItem({ avatar, handlePress, selectedAvatar }: Props) {
  // Lite fult men ternaryn är bara så komponenten inte crashar efter man deletat sin profil och innan navigatorn hunnit backa ut
  const { emoji, color } = useAvatar(avatar ? avatar : "unicorn");
  
  return (
    <TouchableOpacity
      onPress={() => handlePress(avatar)}
      style={[styles.bubble, selectedAvatar === avatar && styles.selectedAvatar, { backgroundColor: color }]}
    >
    <Text style={styles.avatar}>{emoji}</Text>
    </TouchableOpacity>
  );
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
