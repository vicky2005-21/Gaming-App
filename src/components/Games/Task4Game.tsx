import React, { memo, useMemo, useState } from "react";
import { KeyboardAvoidingView, ScrollView, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { colors, radius } from "../../constants/AppStyle";
import { WordList } from "../../constants/wordList";
import { generateRandomNumberList } from "../../utils/generateRandomNumberList";

let store = new Set<string>(),
  store2 = new Set<string>();

export const Task4Game: React.FC<{
  countDown: number;
  wordsToShow: number;
  firstLevel: boolean;
  random: boolean;
  onSuccess: () => void;
  onError: () => void;
  next: () => void;
  [x: string]: any;
}> = memo(
  ({
    countDown,
    onSuccess,
    wordsToShow,
    next,
    firstLevel,
    random,
    setX,
    reset,
  }) => {
    const [words, setWords] = useState<string[]>([]);
    const [value, setValue] = useState("");

    const activeWords = useMemo(() => {
      let temp = new Set<string>();

      if (firstLevel || random)
        generateRandomNumberList(wordsToShow, WordList.length).forEach((x) => {
          temp.add(WordList[x]);
        });

      if (random) store2 = temp;
      else if (firstLevel) {
        store2.clear();
        store = temp;
      } else temp = store;

      if (temp.size === 0) reset();

      return temp;
    }, [wordsToShow]);
    console.log(activeWords);

    const onSumbit = (e: any) => {
      e.preventDefault();
      let word = value.trim().toLocaleLowerCase();

      if (words.includes(word)) {
        setValue("");
        return;
      }

      words.push(word);

      let z = false;

      setX((x: any) => {
        if (activeWords.has(word)) {
          x.correct++;
        } else {
          if (store2.size > 0 && store2.has(word)) x.intrusionB++;
          else if (random && store.has(word)) x.intrusionA++;
          else x.intrusion++;
        }

        if (x.correct === wordsToShow) z = true;

        return x;
      });

      setValue("");
      setWords(words);

      if (z) onSuccess();
    };

    return (
      <KeyboardAvoidingView
        style={{
          width: 300,
          flex: 1,
          maxHeight: 600,
        }}
      >
        {countDown > 0 ? (
          wordsToShow === 0 ? (
            <Text variant="titleLarge" style={{ textAlign: "center" }}>
              Try to remember as many words from first three levels.
            </Text>
          ) : (
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                marginTop: 20,
                width: 300,
                justifyContent: "center",
              }}
            >
              {Array.from(activeWords).map((i) => (
                <Text
                  variant="labelLarge"
                  key={i}
                  style={{
                    width: 140,
                    borderRadius: radius.m,
                    backgroundColor: colors["blue-100"],
                    margin: 5,
                    paddingVertical: 10,
                    textAlign: "center",
                  }}
                >
                  {i}
                </Text>
              ))}
            </View>
          )
        ) : (
          <>
            <Text
              variant="titleMedium"
              style={{
                marginBottom: 15,
              }}
            >
              Try to recall as many words as you can from the list.
            </Text>
            <TextInput
              mode="outlined"
              theme={{
                roundness: 10,
              }}
              underlineColor="transparent"
              style={{ width: 300 }}
              label="Word"
              placeholder="Enter words"
              value={value}
              onChangeText={(e) => setValue(e)}
              onSubmitEditing={onSumbit}
              returnKeyType="next"
              autoCapitalize="none"
              textContentType="emailAddress"
            />
            <ScrollView
              contentContainerStyle={{
                flexDirection: "row",
                flexWrap: "wrap",
                marginTop: 60,
                width: 300,
                minHeight: 200,
                justifyContent: "center",
              }}
            >
              {words.map((i) => (
                <Text
                  variant="labelLarge"
                  key={i}
                  style={{
                    width: 140,
                    borderRadius: radius.m,
                    backgroundColor: activeWords.has(i)
                      ? colors["green-400"]
                      : colors["red-400"],
                    margin: 5,
                    color: colors.white,
                    paddingVertical: 10,
                    textAlign: "center",
                  }}
                >
                  {i}
                </Text>
              ))}
            </ScrollView>
            <View style={{ flexDirection: "row", marginTop: -40 }}>
              <Button
                textColor={colors["red-400"]}
                onPress={reset}
                mode="outlined"
                style={{
                  flex: 1,
                  marginRight: 10,
                  borderColor: colors["red-400"],
                }}
              >
                Reset
              </Button>
              <Button
                mode="outlined"
                onPress={next}
                style={{
                  flex: 1,
                  marginLeft: 10,
                  borderColor: colors["blue-500"],
                }}
              >
                Finish
              </Button>
            </View>
          </>
        )}
      </KeyboardAvoidingView>
    );
  }
);
