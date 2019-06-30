const mockPlants = [
  {
    id: 0,
    key: 'flower',
    desc: 'one flower',
  },
  {
    id: 1,
    key: 'tree',
    desc: 'one tree',
  },
  {
    id: 2,
    key: 'log',
    desc: 'one log',
  },
];


export default function (state = mockPlants, action) {
  switch (action.type) {
    case 'GET_PLANTS':
      return state
    case 'ADD_PLANT':
      return [...state,
      action.newPlant]
    default:
      return state;
  }
}