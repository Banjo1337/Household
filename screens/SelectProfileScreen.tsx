import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Pressable, View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { createProfile, setActiveProfile } from "../features/profile/profileSlice";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { RootStackParamList } from "../NavContainer";
import { Profile } from "../features/profile/profileTypes";
import { useGetProfilesFromUserIdQuery } from "../features/profile/profileApiSlice";
import React from "react";
import SelectProfileButton from "../components/SelectProfileButton";
import { ActivityIndicator } from "react-native-paper";

export default function SelectProfileScreen({
	navigation,
}: NativeStackScreenProps<RootStackParamList, "SelectProfile">) {
	const dispatch = useAppDispatch();
	const authUserId = useAppSelector((state) => state.authenticateUserReducer.authUserId);
	const profiles = useGetProfilesFromUserIdQuery(authUserId).currentData;
	const { isLoading } = useGetProfilesFromUserIdQuery(authUserId);

	function handleSelectUser(profile: Profile) {
		dispatch(setActiveProfile(profile));
	}

	let mockDataIfProfilesIsEmpty: Profile[];

	if (profiles) {
		mockDataIfProfilesIsEmpty = profiles;
	} else {
		mockDataIfProfilesIsEmpty = [
			{
				id: "1",
				avatar: "fox",
				isAdmin: false,
				householdId: "abc",
				authUserId: "abc",
				alias: "alias",
				pendingRequest: false,
			},
			{
				id: "2",
				avatar: "pig",
				isAdmin: false,
				householdId: "abc",
				authUserId: "abc",
				alias: "alias",
				pendingRequest: false,
			},
			{
				id: "3",
				avatar: "frog",
				isAdmin: false,
				householdId: "abc",
				authUserId: "abc",
				alias: "alias",
				pendingRequest: false,
			},
			// {
			//   id: "4",
			//   avatar: "chicken",
			//   isAdmin: false,
			//   householdId: "abc",
			//   authUserId: "abc",
			//   alias: "alias",
			//   pendingRequest: false,
			// },
			// {
			//   id: "5",
			//   avatar: "octopus",
			//   isAdmin: false,
			//   householdId: "abc",
			//   authUserId: "abc",
			//   alias: "alias",
			//   pendingRequest: false,
			// },
			// {
			//   id: "6",
			//   avatar: "dolphin",
			//   isAdmin: false,
			//   householdId: "abc",
			//   authUserId: "abc",
			//   alias: "alias",
			//   pendingRequest: false,
			// },
			// {
			//   id: "7",
			//   avatar: "owl",
			//   isAdmin: false,
			//   householdId: "abc",
			//   authUserId: "abc",
			//   alias: "alias",
			//   pendingRequest: false,
			// },
			// {
			//   id: "8",
			//   avatar: "unicorn",
			//   isAdmin: false,
			//   householdId: "abc",
			//   authUserId: "abc",
			//   alias: "alias",
			//   pendingRequest: false,
			// },
		];
	}

	return (
		<View style={styles.profileContainer}>
			{isLoading ? (
				<ActivityIndicator size='large' />
			) : (
				<>
					{mockDataIfProfilesIsEmpty?.map((p) => (
						<SelectProfileButton key={p.id} profile={p} handleSelectUser={handleSelectUser} />
					))}
					<View style={[styles.profilePortrait, { backgroundColor: "#474747" }]}>
						<Pressable onPress={() => navigation.navigate("CreateProfile")}>
							<Text style={styles.avatar}>➕</Text>
						</Pressable>
					</View>
				</>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	profileContainer: {
		flexDirection: "row",
		flexWrap: "wrap",
		alignContent: "center",
		height: "100%",
		justifyContent: "space-around",
	},
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
