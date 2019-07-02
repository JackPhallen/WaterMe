import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import PlantListStackContainer from './navigation/AppNavigator';
import * as Actions from './actions/plants.actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <PlantListStackContainer />
            </Provider>
        );
    }
}