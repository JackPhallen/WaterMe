import {AsyncStorage} from 'react-native';

const PLANT_DATA_KEY = "PlantData";

export const storeData = async (data) => {
    try {
    await AsyncStorage.setItem( PLANT_DATA_KEY, JSON.stringify(data) );
  } catch (error) {
    console.log(error.message);
  }
};

export const retrieveData = async () => {
    try {
      promise = await AsyncStorage.getItem(PLANT_DATA_KEY);
      return promise;
    } catch (error) {
      console.log(error.message);
    }
  }
