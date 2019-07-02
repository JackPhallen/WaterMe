import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from "react-native";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import moment from "moment";
import DateTimePicker from "react-native-modal-datetime-picker";

import * as Actions from '../actions/plants.actions';

class AddPlant extends React.Component {
  
  static navigationOptions = {
    headerMode: 'none',
  };

  constructor(props) {
    super(props);
    this._onSubmit = this._onSubmit.bind(this);
    this._toggleDateComponent = this._toggleDateComponent.bind(this);
    this.state = {
      displayDateComponent: false,
      dateSelection: moment().format('MM-DD-YY')
    }
  }
  _onSubmit() {
    if ( !this._validateInput() ) { return }
    let name = this.state.plantName;
    let lastWatered = moment(this.state.dateSelection);
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

  _validateInput() {
    let freq = +this.state.freq;
    if ( !freq && freq > 0) {
      return true;
    }
    Alert.alert(
      'Invalid input',
      this.state.freq + " is not a positive number!",
      [
        {text: 'Ok', onPress: () => {}},
      ],
      {cancelable: false},
    );
    return false;
  }

  _toggleDateComponent() {
    this.setState({ displayDateComponent: !this.state.displayDateComponent });
  };

  _onDateConfirm = date => {
    this.setState({ dateSelection: date });
    this._toggleDateComponent();
  };

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
          <Text style={ styles.label }>Watering interval (days): </Text>
          <TextInput
            style={ styles.input }
            placeholder="14"
            onChangeText={(text) => this.setState({freq: text})}
          />
        </View>
        <TouchableOpacity
            onPress={ () => this._toggleDateComponent() }
            style={[
              styles.button,
              { backgroundColor: '#77b3d4' }
            ]}
          >
            <Text style={styles.buttonText}>Select Date Last Watered</Text>
          </TouchableOpacity>
          <DateTimePicker
            isVisible= { this.state.displayDateComponent }
            onConfirm= { this._onDateConfirm }
            onCancel= { this._toggleDateComponent }
        />
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
