import { Text } from "react-native-paper";
import { View, StyleSheet } from "react-native";
import { Profile } from "../features/profile/profileTypes";
import { useAvatar } from "../hooks/useAvatar";
interface Props {
  profile: Profile;
}
export default function ProfileListItem({ profile }: Props) {
  const { emoji, color } = useAvatar(profile.avatar);
  return (
    <View style={styles.container} key={profile.id}>
      <Text style={styles.avatar}>{emoji}</Text>
      <Text style={{ textAlign: "center", backgroundColor: color }}>{profile.alias}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
  },
  avatar: {
    fontSize: 50,
    textAlign: "center",
  },
});
