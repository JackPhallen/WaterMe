import React from 'react';
import {View, Text, Button, StyleSheet, FlatList, TouchableOpacity, Image} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as Actions from '../actions/plants.actions';

class PlantList extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      title: 'My Plants',
      headerStyle: {
        backgroundColor: '#7ab640',
      },
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
    this._onAddPlant = this._onAddPlant.bind(this)
    this.state = {
      newPlant: {
        desc: "two flower",
        name: "new flower"
      },
      yeet: "yaw"
    };

  }

  _onAddPlant() {
    this.props.navigation.navigate('AddPlant');
  }

  componentDidMount(){
    this.props.actions$getPlants();
    this.props.navigation.setParams({ test: 1 });
    this.props.navigation.setParams({ onAddPlant: this._onAddPlant });
  }


  render() {
    return (
      <View style={styles.main}>
        <View style={ styles.plantList }>
          <FlatList
            data={ this.props.plants }
            renderItem={ ({ item }) => 
            <TouchableOpacity 
              style={ styles.plant }>
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
            }/>
        </View>
      </View>
    );
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
    backgroundColor: "#9bc870",
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
    color: 'white',
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