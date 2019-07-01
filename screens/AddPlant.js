import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import moment from "moment";

import * as Actions from '../actions/plants.actions';

class AddPlant extends React.Component {
  
  static navigationOptions = {
    headerMode: 'none',
  };

  constructor(props) {
    super(props);
    this._onSubmit = this._onSubmit.bind(this);
    this.state = {}
  }

  _onSubmit() {
    let today = moment();
    let name = this.state.plantName;
    let lastWatered = today;
    let intervalDays = this.state.freq;
    let nextWaterDate = lastWatered.add(intervalDays, 'day');
    this.props.actions$addPlant({
      name: name,
      intervalDays: intervalDays,
      nextWaterDate: nextWaterDate.format()
    });
    this.props.actions$sortPlants();
    this.props.actions$storePlants();
    this.props.navigation.goBack();
  }

  render() {
    return (
      <View style={ styles.main }>
        <View style={ styles.formCont }>
          <Text style={ styles.label }>Name your plant: </Text>
          <TextInput
            style={ styles.input }
            placeholder="My Kitchen Violets"
            onChangeText={(text) => this.setState({plantName: text})}
          />
          <Text style={ styles.label }>Last day watered: </Text>
          <TextInput
            style={ styles.input }
            placeholder= { moment(new Date()).format("YYYY-MM-DD") }
            onChangeText={(text) => this.setState({plantDesc: text})}
          />
          <Text style={ styles.label }>Watering interval (days): </Text>
          <TextInput
            style={ styles.input }
            placeholder="Every Day"
            keyboardType='numeric'
            onChangeText={(text) => this.setState({freq: text})}
          />
        </View>
        <TouchableOpacity 
          style={
            [styles.button,
            { backgroundColor: '#40b5b6' }]
          }
          onPress={ () => { this._onSubmit() }} >
          <Text style={styles.buttonText}>Add Plant</Text>
        </TouchableOpacity>
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

let AddPlantContainer = connect(mapStateToProps, mapDispatchToProps)(AddPlant);
export default AddPlantContainer;



const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: "flex-start",
    backgroundColor: "#e9f3df",
  },
  formCont: {
    flex: 12,
    margin: 8,
    marginTop: 45,
    alignItems: 'stretch',
  },
  label: {
    fontSize: 30,
  },
  input: {
    padding: 5,
    height: 40,
    fontSize: 20,
    backgroundColor: '#fbfdf9',
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonCont: {
    flex:1, 
    flexDirection: 'row', 
    justifyContent: 'space-evenly'
  },
  button: {
    margin: 15,
    flex: 1,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    textAlign: 'center',
    borderWidth: 1,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  }
});
