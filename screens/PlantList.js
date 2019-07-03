import React from 'react';
import {View, Text, Button, StyleSheet, FlatList, TouchableOpacity, Alert,  Image} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import moment from "moment";

import * as Storage from '../utils/StoreData'
import * as Actions from '../actions/plants.actions';

class PlantList extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      headerTitle: <Image
        source={require('../assets/flower2-icon.png')}
        style={{ width: 40, height: 40, padding: 2 }}
      />,
      headerLeft: (
        <TouchableOpacity  
          style={{ padding: 5 }}
          onPress={() => params.onAddPlant() }
        >
          <Image 
            source={ require('../assets/add-plant-icon.png') }
            style={{ 
              flex: 1,
              padding: 2,
              width: 40,
              height: 40,
              resizeMode: 'contain' }} />
        </TouchableOpacity>
      )
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
    // this.props.actions$deletePlant(plant);
  }

  _onPlantLongPress(plant) {
    Alert.alert(
      'Are you sure?',
      plant.name + ' will be deleted!',
      [
        {text: 'Cancel', onPress: () => {}},
        {text: 'Yes', onPress: () => this._onDelete(plant)},
      ],
      {cancelable: false},
    );
  }

  _onDelete(plant) {
    this.props.actions$deletePlant(plant);
    this.props.actions$sortPlants();
    this.props.actions$storePlants();
  }

  _onWaterPlant(plant) {
    this.props.actions$waterPlant(plant);
    this.props.actions$sortPlants();
    this.props.actions$storePlants();
  }

  _alertOnWater(plant) {
    Alert.alert(
      'Are you sure?',
      'Your ' + plant.name + ' does not need to be watered until ' 
        + moment(plant.nextWaterDate).format('LLL'),
      [
        {text: 'Cancel', onPress: () => {}},
        {text: 'Yes', onPress: () => this._onWaterPlant(plant)},
      ],
      {cancelable: false},
    );
  }

  _renderPlant = ({ item }) => {
    let daysUntilWater = moment(item.nextWaterDate).diff(moment(), 'days');
    let iconImg;
    let onIconPress;
    let nextWaterStr = "Needs watered ";
    if (daysUntilWater > 2) {
      onIconPress = () => { this._alertOnWater(item) };
      iconImg = require('../assets/drop-disabled3-icon.png');
      nextWaterStr = nextWaterStr + moment(item.nextWaterDate).format('LL');
    } else {
      onIconPress = () => this._onWaterPlant(item)
      iconImg = require('../assets/drop-icon.png');
      if (daysUntilWater < 1) {
        nextWaterStr = nextWaterStr + "today!"; 
      } else if (daysUntilWater < 2) {
        nextWaterStr = nextWaterStr + "tomorrow!";
      } else {
        nextWaterStr = nextWaterStr + moment(item.nextWaterDate).format('LL');
      }
    }
    return (
      <View style={ styles.plant }>
        <View style={ styles.plantContent }>
          <TouchableOpacity  
            style={ styles.imageCont }
            onPress={ (item) => onIconPress(item) }
          >
            <Image 
              source={ iconImg }
              style={ styles.image } />
          </TouchableOpacity>
          <View style={ styles.plantDesc }>
            <TouchableOpacity
              style={{ flex:1 }}
              onPress={ () => this._onPlantPress() }
              onLongPress={ () => this._onPlantLongPress(item) }
            >
              <Text style={ styles.plantName }> { item.name } </Text>
              <Text style={ styles.plantInfo }> { nextWaterStr } </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
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
              renderItem={ this._renderPlant } />
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