import {AsyncStorage} from 'react-native';

import * as Storage from '../utils/StoreData';

const plantDataKey = "PlantData";

export default function (state = [], action) {
  switch (action.type) {
    // case "FETCH_PLANTS":
    //   Storage.retrieveData();
    //   return state;
    case "STORE_PLANTS":
      Storage.storeData(state);
      return state;
    case 'SET_PLANTS':
      return action.plants;
    case 'GET_PLANTS':
      return state;
    case 'ADD_PLANT':
      return [...state,
      action.newPlant]
    default:
      return state;
  }
}