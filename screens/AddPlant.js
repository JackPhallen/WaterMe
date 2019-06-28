import React from 'react';
import { Button, View, Text, StyleSheet, TextInput, TouchableOpacity, StackActions, NavigationActions } from "react-native";
import PlantList from '../plants/PlantList';

export default class AddPlant extends React.Component {
  static navigationOptions = ({ navigation }) => {
    console.log("tes");
    return {
      title: 'Add Plant',
      headerMode: 'none',
    }
  }; 
  render() {
    console.log(this.props.data);
    return (
        <View style={ styles.main }>
          <View style={ styles.formCont }>
            <Text style={ styles.label }>Name Your Plant: </Text>
            <TextInput
            style={ styles.input }
            placeholder="My flower :)"
            onChangeText={(text) => this.setState({plantName: text})}
            />
            <Text style={ styles.label }>Date last watered: </Text>
            <TextInput
            style={ styles.input }
            placeholder="Today"
            onChangeText={(text) => this.setState({lastWatered: text})}
            />
            <Text style={ styles.label }>How Often: </Text>
            <TextInput
            style={ styles.input }
            placeholder="Every Day"
            onChangeText={(text) => this.setState({freq: text})}
            />
          </View>
          <TouchableOpacity 
            style={
              [styles.button,
              { backgroundColor: '#40b5b6' }]
            }
            onPress={ () => { this.props.navigation.goBack(); }} >
            <Text style={styles.buttonText}>Add Plant</Text>
          </TouchableOpacity>
        </View>
      );
  }

  state = {
    plantName: "test",
    lastWatered: "test",
    freq: ""
  }
}



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
    fontSize: 40,
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
