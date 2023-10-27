import Toast from "react-native-toast-message";

export const showToast = (
  message1: string,
  type: "success" | "error" | "info" = "info",
  message2: string = ""
) => {
  console.log("showToast: ", message1);

  Toast.show({
    type,
    text1: message1,
    text2: message2,
    position: "bottom",
    bottomOffset: 20,
  });
};
