import type { NavigatorScreenParams } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Item } from '../services/item/item.types';

export type RootStackParamList = {
  HomeDrawer: NavigatorScreenParams<RootDrawerParamList>;
  ItemDetails: undefined;
  Item: { id: string };
  CreateOutfit: { items: Item[] };
  OutfitDetails: { items: Item[] };
  Outfit: { id: string };
};

type RootDrawerParamList = {
  Home: undefined;
  ['My Closet']: { selectMode?: boolean };
};

type ParamList = RootDrawerParamList & RootStackParamList;

export const RootStack = createStackNavigator<RootStackParamList>();
export const RootDrawer = createDrawerNavigator<RootDrawerParamList>();

declare global {
  namespace ReactNavigation {
    interface RootParamList extends ParamList {}
  }
}
