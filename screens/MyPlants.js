import React from 'react';
import { Modal, Button, View, Text, StyleSheet, FlatList, TouchableOpacity, Dimensions, TouchableHighlight } from "react-native";
import { Constants } from "expo";

import PlantList from '../plants/PlantList';
import AddPlant from './AddPlant';
import { NavigationEvents } from 'react-navigation';

export default class MyPlants extends React.Component {
  static navigationOptions = ({ navigation }) => {
    if ( navigation.getParam('isAddPlantVisable') ) {
      console.log( !navigation.getParam('isAddPlantVisable') );
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
            onPress= { navigation.getParam('toggleAddPlant') }
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
    } else {
      console.log( !navigation.getParam('isAddPlantVisable') );
      return {
        title: 'Add Plant',
        headerMode: 'none',
      }
    }
  };

  componentWillMount() {
    console.log("mount");
    this.props.navigation.setParams({ toggleAddPlant: this._toggleAddModal });
    this.props.navigation.setParams({ isAddPlantVisable: this._isAddPlantVisable })
  }

  state = {
    list: PlantList.get(),
    modalVisable: false,
  };


  _toggleAddModal = () => {
    console.log("toggle");
    this.setState({ modalVisable: !this.state.modalVisable });
  };

  componentDidMount() {
    // console.log("MOUNT");
    this.props.navigation.setParams( { setModalVisable: this._setModalVisable } );
  }

  _isAddPlantVisable() {
    return this.state.modalVisable;
  }

  addPlant(plantName, lastWatered) {
    PlantList.add(plantName, lastWatered);
    this.setState( this.state );
  }

  render() {
    if (!this._isAddPlantVisable()) {
      return (
        <View style={styles.main}>
          <View style={ styles.plantList }>
            <FlatList
              data={ this.state.list }
              renderItem={({item}) => 
              <TouchableOpacity 
                style={ styles.plant }>
                <View style={ styles.plantContent }>
                  <View style={ styles.pic }></View>
                    <View style={ styles.plantDesc }>
                      <Text style={ styles.plantName }> { item.key } </Text>
                      <Text style={ styles.plantInfo }> { item.wateredDate } </Text>
                    </View>
                </View>
              </TouchableOpacity>
              }/>
          </View>
        </View>
      );
    } else {
      return (
        <AddPlant
        data= { this.state.list }/>  
      )
    }
  };
}

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

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
  pic: {
    width: 100,
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
