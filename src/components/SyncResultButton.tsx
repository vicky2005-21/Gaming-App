import React, { useState } from "react";
import { Button } from "react-native-paper";
import { colors } from "../constants/AppStyle";
import { addItem } from "../lib/firbase";
import { useResultStore } from "../stores/useResultStore";
import { useUserIdStore } from "../stores/useUserIdStore";

export default function SyncResultButton() {
  const { result } = useResultStore.getState();
  const [loading, setLoading] = useState(false);
  const { userId } = useUserIdStore();

  const onPress = async () => {
    setLoading(true);

    if (userId) {
      result.userId = userId;
      await addItem("result", result);
    }

    setLoading(false);
  };
  return (
    <Button
      mode="contained"
      icon={loading ? "" : "autorenew"}
      loading={loading}
      theme={{ roundness: 1 }}
      style={{
        flex: 1,
        marginLeft: 10,
        backgroundColor: colors["orange-400"],
      }}
      onPress={onPress}
    >
      Sync Result
    </Button>
  );
}
