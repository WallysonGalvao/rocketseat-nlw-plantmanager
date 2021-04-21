import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { Welcome } from "screens/Welcome";
import { UserIdentification } from "screens/UserIdentification";
import { Confirmation } from "screens/Confirmation";
import { PlantSelect } from "screens/PlantSelect";

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
      <Screen name="PlantSelect" component={PlantSelect} />
    </Navigator>
  );
};

export default AppRoutes;
