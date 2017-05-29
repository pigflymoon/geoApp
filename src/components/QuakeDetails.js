import React, {PropTypes} from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    ScrollView
} from 'react-native';

import {List, ListItem, Grid, Row, Card, Button} from 'react-native-elements'

import QuakeMap from './QuakeMap';

const QuakeDetails = ({quake}) => (

    <Grid>

        <Row>
            <ScrollView>
                <List>
                    <ListItem
                        title="Universal Time"
                        rightTitle={quake.utime}
                        hideChevron
                    />
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
                    <ListItem style={styles.lastItem}
                              title="Quality"
                              rightTitle={quake.properties.quality}
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
        </Row>
        <Row >

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
    },
    quality: {
        borderBottomColor: '#eeeeee',
        borderBottomWidth: 1,
        paddingBottom: 5,
        marginBottom: 5,
    }
});

export default QuakeDetails;
