import React, { memo, useMemo, useState } from "react";
import { View } from "react-native";
import { IconButton, Text } from "react-native-paper";
import { colors } from "../../constants/AppStyle";
import { IconList } from "../../constants/IconList";
import { generateRandomNumberList } from "../../utils/generateRandomNumberList";

const widthTable: Record<number, number> = {
  3: 8,
  4: 7,
  5: 6,
  6: 5,
  7: 4.4,
};

export const TabButton = ({
  active,
  baseWidth,
  iconSource: { icon = "", color },
  visible,
  onClick,
  success,
}: {
  active: boolean;
  success: boolean;
  iconSource: { icon?: string; color?: string };
  baseWidth: number;
  visible: boolean;
  onClick: () => void;
}) => {
  let backgroundColor = active ? colors["gray-300"] : colors.white;

  if (success) {
    if (icon.length) {
      backgroundColor = colors["green-400"];
      icon = "check";
    } else {
      backgroundColor = colors["red-400"];
      icon = "window-close";
    }
  }

  return (
    <IconButton
      icon={visible || success ? icon : ""}
      iconColor={success ? colors.white : color}
      size={baseWidth * 8}
      style={{
        marginHorizontal: baseWidth * 0.5,
        marginVertical: baseWidth * 0.5,
        borderRadius: baseWidth,
        width: baseWidth * 10,
        height: baseWidth * 10,
        backgroundColor,
      }}
      onPress={visible || !active || success ? undefined : onClick}
    />
  );
};

export const Task3Game: React.FC<{
  cards: number;
  images: number;
  countDown: number;
  grid: number;
  onSuccess: () => void;
  onError: () => void;
  [x: string]: any;
}> = memo(({ cards, images, grid, countDown, onSuccess, onError }) => {
  const visible = countDown > 0;
  const [iconIdx, setIconIdx] = useState(0);
  const baseWidth = widthTable[grid];
  let i = 0,
    j = 0;
  setIconIdx;
  const activeCards = useMemo(
    () => generateRandomNumberList(cards, grid * grid),
    [cards, grid]
  );

  const [activeImages, icons] = useMemo(
    () => [
      generateRandomNumberList(images, cards),
      Array.from(generateRandomNumberList(images, IconList.length)).map(
        (x) => IconList[x]
      ),
    ],
    [images, cards]
  );

  return (
    <>
      {visible ? (
        <Text
          style={{
            marginTop: -100,
            marginBottom: 75,
            fontSize: 32,
            height: baseWidth * 10 + 16,
          }}
        >
          {countDown}
        </Text>
      ) : (
        <IconButton
          icon={icons[iconIdx].icon}
          style={{
            marginTop: -100,
            marginBottom: 75,
          }}
          size={baseWidth * 10}
          iconColor={icons[iconIdx].color}
        />
      )}
      <View
        style={{
          marginBottom: 20,
          flexDirection: "row",
          width: 300,
        }}
      >
        <Text style={{ flex: 1 }} variant="titleMedium">
          Cards: {cards}
        </Text>
        <Text variant="titleMedium">Images: {images}</Text>
      </View>
      <View
        style={{
          flexWrap: "wrap",
          flexDirection: "row",
          alignItems: "center",
          width: baseWidth * 11 * grid,
          height: baseWidth * 11 * grid,
        }}
      >
        {Array(grid * grid)
          .fill(0)
          .map((_, idx) => {
            const active = activeCards.has(idx),
              hasIcon = active && activeImages.has(i++),
              currIconIdx = hasIcon ? j++ : 1000;

            return (
              <TabButton
                onClick={() => {
                  if (currIconIdx === iconIdx) {
                    if (iconIdx === images - 1) onSuccess();
                    else setIconIdx((i) => i + 1);
                  } else {
                    onError();
                    return;
                  }
                }}
                visible={visible}
                active={active}
                success={currIconIdx < iconIdx}
                iconSource={hasIcon ? icons[currIconIdx] : {}}
                key={idx}
                baseWidth={baseWidth}
              />
            );
          })}
      </View>
    </>
  );
});
