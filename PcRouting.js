import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Navigator from './PcFrequentUsage/PcRefNavigation';
import PcHome from './PcMainScreens/PcHome';
import PcSP from './PcMainScreens/PcSP';
import PcCart from './PcMainScreens/PcCart';
import PcFav from './PcMainScreens/PcFav';
import PcContact from './PcMainScreens/PcContact';
// import PcConfirmOrder from './PcMainScreens/PcConfirmOrder';
import PcSearch from './PcMainScreens/PcSearch';
const Stack = createStackNavigator();

function Routes(props) {
  return (
    <NavigationContainer
      ref={(ref) => {
        Navigator.InitializeRefNavigation(ref);
      }}>
      <Stack.Navigator
        initialRouteName="PcHome"
        screenOptions={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}>
        <Stack.Screen name="PcHome" component={PcHome} />
        <Stack.Screen name="PcSP" component={PcSP} />
        <Stack.Screen name="PcFav" component={PcFav} />
        <Stack.Screen name="PcCart" component={PcCart} />
        <Stack.Screen name="PcContact" component={PcContact} />
        {/* <Stack.Screen name="PcConfirmOrder" component={PcConfirmOrder} /> */}
        <Stack.Screen name="PcSearch" component={PcSearch} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;
