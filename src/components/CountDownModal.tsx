import React, { useState, useEffect, useRef } from "react";
import { Modal as PaperModal, Portal, Text } from "react-native-paper";
import { colors } from "../constants/AppStyle";

export const CountDownModal = ({ countDown = 10 }: { countDown?: number }) => {
  const [visible, setVisible] = useState(true);
  const [time, setTime] = useState(countDown);
  const timerRef = useRef(time);

  useEffect(() => {
    const timerId = setInterval(() => {
      timerRef.current -= 1;
      if (timerRef.current < 0) {
        clearInterval(timerId);
        setVisible(false);
      } else {
        setTime(timerRef.current);
      }
    }, 1000);
    return () => {
      clearInterval(timerId);
    };
  }, []);

  return (
    <Portal theme={{ colors: { primaryContainer: "transparent" } }}>
      <PaperModal
        visible={visible}
        onDismiss={() => {}}
        contentContainerStyle={{
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            fontSize: 100,
            fontWeight: "700",
            color: colors.white,
          }}
        >
          {time === 0 ? "🚀" : time}
        </Text>
      </PaperModal>
    </Portal>
  );
};
