import React, {Component} from 'react';
import {
    Text,
    View,
    ScrollView
} from 'react-native';
import {List, ListItem} from 'react-native-elements';

export default class QuakesList extends Component {
    onLearnMore = (user) => {
        this.props.navigation.navigate('Details', { ...user });
    };

    render(){
        return(
            <ScrollView>
                <List>
                    <ListItem
                        key={'1'}
                        title='test'
                        onPress={() => this.onLearnMore(quake)}
                    />
                </List>
            </ScrollView>
        )
    }

}