



let idTracker = 2;

export function actions$fetchPlants() {
  return {
    type: 'FETCH_PLANTS',
  };
}

export function actions$addPlants(plant) {
  return {
    type: 'ADD_PLANT',
    newPlant: plant
  };
}