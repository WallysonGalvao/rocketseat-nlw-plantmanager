import React, { useCallback } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import { Feather } from "@expo/vector-icons";

import wateringImg from "assets/watering.png";
import colors from "styles/colors";
import fonts from "styles/fonts";

const { width } = Dimensions.get("window");

export function Welcome() {
  const { navigate } = useNavigation();

  const handleStart = useCallback(() => {
    navigate("UserIdentification");
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.title}>
          Gerencie{"\n"} suas plantas de{"\n"} forma fácil
        </Text>

        <Image style={styles.image} source={wateringImg} resizeMode="contain" />

        <Text style={styles.subTitle}>
          Não esqueça mais de regar suas plantas. Nós cuidamos de lembrar você
          sempre que precisar.
        </Text>

        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.7}
          onPress={handleStart}
        >
          <Feather name="chevron-right" style={styles.buttonIcon} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    color: colors.heading,
    marginTop: 38,
    fontFamily: fonts.heading,
    lineHeight: 34,
  },
  image: {
    height: width * 0.7,
  },
  subTitle: {
    fontSize: 18,
    textAlign: "center",
    paddingHorizontal: 20,
    color: colors.heading,
    fontFamily: fonts.text,
  },
  button: {
    backgroundColor: colors.green,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    marginBottom: 10,
    width: 56,
    height: 56,
  },
  buttonIcon: {
    color: colors.white,
    fontSize: 32,
  },
});
