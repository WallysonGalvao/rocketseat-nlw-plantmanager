import React, { useCallback, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import { PlantProps } from "libs/storage";

import { Header } from "components/Header";
import { EnvironmentButton } from "components/EnvironmentButton";
import { PlantCardPrimary } from "components/PlantCardPrimary";
import { Load } from "components/Load";

import colors from "styles/colors";
import fonts from "styles/fonts";
import api from "services/api";

interface EnvironmentProps {
  key: string;
  title: string;
}

export function PlantSelect() {
  const { navigate } = useNavigation();

  const [environments, setEnvironments] = useState<EnvironmentProps[]>([]);
  const [environmentSelected, setEnvironmentSelected] = useState("all");
  const [plants, setPlants] = useState<PlantProps[]>([]);
  const [filteredPlants, setFilteredPlants] = useState<PlantProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);

  const keyExtractorEnvironments = (item: EnvironmentProps) => item.key;

  const renderItemEnvironments = ({ item }: { item: EnvironmentProps }) => {
    return (
      <EnvironmentButton
        title={item.title}
        active={item.key === environmentSelected}
        onPress={() => handleEnvironmentSelected(item.key)}
      />
    );
  };

  const handlePlantSelect = useCallback((plant: PlantProps) => {
    navigate("PlantSave", { plant });
  }, []);

  const keyExtractorPlants = (item: PlantProps) => String(item.id);

  const renderItemPlants = ({ item }: { item: PlantProps }) => {
    return (
      <PlantCardPrimary data={item} onPress={() => handlePlantSelect(item)} />
    );
  };

  const renderFooterPlants = () => {
    return loadingMore ? <ActivityIndicator color={colors.green} /> : <></>;
  };

  const handleEnvironmentSelected = useCallback(
    (environment: string) => {
      setEnvironmentSelected(environment);

      if (environment === "all") return setFilteredPlants(plants);

      const filtered = plants.filter((plant) =>
        plant.environments.includes(environment)
      );

      setFilteredPlants(filtered);
    },
    [setEnvironmentSelected, setFilteredPlants]
  );

  const fetchEnvironment = useCallback(async () => {
    try {
      const { data } = await api.get(
        "plants_environments?_sort=title&_order=asc"
      );

      if (data) setEnvironments([{ key: "all", title: "Todos" }, ...data]);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const fetchPlants = useCallback(async () => {
    try {
      const url = `plants?_sort=name&_order=asc&_page=${page}&_limit=8`;
      const { data } = await api.get(url);

      if (data) {
        if (page > 1) {
          setPlants((prevState) => [...prevState, ...data]);
          setFilteredPlants((prevState) => [...prevState, ...data]);
        } else {
          setPlants(data);
          setFilteredPlants(data);
        }

        setLoadingMore(false);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleFetchMore = useCallback((distance: number) => {
    if (distance < 1) return;
    setLoadingMore(true);
    setPage((prevState) => prevState + 1);
    fetchPlants();
  }, []);

  useEffect(() => {
    fetchEnvironment();
    fetchPlants();
  }, []);

  if (loading) return <Load />;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Header />

        <Text style={styles.title}>Em qual ambiente</Text>
        <Text style={styles.subTitle}>você quer colocar sua planta?</Text>
      </View>
      <View>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={environments}
          renderItem={renderItemEnvironments}
          keyExtractor={keyExtractorEnvironments}
          contentContainerStyle={styles.environmentList}
        />
      </View>

      <View style={styles.plants}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={filteredPlants}
          renderItem={renderItemPlants}
          keyExtractor={keyExtractorPlants}
          numColumns={2}
          onEndReachedThreshold={0.1}
          onEndReached={({ distanceFromEnd }) => {
            handleFetchMore(distanceFromEnd);
          }}
          ListFooterComponent={renderFooterPlants}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 17,
    color: colors.heading,
    fontFamily: fonts.heading,
    lineHeight: 20,
    marginTop: 15,
  },
  subTitle: {
    fontSize: 17,
    color: colors.heading,
    fontFamily: fonts.text,
    lineHeight: 20,
    marginTop: 5,
  },
  environmentList: {
    height: 40,
    justifyContent: "center",
    paddingBottom: 5,
    marginLeft: 32,
    marginVertical: 32,
  },
  plants: {
    flex: 1,
    paddingHorizontal: 32,
    justifyContent: "center",
  },
});
