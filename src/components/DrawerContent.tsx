import { DrawerContentScrollView } from "@react-navigation/drawer";
import * as React from "react";
import { Image, StyleSheet, View } from "react-native";
import { Button, Drawer, Text } from "react-native-paper";
import { colors, radius } from "../constants/AppStyle";
import { useResultStore } from "../stores/useResultStore";
import { useTaskProgress } from "../stores/useTaskProgress";
import { useUserIdStore } from "../stores/useUserIdStore";

const DrawerItemsData = [
  {
    label: "Home",
    activeIcon: "home-variant",
    icon: "home-variant-outline",
    action: "Home Page",
  },
  {
    label: "Activity Log",
    activeIcon: "clipboard-list",
    icon: "clipboard-list-outline",
    action: "ActivityLogs",
  },
];

export const DrawerContent = ({ navigation, state }: any) => {
  const { userId } = useUserIdStore();

  let activeRoute = "";
  if (!isNaN(state.index) && state.routes.length > 0)
    activeRoute = state.routes[state.index].name || "";

  const { resetTaskProgress } = useTaskProgress();
  const { resetResult } = useResultStore();
  const { logout } = useUserIdStore();

  return (
    <>
      <DrawerContentScrollView style={styles.drawerContent}>
        <View
          style={{
            width: "100%",
            alignItems: "center",
            paddingVertical: 20,
            paddingHorizontal: 16,
            borderBottomWidth: 0.5,
            borderBottomColor: colors["gray-500"],
          }}
        >
          <Image
            source={require("../assets/icon.png")}
            style={{ width: 150, height: 150, marginBottom: 20 }}
          />
          <View
            style={{
              backgroundColor: colors["gray-200"],
              borderRadius: radius.m,
              paddingVertical: 15,
              width: "100%",
              paddingLeft: 20,
            }}
          >
            <Text
              variant="titleMedium"
              style={{
                fontSize: 18,
                marginBottom: 3,
                color: colors["blue-600"],
              }}
            >
              {userId}
            </Text>
            <Text variant="labelMedium" style={{ color: colors["gray-700"] }}>
              UserId
            </Text>
          </View>
        </View>
        <View
          style={{
            flexGrow: 1,
            flex: 1,
            marginVertical: 20,
            marginHorizontal: 6,
          }}
        >
          {DrawerItemsData.map((props, index) => (
            <Drawer.Item
              theme={{
                colors: { secondaryContainer: colors["light-blue-100"] },
              }}
              key={index}
              label={props.label}
              style={{ marginBottom: 8 }}
              active={activeRoute === props.action}
              icon={
                activeRoute === props.action ? props.activeIcon : props.icon
              }
              onPress={() => navigation.navigate(props.action)}
            />
          ))}
        </View>
      </DrawerContentScrollView>
      <Button
        onPress={() => {
          resetResult();
          resetTaskProgress();
          logout();
        }}
        mode="contained"
        icon="logout-variant"
        theme={{ roundness: 0 }}
        labelStyle={{ paddingVertical: 5 }}
        style={{ backgroundColor: colors["red-400"] }}
      >
        Logout
      </Button>
    </>
  );
};

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  badge: {
    alignSelf: "center",
  },
});
