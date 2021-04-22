import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, FlatList } from "react-native";
import { formatDistance } from "date-fns";
import { pt } from "date-fns/locale";

import { Header } from "components/Header";
import { PlantCardSecondary } from "components/PlantCardSecondary";

import { loadPlant, PlantProps } from "libs/storage";

import colors from "styles/colors";
import fonts from "styles/fonts";

import waterdrop from "assets/waterdrop.png";

export function MyPlants() {
  const [myPlants, setMyPlants] = useState<PlantProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [nextWaterd, setNextWatered] = useState<string>();

  const keyExtractorPlants = (item: PlantProps) => String(item.id);

  const renderItemPlants = ({ item }: { item: PlantProps }) => {
    return <PlantCardSecondary data={item} />;
  };

  const loadStorageData = useCallback(async () => {
    const plantsStoraged = await loadPlant();

    const nextTime = formatDistance(
      new Date(plantsStoraged[0].dateTimeNotification).getTime(),
      new Date().getTime(),
      { locale: pt }
    );

    setNextWatered(
      `Não esqueça de regar a ${plantsStoraged[0].name} às ${nextTime} horas.`
    );

    setMyPlants(plantsStoraged);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadStorageData();
  }, []);

  return (
    <View style={styles.container}>
      <Header />

      <View style={styles.spotlight}>
        <Image source={waterdrop} style={styles.spotlightImage} />
        <Text style={styles.spotlightTex}>{nextWaterd}</Text>
      </View>

      <View style={styles.plants}>
        <Text style={styles.plantsTitle}>Próximas regadas</Text>

        <FlatList
          data={myPlants}
          renderItem={renderItemPlants}
          keyExtractor={keyExtractorPlants}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flex: 1 }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 30,
    backgroundColor: colors.background,
  },
  spotlight: {
    backgroundColor: colors.blue_light,
    paddingHorizontal: 20,
    borderRadius: 20,
    height: 110,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  spotlightImage: {
    width: 60,
    height: 60,
  },
  spotlightTex: {
    flex: 1,
    color: colors.blue,
    paddingHorizontal: 20,
  },
  plants: {
    flex: 1,
    width: "100%",
  },
  plantsTitle: {
    fontSize: 24,
    fontFamily: fonts.heading,
    color: colors.heading,
    marginVertical: 20,
  },
});