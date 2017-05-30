import React, {Component} from 'react';
import {ScrollView} from 'react-native';
import { List, ListItem} from 'react-native-elements';

export default class QuakeDetail extends Component {
    render(){
        const {title} = this.props.navigation.state.params;

        return(
            <ScrollView>

                <List>
                    <ListItem
                        title="Birthday"
                        rightTitle={title}
                        hideChevron
                    />
                    <ListItem
                        title="City"
                        rightTitle={title}
                        hideChevron
                    />
                </List>
            </ScrollView>
        )
    }
}