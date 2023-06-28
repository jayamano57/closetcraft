import { Home } from './src/screens/Home/Home';
import { NavigationContainer } from '@react-navigation/native';
import { MyCloset } from './src/screens/MyCloset/MyCloset';
import { COLORS } from './src/styles/colors';
import { GetStarted } from './src/screens/GetStarted/GetStarted';
import { useUser } from './src/services/user/user.hook';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ItemDetails } from './src/screens/ItemDetails/ItemDetails';
import { Item } from './src/screens/Item/Item';
import { RootDrawer, RootStack } from './src/navigation/navigation.types';
import { NavHeader } from './src/components/NavHeader/NavHeader';
import { CreateOutfit } from './src/screens/CreateOutfit/CreateOutfit';
import { OutfitDetails } from './src/screens/OutfitDetails/OutfitDetails';
import { Outfit } from './src/screens/Outfit/Outfit';
import { useStorageDelete } from './src/hooks/useStorageDelete';

// GLOBAL CONSTANTS

const HomeDrawer = () => {
  const drawerOptions = {
    headerShadowVisible: false,
    headerTitle: '',
    headerTintColor: COLORS.black_0,
    drawerLabelStyle: { fontSize: 16 },
    drawerActiveTintColor: COLORS.white_100,
    drawerActiveBackgroundColor: COLORS.black_0,
    drawerInactiveBackgroundColor: COLORS.white_100,
    activeTintColor: COLORS.black_0,
  };

  return (
    <RootDrawer.Navigator screenOptions={drawerOptions}>
      <RootDrawer.Screen name="Home" component={Home} />
      <RootDrawer.Screen name="My Closet" component={MyCloset} />
    </RootDrawer.Navigator>
  );
};

function MainApp() {
  const stackOptions = {
    header: () => <NavHeader />,
  };

  return (
    <RootStack.Navigator screenOptions={stackOptions}>
      <RootStack.Screen
        name="HomeDrawer"
        component={HomeDrawer}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="ItemDetails"
        component={ItemDetails}
        options={{ header: () => <NavHeader /> }}
      />
      <RootStack.Screen
        name="Item"
        component={Item}
        options={{ header: () => <NavHeader absolute /> }}
      />
      <RootStack.Screen
        name="CreateOutfit"
        component={CreateOutfit}
        options={{ header: () => <NavHeader /> }}
      />
      <RootStack.Screen
        name="OutfitDetails"
        component={OutfitDetails}
        options={{ header: () => <NavHeader /> }}
      />
      <RootStack.Screen
        name="Outfit"
        component={Outfit}
        options={{ header: () => <NavHeader absolute /> }}
      />
    </RootStack.Navigator>
  );
}

export default function App() {
  // useStorageDelete();
  const user = useUser();

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        {user.id ? <MainApp /> : <GetStarted />}
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
