import React from 'react';
import { Text, View } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import TabNavigator from './navigation/AppNavigator';
import PlantList from './plants/PlantList';

console.log(PlantList.get())

PlantList.add("Flower", "Today");

console.log(PlantList.get())

PlantList.add("Tree", "Today");
PlantList.add("Wild Flower", "Yesterday");
console.log(PlantList.get())




export default createAppContainer(TabNavigator);
