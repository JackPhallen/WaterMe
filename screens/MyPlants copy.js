import React from 'react';
import { Button, View, Text, StyleSheet, Alert, TouchableOpacity} from "react-native";

export default function MyPlants() {
  function _newPlantButton() {
    Alert.alert("Pressed");
  }
  return (
    <View style={styles.main}>
      <Text>Home Screen</Text>
      <TouchableOpacity 
        onPress={ () => { 
          addPlantAction() 
         } }>
        <View style={styles.button}>
          <Text style={styles.buttonText}>TouchableOpacity</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

function addPlantAction() {
  Alert.alert("yeet");
}

MyPlants.navigationOptions = {
  title: 'My Plants',
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e9f3df",
  },
  button: {
    marginBottom: 30,
    width: 260,
    alignItems: 'center',
    backgroundColor: '#2196F3'
  },
});
