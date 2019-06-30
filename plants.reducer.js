const mockPlants = [
  {
    id: 0,
    name: 'flower',
    desc: 'one flower',
  },
  {
    id: 1,
    name: 'tree',
    desc: 'one tree',
  },
  {
    id: 2,
    name: 'log',
    desc: 'one log',
  },
];

export default function (state = mockPlants, action) {
  switch (action.type) {
    case 'FETCH_PLANTS':
      return state
    case 'ADD_PLANT':
      return [...state,
      action.newPlant]
    default:
      return state;
  }
}