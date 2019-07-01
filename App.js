import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import PlantListStackContainer from './navigation/AppNavigator';

export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <PlantListStackContainer />
            </Provider>
        );
    }
}


