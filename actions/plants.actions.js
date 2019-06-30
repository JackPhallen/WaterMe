
let idTracker = 2;

// export function actions$fetchPlants() {
//   return {
//     type: 'FETCH_PLANTS',
//   };
// }

export function actions$storePlants() {
  return {
    type: 'STORE_PLANTS',
  };
}

export function actions$setPlants(plants) {
  return {
    type: 'SET_PLANTS',
    plants: plants
  }
}

export function actions$getPlants() {
  return {
    type: 'GET_PLANTS',
  };
}

export function actions$addPlant(plant) {
  plant.id = 1 + idTracker;
  idTracker = idTracker + 1;
  return {
    type: 'ADD_PLANT',
    newPlant: plant
  };
}