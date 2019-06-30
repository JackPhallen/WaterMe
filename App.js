import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import PlantListStackContainer from './navigation/AppNavigator';
import * as Actions from './actions/plants.actions';
import * as Storage from './utils/StoreData'

export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <PlantListStackContainer />
            </Provider>
        );
    }
}


