import { createDrawerNavigator } from "@react-navigation/drawer";
import {
  DefaultTheme as NavigatorTheme,
  NavigationContainer,
} from "@react-navigation/native";
import React, { useEffect, useRef } from "react";
import { StatusBar } from "react-native";
import { DrawerContent } from "./components/DrawerContent";
import { Header } from "./components/Header";
import { TaskInstructionView } from "./components/TaskInstructionView";
import { colors } from "./constants/AppStyle";
import { task1, task2, task3, task4, task5 } from "./constants/tasks";
import ActivityLogs from "./screens/ActivityLogs";
import { HomePage } from "./screens/HomePage";
import LandingScreen from "./screens/LandingScreen";
import Task1 from "./screens/Task1";
import Task2 from "./screens/Task2";
import Task3 from "./screens/Task3";
import Task4 from "./screens/Task4";
import Task5 from "./screens/Task5";
import Result from "./screens/Result";
import { useActivityLog } from "./stores/useActivityLog";
import { useTaskProgress } from "./stores/useTaskProgress";

const Drawer = createDrawerNavigator();

NavigatorTheme.colors.background = colors.white;

const tasks = [task1, task2, task3, task4, task5];
const games = [Task1, Task2, Task3, Task4, Task5];

const setStatusbarColor = (name: string) => {
  if (name.includes("Task 1")) return task1.color;
  if (name.includes("Task 2")) return task2.color;
  if (name.includes("Task 3")) return task3.color;
  if (name.includes("Task 4")) return task4.color;
  if (name.includes("Task 5")) return task5.color;

  return colors["blue-600"];
};

export const MainNavigator = () => {
  const ref = useRef("");
  const { addActivity } = useActivityLog((s) => s);
  const {
    updateTaskProgress,
    taskProgress: [_1, _2, _3, { currLevel, totalLevel }],
  } = useTaskProgress();

  useEffect(() => {
    StatusBar.setBarStyle("light-content");
    addActivity("App Launced");

    return () => {
      addActivity("App Closed!");
    };
  }, []);

  return (
    <NavigationContainer
      theme={NavigatorTheme}
      onStateChange={(e) => {
        const name = e?.routeNames[e.index] || "";

        if (ref.current === name) return;
        if (name === "Task 4 Game" && currLevel !== totalLevel)
          updateTaskProgress(4, { currLevel: 0 });

        if (ref.current.includes("Game")) {
          addActivity(`Moved out of ${ref.current} screen to ${name}`);
        } else {
          addActivity(`Moved to Screen "${name}"`);
        }

        ref.current = name;
        StatusBar.setBackgroundColor(setStatusbarColor(name));
      }}
    >
      <Drawer.Navigator
        initialRouteName="Landing Page"
        backBehavior="history"
        drawerContent={DrawerContent}
      >
        <Drawer.Screen
          name="Landing Page"
          options={{ headerShown: false }}
          component={LandingScreen}
        />
        <Drawer.Screen
          name="Home Page"
          options={{ headerShown: false }}
          component={HomePage}
        />
        {tasks.map((task) => (
          <Drawer.Screen
            key={task.screen}
            name={task.screen}
            options={{
              header: (props) => <Header {...props} back title={task.screen} />,
            }}
          >
            {({ route: { params } }) => (
              <TaskInstructionView task={task} params={params} />
            )}
          </Drawer.Screen>
        ))}
        {games.map((Task, idx) => (
          <Drawer.Screen
            navigationKey={Math.random().toString()}
            key={tasks[idx].screen + " Game"}
            name={tasks[idx].screen + " Game"}
            options={{ headerShown: false, swipeEnabled: false }}
          >
            {({ route: { params } }) => <Task key={(params as any)?.key} />}
          </Drawer.Screen>
        ))}
        <Drawer.Screen
          name="Result"
          options={{
            header: (props) => <Header {...props} back title="Result" />,
          }}
          component={Result}
        />
        <Drawer.Screen
          name="ActivityLogs"
          options={{
            header: (props) => <Header {...props} back title="Activity Logs" />,
          }}
          component={ActivityLogs}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};
