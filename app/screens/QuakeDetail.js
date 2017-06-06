import React, {Component} from 'react';
import {ScrollView, View, StyleSheet, Text} from 'react-native';
import {List, ListItem, Card} from 'react-native-elements';
import QuakeMap from '../components/QuakeMap';

export default class QuakeDetail extends Component {
    render() {
        const {geometry, properties, utime} = this.props.navigation.state.params;
        return (
            <View style={styles.container}>
                <ScrollView style={StyleSheet.absoluteFill}
                            contentContainerStyle={styles.scrollview}>
                    <QuakeMap style={styles.map} mapInfo={this.props.navigation.state.params}/>


                    <List style={styles.detail}>
                        <ListItem
                            title="Universal Time"
                            rightTitle={utime}
                            hideChevron
                        />
                        <ListItem
                            title="Time"
                            rightTitle={properties.time}
                            hideChevron
                        />
                        <ListItem
                            title="Magnitude"
                            rightTitle={properties.magnitude}
                            hideChevron
                        />
                        <ListItem
                            title="Latitude"
                            rightTitle={(geometry.coordinates)[1].toFixed(2)}
                            hideChevron
                        />
                        <ListItem
                            title="Longitude"
                            rightTitle={(geometry.coordinates)[0].toFixed(2)}
                            hideChevron
                        />
                        <ListItem
                            title="Location"
                            rightTitle={properties.locality}
                            hideChevron
                        />
                        <ListItem
                            title="Quality"
                            rightTitle={properties.quality}
                            hideChevron
                        />
                        <Card
                            title='Quality'
                        >
                            <ListItem style={styles.quality}
                                      title={'Best: This earthquake location has been manually reviewed and has the best quality location.'}
                                      titleStyle={{fontSize: 10}}
                                      hideChevron

                            />
                            <ListItem style={styles.quality}
                                      title={'Good: This is an automatic earthquake location with a lot of observations.  It is likely to be good quality.'}
                                      titleStyle={{fontSize: 10}}
                                      hideChevron

                            />
                            <ListItem style={styles.quality}
                                      title={'Caution: This is an automatic earthquake location with only a few observations.  Treat with caution.'}
                                      titleStyle={{fontSize: 10}}
                                      hideChevron

                            />
                            <ListItem style={styles.quality}
                                      title={'Deleted: We don\'t have any quality information for this location at the moment.'}
                                      titleStyle={{fontSize: 10}}
                                      hideChevron

                            />
                        </Card>

                    </List>


                </ScrollView>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff"
    },
    scrollview: {
        flex: 1,
        flexDirection: 'column',
    },
    map: {
        flexGrow: 2,
        flexBasis: 200,
    },
    detail: {
        flexGrow: 1,
        flexBasis: 200,

    },
});