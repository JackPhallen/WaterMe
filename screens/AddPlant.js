import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, Image } from "react-native";
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
      dateSelection: moment()
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
    if ( freq && freq > 0) {
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
    let lastWateredStr = moment(this.state.dateSelection).format('LL')
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
          <Text style={ styles.label }>Date last watered: </Text>
          <TouchableOpacity
            onPress={ () => this._toggleDateComponent() }
            style={[
              styles.button,
              { backgroundColor: 'white',
                borderWidth: 1,
                alignItems: "flex-start",
                textAlign: 'center',}
            ]}
          >
            <View style={ styles.calendarView }>
              <Image 
                source={ require('../assets/calendar-icon.png') }
                style={ styles.image } />
              <Text 
                style={{
                  fontSize: 20,
                  color: 'black',
                  fontWeight: 'bold', 
                }}
              >{ lastWateredStr }</Text>
            </View>
          </TouchableOpacity>
          <DateTimePicker
            isVisible= { this.state.displayDateComponent }
            onConfirm= { this._onDateConfirm }
            onCancel= { this._toggleDateComponent }
        />
        <TouchableOpacity 
          style={
            [styles.button,
            { backgroundColor: '#696969',
              justifyContent: "center",
              alignItems: "center",
              textAlign: 'center', }]
          }
          onPress={ () => { this._onSubmit() }} >
          <Text 
          style={{ 
            fontSize: 20,
            color: 'white',
            fontWeight: 'bold', 
          }}>Add Plant</Text>
        </TouchableOpacity>
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
    marginBottom: 10,
  },
  calendarView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: "flex-start",
    alignItems: "center",
  },
  image: {
    height: 30,
    width: 30,
    resizeMode: 'contain',
    marginRight: 40
  },
  button: {
    margin: 15,
    padding: 5,
    height: 40,
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
  }
});
