import { colors } from "./AppStyle";

export const task1 = {
  title: "Grid Task",
  color: colors["purple-400"],
  screen: "Task 1",
  instructionImgSrc: require("../assets/images/task-1.png"),
  instruction:
    "You will see a blue grid with some green squares.\n\nRemember the locations of the green squares.\n\nAfter the green squares disappear, tap on the squares where they used to be.\n\nWe will move on to the next task after two mistakes in a row.",
};

export const task2 = {
  title: "Digit Span",
  color: colors["red-500"],
  screen: "Task 2",
  instructionImgSrc: require("../assets/images/task-2.png"),
  instruction:
    "A series of numbers will be displayed.\n\nClick on the numbers in the same sequence as they were displayed.\n\nWe will move on to the next task after two mistakes in a row.",
};

export const task3 = {
  title: "Paired Association",
  color: colors["cyan-600"],
  screen: "Task 3",
  instructionImgSrc: require("../assets/images/task-3.png"),
  instruction:
    "You will see a few grey cards. There may be an item behind each card.\n\nThe cards with items will flip one by one.\n\nAn item will appear in the middle of the screen. Click on the grey card with matching item.\n\nWe will move on to the next task after two mistakes in a row.\n\n",
};

export const task4 = {
  title: "Word Recall",
  color: colors["indigo-500"],
  screen: "Task 4",
  instructionImgSrc: require("../assets/images/task-4.png"),
  instruction:
    "You will be given 15 seconds to look at list of 9 words (List A).\n\nAfter timer is up, type in as many words as you can remember from the list.\n\n",
};

export const task5 = {
  title: "Maze Game",
  color: colors["amber-800"],
  screen: "Task 5",
  instructionImgSrc: require("../assets/images/task-5.png"),
  instruction:
    "You will see a maze displayed.\n\nDrag the pacman icon to collect all the cherries, then exit at the letter E.\n\nYou can click on the “I Give Up” button at any time to end this task.",
};
