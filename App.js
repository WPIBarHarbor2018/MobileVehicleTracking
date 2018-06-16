import React from 'react';
import { AppRegistry, StyleSheet, Text, View } from 'react-native';

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      lat: 0.0,
      long: 0.0,
      count: 0,
      userID: 0,
    };

    {/*Temporary example of request to get unique userID
       https://bhiqp.ky8.io/devreg*/}
    fetch('https://www.google.com', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'PSK': '8675309'
      }),
      method: 'POST'
    })
    .then(response => this.setState({userID: 800}))
    .catch(error => console.error(error));
  }

  componentWillUnmount() {
    navigator.geolocation.stopWatch(this.state.watchID);
  }

  render() {
    watchID = navigator.geolocation.watchPosition((position) => {

      {/*Temporary example of logic used to check if coordinates
       are within boundaries surrounding the park*/}
      if ((position.coords.longitude < 90) && (position.coords.longitude > -90)
          && (position.coords.latitude < 90) && (position.coords.latitude > -90)) {
        this.setState({
          lat: position.coords.latitude,
          long: position.coords.longitude,
          count: this.state.count + 1,
        });
        {/*Temporary example of sending data point to
        the server*/}
        fetch('https://www.google.com', {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.state),
          method: 'POST'
        })
        .then(response => this.setState({userID: 800}))
        .catch(error => console.error(error));
      }
    },
    (error) => alert(JSON.stringify(error)),
    {enableHighAccuracy: false, distanceFilter: 15})

    {/*Print position to the screen*/}
    return (
      <View style={styles.container}>
        <Text>Latitude: {this.state.lat}</Text>
        <Text>Longitude: {this.state.long}</Text>
        <Text>count: {this.state.count}</Text>
        <Text>userID: {this.state.userID}</Text>
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
