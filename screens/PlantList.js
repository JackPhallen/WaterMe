import React from 'react';
import {View, Text, Button} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as Actions from '../plants.actions';

class PlantList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newPlant: {
        desc: "two flower",
        name: "new flower"
      },
      yeet: "yaw"
    };

  }


  componentDidMount(){
    this.props.actions$fetchPlants();
  }

  render() {
    return (
      <View style={{ flex:1, justifyContent: "center" }}>
        <Text>{JSON.stringify(this.props.plants)}</Text>
        <Button
        onPress={ () => {
          this.props.navigation.navigate('AddPlant');
        }}
        title="Add" />
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

export default connect(mapStateToProps, mapDispatchToProps)(PlantList);