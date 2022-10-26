import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { Text } from "react-native-paper";
import CustomInput from "../components/CustomInput";
import { selectChoreById } from "../features/chore/choreSelectors";
import { useTheme } from "../features/theme/ThemeContext";
import { useAppSelector } from "../hooks/reduxHooks";
import { RootStackParamList } from "../NavContainer";
type Props = NativeStackScreenProps<RootStackParamList, "EditChore">;

export default function EditChoreScreen({ route }: Props) {
    const { currentTheme } = useTheme();
    const [routeId] = useState(route.params.choreId);
    const chore = useAppSelector((state) => selectChoreById(state, routeId));
    const [openPoint, setOpenPoint] = useState(false);
    const [openFrequency, setOpenFrequency] = useState(false);
    const [frequencyValue, setFrequencyValue] = useState(chore.frequency);
    const [pointValue, setPointValue] = useState(chore.points);


    const onOpenFrequency = useCallback(() => {
        setOpenPoint(false);
    }, []);

    const onOpenPoint = useCallback(() => {
        setOpenFrequency(false);
    }, []);
    const [frequencyItems, setFrequencyItems] = useState([
        { label: "1", value: 1 },
        { label: "2", value: 2 },
        { label: "3", value: 3 },
        { label: "4", value: 4 },
        { label: "5", value: 5 },
        { label: "6", value: 6 },
        { label: "7", value: 7 },
    ]);
    const [pointItems, setPointItems] = useState([
        { label: "1", value: 1 },
        { label: "2", value: 2 },
        { label: "4", value: 4 },
        { label: "6", value: 6 },
        { label: "8", value: 8 },
    ]);

    const {
        control,
        handleSubmit,
        formState: { },
    } = useForm();

    const onEditPressed = () => {
        console.log("hello")
    };

    return (
        <View >
            <Text style={styles.title}>Edit Chore</Text>
            <View>
                <CustomInput
                    style={styles.input}
                    defaultValue={chore?.name}
                    placeholder='Title'
                    name='title'
                    control={control}
                    rules={{
                        required: "Title of chore is required",
                        minLength: { value: 2, message: "Must be 2 or more letters." },
                        maxLength: {
                            value: 100,
                            message: "Title can be maximum 100 letters.",
                        },
                    }}
                />
                <CustomInput
                    style={styles.input}
                    defaultValue={chore?.description}
                    placeholder='Description'
                    name='description'
                    control={control}
                    rules={{
                        required: "Description of chore is required",
                        minLength: { value: 2, message: "Must be 2 or more letters" },
                        maxLength: {
                            value: 1000,
                            message: "Cannot be longer than 1000 letters",
                        },
                    }}
                    multiline={true}
                    numOfLines={5}
                />
            </View>
            <View style={{ display: "flex", flexDirection: "row", marginVertical: 30 }}>
                <View
                    style={{
                        width: "45%",
                        paddingHorizontal: 10,
                    }}
                >
                    <Text>Frequency of chore</Text>
                    <DropDownPicker
                        style={styles.dropDownPicker}
                        listMode='SCROLLVIEW'
                        open={openFrequency}
                        onOpen={onOpenFrequency}
                        itemKey='value'
                        value={frequencyValue}
                        items={frequencyItems}
                        setOpen={setOpenFrequency}
                        setValue={setFrequencyValue}
                        setItems={setFrequencyItems}
                        closeOnBackPressed={true}
                        closeAfterSelecting={true}
                        theme={currentTheme.dark ? "DARK" : "LIGHT"}
                    />
                </View>
                <View
                    style={{
                        width: "45%",
                        paddingHorizontal: 10,
                    }}
                >
                    <Text>Difficulty of chore</Text>
                    <DropDownPicker
                        style={styles.dropDownPicker}
                        modalTitle='Select how difficult this task is'
                        listMode='SCROLLVIEW'
                        open={openPoint}
                        onOpen={onOpenPoint}
                        value={pointValue}
                        itemKey='value'
                        items={pointItems}
                        setOpen={setOpenPoint}
                        setValue={setPointValue}
                        setItems={setPointItems}
                        closeOnBackPressed={true}
                        closeAfterSelecting={true}
                        dropDownContainerStyle={{}}
                        theme={currentTheme.dark ? "DARK" : "LIGHT"}
                    />
                </View>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        paddingHorizontal: 30,
    },
    title: {
        fontSize: 50,
    },
    section: {
        borderRadius: 20,
        marginVertical: 10,
        padding: 30,
    },
    sectionLight: {
        backgroundColor: "#aaa",
    },
    sectionDark: {
        backgroundColor: "#333",
    },
    button: {},
    input: {},
    dropDownPicker: {},
});
