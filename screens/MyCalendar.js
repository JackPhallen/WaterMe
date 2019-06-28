import React from 'react';
import { Button, View, Text, StyleSheet, Alert, TouchableOpacity} from "react-native";
import { Constants } from "expo";

export default class MyCalendar extends React.Component {
  static navigationOptions = {
  };

  render() {
    return (
      <View style={styles.main}>
        <Text>Calendar Hadfere</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#e9f3df",
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
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  }
});
