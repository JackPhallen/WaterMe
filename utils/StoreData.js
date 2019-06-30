import {AsyncStorage} from 'react-native';
import * as Actions from '../actions/plants.actions';

const PLANT_DATA_KEY = "PlantData";

export const storeData = async (data) => {
    try {
    await AsyncStorage.setItem( PLANT_DATA_KEY, JSON.stringify(data) );
  } catch (error) {
    // Error retrieving data
    console.log(error.message);
  }
};

export const retrieveData = async () => {
    let userId = '';
    try {
      promise = await AsyncStorage.getItem(PLANT_DATA_KEY);
      return promise;
    } catch (error) {
      // Error retrieving data
      console.log(error.message);
    }
  }
