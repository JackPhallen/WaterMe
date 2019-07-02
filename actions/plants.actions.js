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
  return {
    type: 'ADD_PLANT',
    newPlant: plant
  };
}

export function actions$deletePlant(plant) {
  return {
    type: 'DELETE_PLANT',
    key: plant.key
  }
}

export function actions$waterPlant(plant) {
  return {
    type: 'WATER_PLANT',
    plant: plant
  };
}

export function actions$sortPlants() {
  return {
    type: 'SORT_PLANTS'
  };
}