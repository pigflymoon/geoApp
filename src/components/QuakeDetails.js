import React, {PropTypes} from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    ScrollView
} from 'react-native';

import {List, ListItem, Grid, Row, Rating} from 'react-native-elements'

import QuakeMap from './QuakeMap';

const QuakeDetails = ({quake}) => (

    <Grid>
        <Row size={2}>
            <ScrollView>
                <List>
                    <ListItem
                        title="Time"
                        rightTitle={quake.properties.time}
                        hideChevron
                    />
                    <ListItem
                        title="Magnitude"
                        rightTitle={quake.properties.magnitude}
                        hideChevron
                    />
                    <ListItem
                        title="Latitude"
                        rightTitle={(quake.geometry.coordinates)[1].toFixed(2)}
                        hideChevron
                    />
                    <ListItem
                        title="Longitude"
                        rightTitle={(quake.geometry.coordinates)[0].toFixed(2)}
                        hideChevron
                    />
                    <ListItem
                        title="Location"
                        rightTitle={quake.properties.locality}
                        hideChevron
                    />
                    <ListItem
                        title="Quality"
                        rightTitle={quake.properties.quality}
                        hideChevron

                    />

                    <Text h4>Best: This earthquake location has been manually reviewed and has the best quality location.</Text>
                </List>
            </ScrollView>
        </Row>
        <Row size={2}>
            <QuakeMap style={styles.map} mapInfo={quake}/>
        </Row>
    </Grid>

);

QuakeDetails.propTypes = {
    ...View.propTypes,
    quake: PropTypes.object.isRequired
};

const styles = StyleSheet.create({
    quake: {
        flex: 1,
        // flexDirection: 'column',
        // justifyContent: 'center',
        // paddingTop: 40,
        // backgroundColor: '#FFFFFF'
    },
    info: {
        flexDirection: 'column',
        paddingTop: 40,
        paddingLeft: 10,
        alignSelf: 'flex-start',
    },
    fontBold: {
        fontWeight: '700'
    },
    map: {
        // height: 300,
        // flexGrow: 4,
        // flexDirection: 'column',
    }

});

export default QuakeDetails;
