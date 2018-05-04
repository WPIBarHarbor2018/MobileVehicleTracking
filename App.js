import React from 'react';
import { AppRegistry, StyleSheet, Text, View } from 'react-native';

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      lat: 0.0,
      long: 0.0,
      watchID: 0,
    };
  }

  componentWillUnmount() {
    navigator.geolocation.stopWatch(this.state.watchID);
  }

  render() {
    watchID = navigator.geolocation.watchPosition((position) => {
      this.setState({
        lat: position.coords.latitude,
        long: position.coords.longitude,
        watchID: watchID,
      });
    },
    (error) => alert(JSON.stringify(error)),
    {enableHighAccuracy: false, distanceFilter: 15})

    return (
      <View style={styles.container}>
        <Text>Latitude: {this.state.lat}</Text>
        <Text>Longitude: {this.state.long}</Text>
        <Text>watchID: {this.state.watchID}</Text>
      </View>
    );
  }
}

AppRegistry.registerComponent('App', () => App);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
