import generator from "../../utils/generateMaze";
import React, { memo, useMemo, useState } from "react";
import { Image, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Button, Text } from "react-native-paper";
import { colors } from "../../constants/AppStyle";
import { useCountDown } from "../../hooks/useCountDown";
import { generateRandomNumberList } from "../../utils/generateRandomNumberList";
import { DraggableButton } from "../DraggableButton";

const widthTable: Record<number, number> = {
  3: 8,
  4: 7,
  5: 6,
  6: 5,
  7: 4.4,
  8: 4,
  9: 3.6,
  10: 3.2,
};

export const Box = ({
  baseWidth,
  bottom,
  top,
  left,
  right,
  value,
  onDrag,
  active,
  exit,
  fruitPos,
}: {
  fruitPos: Set<number>;
  baseWidth: number;
  value: number;
  [x: string]: any;
}) => {
  return (
    <View
      style={{
        borderWidth: 1.1,
        margin: -0.5,
        position: "relative",
        zIndex: 6,
        borderBottomColor: right ? colors.black : colors["gray-100"],
        borderTopColor: left ? colors.black : colors["gray-100"],
        borderLeftColor: top ? colors.black : colors["gray-100"],
        borderRightColor: bottom ? colors.black : colors["gray-100"],
        width: baseWidth * 11,
        height: baseWidth * 11,
      }}
    >
      {active ? (
        <DraggableButton
          minDist={baseWidth}
          top={left}
          bottom={right}
          left={top}
          right={bottom}
          onDrag={onDrag}
        >
          <View
            style={{
              padding: baseWidth * 3,
              width: baseWidth * 14,
              height: baseWidth * 14,
              margin: baseWidth * -2,
            }}
          >
            <Image
              source={require("../../assets/images/pacman.png")}
              style={{
                width: baseWidth * 7,
                height: baseWidth * 7,
                margin: baseWidth * 1 - 1.1,
              }}
            />
          </View>
        </DraggableButton>
      ) : null}
      {fruitPos.has(value) ? (
        <Image
          source={require("../../assets/images/fruit.png")}
          style={{
            width: baseWidth * 7,
            height: baseWidth * 7,
            margin: baseWidth * 2,
          }}
        />
      ) : null}
      {exit ? (
        <Image
          source={require("../../assets/images/trophy.png")}
          style={{
            width: baseWidth * 6,
            height: baseWidth * 6,
            margin: baseWidth * 2.5,
          }}
        />
      ) : null}
    </View>
  );
};

export const Task5Game: React.FC<{
  grid: number;
  images: number;
  timer: number;
  onSuccess: () => void;
  onError: () => void;
  reset: () => void;
}> = memo(({ images, grid, timer, onSuccess, onError, reset }) => {
  const [posX, setPosX] = useState(0);
  const [posY, setPosY] = useState(0);
  const { countDown } = useCountDown(timer);

  if (countDown === 0) onError();

  const size = grid * grid - 1;
  const baseWidth = widthTable[grid] || 3;

  const mazeMap: any[][] = useMemo(
    () => generator(grid, grid, true, Math.round(Math.random() * 100000)),
    [grid]
  );

  const fruitPos = useMemo(
    () => generateRandomNumberList(images, size, 1),
    [images, grid]
  );

  const onChange = (x: number, y: number) => {
    x += posX;
    y += posY;

    const pos = x * grid + y;

    if (fruitPos.has(pos)) fruitPos.delete(pos);

    if (pos === size) {
      if (fruitPos.size === 0) {
        onSuccess();
      } else onError();
    }

    setPosX(x);
    setPosY(y);
  };

  return (
    <GestureHandlerRootView
      style={{
        flexGrow: 3,
        justifyContent: "space-between",
      }}
    >
      <Text
        variant="headlineLarge"
        style={{ marginBottom: 50, textAlign: "center" }}
      >
        Time Left:
        <Text
          variant="headlineLarge"
          style={{
            color: colors["blue-600"],
            fontWeight: "700",
            letterSpacing: 1.4,
            fontSize: 24,
          }}
        >
          {" "}
          {countDown}
        </Text>
      </Text>
      <View
        pointerEvents="box-none"
        style={{
          flexWrap: "wrap",
          flexDirection: "row",
          alignItems: "center",
          position: "relative",
          backgroundColor: colors["gray-100"],
          width: baseWidth * 11 * grid + 1.5 - 1 * grid,
          height: baseWidth * 11 * grid + 1.5 - 1 * grid,
          borderWidth: 0.7,
          marginTop: -50,
        }}
      >
        {mazeMap.map((row, idx_x) => (
          <View key={idx_x}>
            {row.map((col, idx_y: number) => (
              <Box
                key={idx_y}
                value={idx_x * grid + idx_y}
                active={idx_x === posX && idx_y === posY}
                onDrag={onChange}
                fruitPos={fruitPos}
                baseWidth={baseWidth}
                exit={
                  idx_x * grid + idx_y === size &&
                  !(posX === idx_x && posY === idx_y)
                }
                {...col}
              />
            ))}
          </View>
        ))}
      </View>
      <Button onPress={reset} labelStyle={{ fontSize: 18 }}>
        Reset
      </Button>
    </GestureHandlerRootView>
  );
});
