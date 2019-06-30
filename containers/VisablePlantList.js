// import { connect } from 'react-redux'
// import { waterPlant } from '../actions'
// import MyPlants from '../screens/MyPlants'
// import { VisibilityFilters } from '../actions'

// const getVisiblePlants = (plants, filter) => {
//   switch (filter) {
//     case VisibilityFilters.SHOW_ALL:
//       return plants
//     case VisibilityFilters.SHOW_WATERED:
//       return plants.filter(plant => plant.watered)
//     case VisibilityFilters.SHOW_NOT_WATERED:
//       return plants.filter(plant => !plant.watered)
//     default:
//       throw new Error('Unknown filter: ' + filter)
//   }
// }

// const mapStateToProps = state => ({
//   plants: getVisiblePlants(state.plants, state.visibilityFilter)
// })

// const mapDispatchToProps = dispatch => ({
//   waterPlant: id => dispatch(waterPlant(id))
// })
