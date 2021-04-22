import React, { useCallback } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/core";

import { Button } from "components/Button";

import colors from "styles/colors";
import fonts from "styles/fonts";

interface Params {
  title: string;
  subTitle: string;
  buttonTitle: string;
  icon: "smile" | "hug";
  nextScreen: string;
}

const emojis = {
  smile: "😄",
  hug: "🤗",
};

export function Confirmation() {
  const { navigate } = useNavigation();
  const { params } = useRoute();

  const { title, subTitle, buttonTitle, icon, nextScreen } = params as Params;

  const handleMoveOn = useCallback(() => {
    navigate(nextScreen);
  }, [nextScreen, navigate]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.emoji}>{emojis[icon]}</Text>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subTitle}>{subTitle}</Text>
        <View style={styles.footer}>
          <Button title={buttonTitle} onPress={handleMoveOn} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    padding: 30,
  },
  title: {
    fontSize: 32,
    fontFamily: fonts.heading,
    textAlign: "center",
    color: colors.heading,
    lineHeight: 38,
    marginTop: 15,
  },
  subTitle: {
    fontFamily: fonts.text,
    textAlign: "center",
    fontSize: 17,
    paddingVertical: 10,
    color: colors.heading,
  },
  emoji: {
    fontSize: 78,
  },
  footer: {
    width: "100%",
    paddingHorizontal: 50,
    marginTop: 20,
  },
});
