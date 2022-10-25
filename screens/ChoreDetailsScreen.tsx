import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { ScrollView } from "react-native";
import { Card, Paragraph, Title } from "react-native-paper";
import { selectChoreById } from "../features/chore/choreSelectors";
import { useAppSelector } from "../hooks/reduxHooks";
import { RootStackParamList } from "../NavContainer";

type Props = NativeStackScreenProps<RootStackParamList, "ChoreDetails">;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function ChoreDetailsScreen({ route, navigation }: Props) {
  const [routeId] = useState(route.params.choreId);
  const chore = useAppSelector((state) => selectChoreById(state, routeId));

  return (
    <>
      <ScrollView style={{ height: "100%" }}>
        <Card elevation={1}>
          <Card.Content>
            <Title>{chore?.name}</Title>
            <Paragraph>description: {chore?.description}</Paragraph>
          </Card.Content>
        </Card>
      </ScrollView>
    </>
  );
}
