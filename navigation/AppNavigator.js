import React from 'react';
import { createBottomTabNavigator, createStackNavigator, Text} from 'react-navigation';

import MyPlants from '../screens/MyPlants';
import AddPlant from '../screens/AddPlant';
import MyCalendar from '../screens/MyCalendar';


const MyPlantsStack = createStackNavigator(
  {
    Plants: {
      screen: MyPlants,
    },
  },
);

const RootStack = createStackNavigator(
  {
    Main: {
      screen: MyPlantsStack,
    },
    AddModal: {
      screen: AddPlant,
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
  }
);

const CalendarStack = createStackNavigator(
  {
    Calendar: MyCalendar,
  },
  {
    initialRouteName: 'Calendar',
    defaultNavigationOptions: {
      title: "To Do",
      tabBarLabel: "Calendar",
      headerStyle: {
        backgroundColor: '#7ab640',
      },
      tabBarOptions: {
        tabBarLabel: "YEET",
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  }
)



const TabNavigator = createBottomTabNavigator(
  {
    Plants: { 
      screen: RootStack,
      navigationOptions: {
        tabBarLabel: "Plants",
      }
    },
    ToDo: {
      screen: CalendarStack,
      navigationOptions: {
        tabBarLabel: "Calendar",
      }
    }
  },
  {
    tabBarOptions: {
      labelStyle: {
        fontSize: 20,
      },
      activeTintColor: "#7ab640",
    },
  }
);


export default TabNavigator;

