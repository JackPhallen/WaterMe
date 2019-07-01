import React from 'react';
import {View, Text, Button, StyleSheet, FlatList, TouchableOpacity, TouchableHighlight,  Image} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as Storage from '../utils/StoreData'
import * as Actions from '../actions/plants.actions';

class PlantList extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      title: 'My Plants',
      headerLeft: (
        <TouchableOpacity  
          style={{ padding: 5 }}
          onPress={() => params.onAddPlant() }
        >
          <Image 
            source={ require('../assets/addition-icon.png') }
            style={{ 
              flex: 1,
              padding: 2,
              width: 40,
              height: 40,
              resizeMode: 'contain' }} />
        </TouchableOpacity>
      ),
      headerRight: (
        <TouchableOpacity  
          style={{ padding: 5 }}
          onPress={() => params.onAddPlant() }
        >
          <Image 
            source={ require('../assets/edit-icon.png') }
            style={{ 
              flex: 1,
              padding: 2,
              width: 32,
              height: 32,
              resizeMode: 'contain' }} />
        </TouchableOpacity>
      ),
    }
  }
      
  constructor(props) {
    super(props);
    this._onAddPlant = this._onAddPlant.bind(this);
    this.state = {
      loading: true
    };
  }

  componentDidMount(){
    this._loadPlants();
    this.props.actions$storePlants();
    this.props.navigation.setParams({ onAddPlant: this._onAddPlant });
  }

  _loadPlants() {
    Storage.retrieveData().then((promise) => {
      let resolvedState = JSON.parse(promise);
      this.props.actions$setPlants(resolvedState);
      this.setState({ loading: false });
      //Ensure plants are always stored
      this.props.actions$storePlants();
    }).catch((error) => {
      console.log('Promise is rejected with error: ' + error);
    });
  }

  _onAddPlant() {
    this.props.navigation.navigate('AddPlant');
    // this.props.actions$sortPlants();
  }

  _onPlantPress(plant) {
    console.log("press");
  }

  _onPlantLongPress(plant) {
    console.log("long");
  }

  _onWaterPlant(plant) {
    this.props.actions$waterPlant(plant);
    this.props.actions$sortPlants();
  }

  render() {
    if (this.state.loading) { 
      return (<View style={ styles.main }></View>);
    } else {
      return (
        <View style={styles.main}>
          <View style={ styles.plantList }>
            <FlatList
              data={ this.props.plants }
              renderItem={ ({ item }) => 
                <View style={ styles.plant }>
                  <View style={ styles.plantContent }>
                    <TouchableOpacity  
                      style={ styles.imageCont }
                      onPress={() => this._onWaterPlant(item) }
                    >
                      <Image 
                        source={ require('../assets/wateringcan-icon.png') }
                        style={ styles.image } />
                    </TouchableOpacity>
                    {/* </View> */}
                      <View style={ styles.plantDesc }>
                        <TouchableOpacity
                        style={{ flex:1 }}
                        onPress={ () => this._onPlantPress() }
                        onLongPress={ () => this._onPlantLongPress() }
                        >
                          <Text style={ styles.plantName }> { item.name } </Text>
                          <Text style={ styles.plantInfo }> { item.desc } </Text>
                        </TouchableOpacity>
                      </View>
                  </View>
                </View>
              }/>
          </View>
        </View>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    plants: state.plants
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

let PlantListContainer = connect(mapStateToProps, mapDispatchToProps)(PlantList);

export default PlantListContainer;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    // alignItems: "center",
    backgroundColor: "#e9f3df",
    alignItems: 'stretch',
  },
  plantList: {
    flex: 8,
    justifyContent: 'flex-start',
  },
  plant: {
    height: 100,
    borderBottomWidth: 2,
    borderColor: '#7ab640',
    // backgroundColor: "#9bc870",
    backgroundColor: '#cde4b7'
  },
  plantContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  plantDesc: {
    flex: 1,
    padding: 5,
    justifyContent: 'flex-start',
  },
  plantName: {
    marginBottom: 5,
    fontSize: 20,
    fontWeight: 'bold',
  },
  imageCont: {
    padding: 10,
  },
  image: {
    flex: 1,
    width: 56,
    height: 56,
    resizeMode: 'contain',
  },
  nameCont: {
    flex: 8,
    backgroundColor: "blue",
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  }
});