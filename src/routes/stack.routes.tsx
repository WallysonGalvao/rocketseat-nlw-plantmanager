import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { Welcome } from "screens/Welcome";
import { UserIdentification } from "screens/UserIdentification";
import { Confirmation } from "screens/Confirmation";
import { PlantSave } from "screens/PlantSave";
import AuthRoutes from "./tab.routes";

import colors from "styles/colors";

const { Navigator, Screen } = createStackNavigator();

const AppRoutes: React.FC = () => {
  return (
    <Navigator
      headerMode="none"
      screenOptions={{
        cardStyle: {
          backgroundColor: colors.white,
        },
      }}
    >
      <Screen name="Welcome" component={Welcome} />
      <Screen name="UserIdentification" component={UserIdentification} />
      <Screen name="Confirmation" component={Confirmation} />
      <Screen name="PlantSelect" component={AuthRoutes} />
      <Screen name="PlantSave" component={PlantSave} />
      <Screen name="MyPlants" component={AuthRoutes} />
    </Navigator>
  );
};

export default AppRoutes;
