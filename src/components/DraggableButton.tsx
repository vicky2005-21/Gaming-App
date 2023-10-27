import React from "react";
import { PanGestureHandler } from "react-native-gesture-handler";

export const DraggableButton = ({
  children,
  onDrag,
  minDist,
  top,
  bottom,
  left,
  right,
}: {
  minDist: number;
  top: boolean;
  bottom: boolean;
  left: boolean;
  right: boolean;
  onDrag: (x: number, y: number) => void;
  children: React.ReactElement;
}) => {
  return (
    <PanGestureHandler
      minDist={minDist}
      onGestureEvent={({ nativeEvent: { translationX, translationY } }) => {
        // console.log({ translationX, translationY });

        if (translationX > 0 || translationY > 0) {
          if (translationX > translationY && !right) onDrag(1, 0);
          else if (translationY > translationX && !bottom) onDrag(0, 1);
        } else {
          if (translationX < translationY && !left) onDrag(-1, 0);
          else if (translationY < translationX && !top) onDrag(0, -1);
        }
      }}
    >
      {children}
    </PanGestureHandler>
  );
};
