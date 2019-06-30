import React from 'react';
import {View, Text, Button, StyleSheet, FlatList, TouchableOpacity, Image} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as Storage from '../utils/StoreData'
import * as Actions from '../actions/plants.actions';

class PlantList extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      title: 'My Plants',
      headerStyle: {
        backgroundColor: '#7ab640',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerLeft: (
        <Button
          onPress={() => params.onAddPlant() }
          title="Add"
          color="#fff"
          fontWeight='bold'
        />
      ),
      headerRight: (
        <Button
          onPress={() => alert('This is a button!')}
          title="Edit"
          color="#fff"
          fontWeight='bold'
        />
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
  }

  _onPlantPress(plant) {
    console.log("press");
  }

  _onPlantLongPress(plant) {
    console.log("long");
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
                <View>
                  <TouchableOpacity 
                    style={ styles.plant }
                    onPress={ () => this._onPlantPress( item )}
                    onLongPress={ () => this._onPlantLongPress( item )}
                    >
                    <View style={ styles.plantContent }>
                      <View style={ styles.imageCont }>
                      <Image 
                        source={ require('../assets/flower-icon.png') }
                        style={ styles.image } />
                      </View>
                        <View style={ styles.plantDesc }>
                          <Text style={ styles.plantName }> { item.key } </Text>
                          <Text style={ styles.plantInfo }> { item.desc } </Text>
                        </View>
                    </View>
                  </TouchableOpacity>
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
    justifyContent: 'flex-start'
  },
  plantName: {
    marginBottom: 5,
    fontSize: 20,
    fontWeight: 'bold',
  },
  imageCont: {
    padding: 5,
  },
  image: {
    flex: 1,
    width: 95,
    height: 95,
    resizeMode: 'contain'
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