import { BaseToast, ErrorToast, InfoToast } from "react-native-toast-message";
import { colors, radius } from "../constants/AppStyle";

const text1Style = {
  fontSize: 14,
  letterSpacing: 1.4,
  fontFamily: "Inter-Regular",
  fontWeight: "400",
  textAlign: "left",
  color: colors.text,
};

const defaultStyle = (bgColor: string) => ({
  backgroundColor: bgColor,
  borderLeftWidth: 0,
  borderRadius: radius.s,
  height: 52,
  marginBottom: 10,
  width: "95%",
  maxWidth: 400,
});

export const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      style={[defaultStyle("#1CAC78"), {}]}
      text1Style={text1Style}
      text1NumberOfLines={2}
    />
  ),

  error: (props: any) => (
    <ErrorToast
      {...props}
      style={defaultStyle(colors["red-400"])}
      text1Style={text1Style}
      text1NumberOfLines={2}
    />
  ),

  info: (props: any) => (
    <InfoToast
      {...props}
      style={defaultStyle(colors["blue-500"])}
      text1Style={text1Style}
      text1NumberOfLines={2}
    />
  ),
};
