import { ScrollView } from "react-native";
import React, { useState, useMemo, memo } from "react";
import { colors } from "../../constants/AppStyle";
import { IconButton } from "react-native-paper";
import { generateRandomNumberList } from "../../utils/generateRandomNumberList";

const widthTable: Record<any, any> = {
  3: 8,
  4: 7,
  5: 6,
  6: 5,
  7: 4.4,
};

export const TabButton = ({
  active,
  baseWidth,
  visible,
  onClick,
  success,
}: {
  active: boolean;
  baseWidth: number;
  visible: boolean;
  success: boolean;
  onClick: () => void;
}) => {
  let backgroundColor =
      visible && active ? colors["green-400"] : colors["blue-400"],
    icon = "";

  if (success) {
    if (active) {
      backgroundColor = colors["green-400"];
      icon = "check";
    } else {
      backgroundColor = colors["red-400"];
      icon = "window-close";
    }
  }

  return (
    <IconButton
      icon={icon}
      size={baseWidth * 5}
      iconColor={colors.white}
      style={{
        marginHorizontal: baseWidth * 0.5,
        marginVertical: baseWidth * 0.5,
        borderRadius: baseWidth,
        width: baseWidth * 10,
        height: baseWidth * 10,
        backgroundColor,
      }}
      onPress={visible || success ? undefined : onClick}
    />
  );
};

export const Task1Game: React.FC<{
  tiles: number;
  grid: number;
  visible: boolean;
  onSuccess: () => void;
  onError: () => void;
  [x: string]: any;
}> = memo(({ tiles, grid, visible, onSuccess, onError }) => {
  const baseWidth = widthTable[grid];
  const [{ clickedTiles }, setClickedTiles] = useState<{
    clickedTiles: number[];
  }>({
    clickedTiles: [],
  });

  const activeTiles = useMemo(
    () => generateRandomNumberList(tiles, grid * grid),
    [tiles, grid]
  );

  const onClickProvider = (idx: number) => () => {
    clickedTiles.push(idx);
    setClickedTiles({ clickedTiles });
    if (activeTiles.has(idx)) {
    } else {
      onError();
      return;
    }

    if (clickedTiles.length === tiles) onSuccess();
  };

  return (
    <ScrollView
      contentContainerStyle={{
        flexWrap: "wrap",
        flexDirection: "row",
        alignItems: "center",
        width: baseWidth * 11 * grid,
        height: baseWidth * 11 * grid,
      }}
    >
      {Array(grid * grid)
        .fill(0)
        .map((_, idx) => (
          <TabButton
            key={idx}
            baseWidth={baseWidth}
            visible={visible}
            active={activeTiles.has(idx)}
            success={clickedTiles.includes(idx)}
            onClick={onClickProvider(idx)}
          />
        ))}
    </ScrollView>
  );
});
