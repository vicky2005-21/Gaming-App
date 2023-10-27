import * as React from "react";
import { View } from "react-native";
import {
  Button,
  Modal as PaperModal,
  Portal,
  Text,
  TextInput,
} from "react-native-paper";
import { colors, radius } from "../constants/AppStyle";
import { useTaskProgress } from "../stores/useTaskProgress";
import { useUserIdStore } from "../stores/useUserIdStore";

export const SignInModal = ({ setVisible }: any) => {
  const { setUserId } = useUserIdStore();
  const [value, setValue] = React.useState("");
  const [error, setError] = React.useState("");
  const { resetTaskProgress } = useTaskProgress();

  const onSubmit = () => {
    if (parseInt(value).toString() !== value)
      return setError("Enter only numeric value");

    if (value.length < 5) return setError("UserId must have atleast 5 digits");

    setVisible((x: boolean) => !x);
    setUserId({ userId: value });
    resetTaskProgress();
  };

  return (
    <Portal theme={{ colors: { primaryContainer: "transparent" } }}>
      <PaperModal
        visible
        onDismiss={() => setVisible(false)}
        contentContainerStyle={{
          backgroundColor: "white",
          marginHorizontal: 20,
          borderRadius: radius.m,
          borderColor: colors["gray-500"],
          borderWidth: 0.7,
        }}
      >
        <View
          style={{
            padding: 20,
            borderBottomColor: colors["gray-600"],
            borderBottomWidth: 0.5,
          }}
        >
          <Text variant="titleLarge">Enter User_Id</Text>
        </View>
        <TextInput
          mode="outlined"
          value={value}
          error={!!error}
          label="User_Id"
          keyboardType="number-pad"
          onSubmitEditing={onSubmit}
          onChangeText={setValue}
          theme={{ roundness: 10 }}
          style={{ marginHorizontal: 20, marginVertical: 28 }}
        />
        <Text
          variant="labelMedium"
          style={{
            color: colors["red-700"],
            marginTop: -20,
            marginBottom: error ? 15 : 10,
            marginHorizontal: 30,
          }}
        >
          {error}
        </Text>
        <View
          style={{
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderTopColor: colors["gray-600"],
            borderTopWidth: 0.5,
            flexDirection: "row-reverse",
            backgroundColor: colors["gray-200"],
            borderBottomEndRadius: radius.m,
            borderBottomStartRadius: radius.m,
          }}
        >
          <Button
            mode="contained"
            onPress={onSubmit}
            style={{ backgroundColor: colors["green-400"], width: 120 }}
          >
            Submit
          </Button>
        </View>
      </PaperModal>
    </Portal>
  );
};
