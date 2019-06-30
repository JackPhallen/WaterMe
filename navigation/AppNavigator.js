import React from 'react';
import { createBottomTabNavigator, createStackNavigator, createAppContainer} from 'react-navigation';
import PlantList from '../screens/PlantList';
import AddPlant from '../screens/AddPlant';
import MyCalendar from '../screens/MyCalendar';


const PlantListStack = createStackNavigator(
  {
    List: {
      screen: PlantList,
    },
    Add: {
      screen: AddPlant,
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
  }
);
  
export default createAppContainer(PlantListStack);

