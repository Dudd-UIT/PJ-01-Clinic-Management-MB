import React, { useState, useEffect } from 'react';
import { StyleSheet, View, PermissionsAndroid, Platform, Text, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import Geolocation from 'react-native-geolocation-service';
import Icon from 'react-native-vector-icons/MaterialIcons';

const TheoDoiScreen = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [locationPermission, setLocationPermission] = useState(false);
  const clinicLocation = {
    latitude: 10.762622,
    longitude: 106.660172,
  };

  const GOOGLE_MAPS_APIKEY = 'AIzaSyBL28uDxY0_YtY3Gnu9Ai3bxCs8f16qqEI'; // Thay đổi với API Key của bạn

  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'This app needs access to your location',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          setLocationPermission(true);
          getCurrentLocation();
        } else {
          console.log('Location permission denied');
        }
      } else {
        setLocationPermission(true);
        getCurrentLocation();
      }
    };

    const getCurrentLocation = () => {
      Geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.log(error.code, error.message);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    };

    requestLocationPermission();
  }, []);

  return (
    <View style={styles.container}>
      {locationPermission ? (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: (clinicLocation.latitude + (userLocation ? userLocation.latitude : clinicLocation.latitude)) / 2,
            longitude: (clinicLocation.longitude + (userLocation ? userLocation.longitude : clinicLocation.longitude)) / 2,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          }}
          provider={MapView.PROVIDER_GOOGLE}
        >
          <Marker coordinate={clinicLocation} title="Phòng khám BCareful" />
          {userLocation && (
            <>
              <Marker coordinate={userLocation} title="Vị trí của bạn">
                <Icon name="my-location" size={40} style={styles.icon} />
              </Marker>
              <MapViewDirections
                origin={userLocation}
                destination={clinicLocation}
                apikey={GOOGLE_MAPS_APIKEY}
                strokeWidth={3}
                strokeColor="blue"
              />
            </>
          )}
        </MapView>
      ) : (
        <View style={styles.centered}>
          <Text>Ứng dụng cần quyền truy cập vị trí để hiển thị bản đồ.</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    color: 'blue'
  }
});

export default TheoDoiScreen;
