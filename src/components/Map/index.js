import React, {Component, Fragment}  from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, Pressable } from "react-native";
import MapView, { Marker } from "react-native-maps";
import Geolocation from '@react-native-community/geolocation';
import Search from '../Search';
import Directions from '../Directions';
import Geocoder from 'react-native-geocoding';
import Details from '../Details';

import markerImage from '../../assets/imgs/marker.png';
import backImagem from '../../assets/imgs/back.png';

Geocoder.init('API_KEY');

export default class Map extends Component {

  state = {
    region: null,
    destination: null,
    duration: null,
    locationAt: null
  };

  async componentDidMount(){
    Geolocation.getCurrentPosition(
      async ({ coords: { latitude, longitude } }) => {

        const response = await Geocoder.from({ latitude, longitude });
        const address = response.results[0].formatted_address;
        const locationAt = address.substring(0, address.indexOf(','));

        this.setState({
            locationAt,
            region: {
              latitude,
              longitude,
              latitudeDelta: 0.0143,
              longitudeDelta: 0.0134,
            }
          });
      }, //sucesso
      () => {}, //erro
      {
        timeout: 3000,
        enableHighAccuracy: true,
        maximumAge: 1000
      }
    )
  }

  handleLocationSelected = (data, {geometry}) => {
    const { location : { lat: latitude, lng: longitude}} = geometry;

    this.setState({
      destination: {
        latitude,
        longitude,
        title: data.structured_formatting.main_text,
      }
    })
  }

  handleBack = () => {
    this.setState({destination: null});
  }

  render(){

    const { region, destination, duration, locationAt } = this.state;
    
    return (
    <SafeAreaView style={{flex:1}}>
      <MapView 
        style={StyleSheet.absoluteFillObject}
        region={region}
        showsUserLocation
        loadingEnabled
        ref={el => this.mapView = el}
        >
          { destination && (
            <Fragment>
              <Directions
                origin={region}
                destination={destination}
                onReady={ result => {

                  this.setState({ duration: Math.floor(result.duration) })

                  this.mapView.fitToCoordinates(result.coordinates, {
                    edgePadding:{
                      right: 100,
                      left: 100,
                      top: 100,
                      bottom: 300
                    }
                  });
                }}
                />
                <Marker 
                  coordinate={destination} 
                  anchor={{ x:0, y:0}}
                  image={markerImage}
                >
                  <Text style={styles.texto}>{destination.title}</Text>
                </Marker>

                <Marker 
                  coordinate={region} 
                >
                  <View style={styles.container}>
                    <View style={styles.boxBlack}>
                      <Text style={styles.TextTimeDuraction}>{duration}</Text> 
                      <Text style={styles.TextTime}>min</Text> 
                    </View>
                    <Text style={styles.texto}>{locationAt}</Text>
                  </View>
                </Marker>
              </Fragment>
          ) }
        </MapView>

        { destination ? (
          <Fragment>
            <Pressable style={styles.Back} onPress={this.handleBack}>
              <Image source={backImagem}/>
            </Pressable>
            <Details/>
          </Fragment>
        ) : <Search onLocationSelected={this.handleLocationSelected}/>}
      
      </SafeAreaView>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap:"wrap"
  },  
  texto: {
    padding: 12,
    paddingTop: 8,
    paddingBottom: 8,
    fontSize: 15,
    color:"#222",
    backgroundColor: "#ffffff",
    marginTop:20
  },
  boxBlack:{
    padding: 5,
    paddingTop: 2,
    paddingBottom: 2,
    backgroundColor:"#000",
    fontSize: 10,
    textAlign: "center",
  },
  TextTimeDuraction:{
    color: "#fff",
    textAlign: "center",
    fontSize: 13,
  },
  TextTime: {
    color: "#fff",
    paddingTop: 0,
    textAlign: "center",
    fontSize: 11,
  },

  Back: {
    top: 50,
    borderWidth: 0,
    backgroundColor: "transparent",
    position: "absolute",
    left: 20
  }
});