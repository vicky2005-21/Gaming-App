import React from "react";
import { View } from "react-native";
import { Text, IconButton } from "react-native-paper";
import { colors } from "../constants/AppStyle";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import type { DrawerHeaderProps } from "@react-navigation/drawer";

export const Header = ({
  navigation,
  back = false,
  title = "CREaiTORS",
}: DrawerHeaderProps & { back: boolean; title: string }) => {
  const inset = useSafeAreaInsets();

  return (
    <View
      style={{
        height: 55,
        borderBottomColor: colors["gray-500"],
        borderBottomWidth: 0.5,
        position: "relative",
        marginTop: inset.bottom,
      }}
    >
      {back ? (
        <IconButton
          iconColor="black"
          icon="arrow-left"
          onPress={() => navigation.goBack()}
        />
      ) : navigation.openDrawer ? (
        <IconButton
          iconColor="black"
          icon="menu"
          style={{ marginLeft: 10 }}
          onPress={navigation.openDrawer}
        />
      ) : null}
      <Text
        variant="labelLarge"
        style={{
          fontSize: 18,
          textAlign: "center",
          position: "absolute",
          height: "100%",
          width: "100%",
          zIndex: -1,
          paddingTop: 18,
        }}
      >
        {title}
      </Text>
    </View>
  );
};
