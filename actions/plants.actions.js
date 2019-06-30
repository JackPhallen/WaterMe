
let idTracker = 2;

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