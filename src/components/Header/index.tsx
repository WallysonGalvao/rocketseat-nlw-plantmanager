import React from "react";
import { Text, StyleSheet, Image, View } from "react-native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";

import colors from "styles/colors";
import fonts from "styles/fonts";

export function Header() {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.greeting}>Olá,</Text>
        <Text style={styles.userName}>Wallyson</Text>
      </View>

      <Image
        style={styles.image}
        source={{ uri: "https://avatars.githubusercontent.com/u/14004866?v=4" }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
    marginTop: getStatusBarHeight(),
  },
  greeting: {
    color: colors.heading,
    fontSize: 32,
    fontFamily: fonts.text,
  },
  userName: {
    color: colors.heading,
    fontSize: 32,
    fontFamily: fonts.heading,
    lineHeight: 40,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
});
