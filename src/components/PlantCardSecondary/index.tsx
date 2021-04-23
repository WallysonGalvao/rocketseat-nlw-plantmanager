import React, { useCallback } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import {
  RectButton,
  RectButtonProps,
  Swipeable,
} from "react-native-gesture-handler";
import { SvgFromUri } from "react-native-svg";
import { Feather } from "@expo/vector-icons";

import { PlantProps } from "libs/storage";

import colors from "styles/colors";
import fonts from "styles/fonts";

interface PlantCardSecondaryProps extends RectButtonProps {
  data: PlantProps;
  handleRemove: () => void;
}

export const PlantCardSecondary = ({
  data,
  handleRemove,
  ...rest
}: PlantCardSecondaryProps) => {
  const renderRightActions = () => {
    return (
      <Animated.View>
        <View>
          <RectButton style={styles.buttonRemove} onPress={handleRemove}>
            <Feather name="trash" color={colors.white} size={32} />
          </RectButton>
        </View>
      </Animated.View>
    );
  };

  return (
    <Swipeable overshootRight={false} renderRightActions={renderRightActions}>
      <RectButton style={styles.container} {...rest}>
        <SvgFromUri uri={data.photo} width={50} height={50} />
        <Text style={styles.title}>{data.name}</Text>
        <View style={styles.details}>
          <Text style={styles.timeLabel}>Regas às</Text>
          <Text style={styles.time}>{data.hour}</Text>
        </View>
      </RectButton>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 10,
    paddingVertical: 25,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.shape,
    marginVertical: 5,
  },
  title: {
    flex: 1,
    marginLeft: 10,
    fontFamily: fonts.heading,
    fontSize: 17,
    color: colors.heading,
  },
  details: {
    alignItems: "flex-end",
  },
  timeLabel: {
    marginTop: 5,
    fontSize: 16,
    fontFamily: fonts.text,
    color: colors.body_light,
  },
  time: {
    marginTop: 5,
    fontSize: 16,
    fontFamily: fonts.heading,
    color: colors.body_dark,
  },
  buttonRemove: {
    width: 100,
    height: 85,
    backgroundColor: colors.red,
    marginTop: 15,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    right: 20,
    paddingLeft: 15,
  },
});
