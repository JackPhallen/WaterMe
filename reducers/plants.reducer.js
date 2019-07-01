import * as Storage from '../utils/StoreData';
import moment from "moment";
import { apisAreAvailable } from 'expo';

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
      action.newPlant.key = (1 + state.length).toString();
      return [...state,
        action.newPlant];
    case 'WATER_PLANT':  
      return state.map((plant) => {
          if (plant.key === action.plant.key) {
            plant.nextWaterDate = moment().add(plant.intervalDays, "days").format();
            console.log(plant);
          }
          return plant;
        });
    case 'SORT_PLANTS':
        state = state.sort((a,b) => {
          return moment(a.nextWaterDate).diff(moment(b.nextWaterDate), 'days');
        });
      return state;
    default:
      return state;
  }
}