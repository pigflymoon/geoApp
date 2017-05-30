import React, {Component} from 'react';
import {
    Text,
    View,
    ScrollView
} from 'react-native';
import {List, ListItem} from 'react-native-elements';

export default class QuakesMap extends Component {
    render(){
        return(
            <ScrollView>
                <List>
                    <ListItem
                        key={'1'}

                        title='test'

                    />
                </List>
            </ScrollView>
        )
    }

}