import React from 'react';
import { Provider } from 'react-redux';
import PlantList from './screens/PlantList'
import store from './store';

export default class App extends React.Component {
    
    render() {
        return (
            <Provider store={store}>
                <PlantList />
            </Provider>
        );
    }
}


