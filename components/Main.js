import React from 'react';
import MapboxGL from '@react-native-mapbox-gl/maps';
import Geolocation from 'react-native-geolocation-service';
import {
  View,
  Text,
  PermissionsAndroid,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {db, auth} from '../firebaseconfig';

const Main = () => {
  MapboxGL.setAccessToken(
    'pk.eyJ1Ijoicm9ja3N0YXJmdW40OCIsImEiOiJja2w5MDRiYTIwdXh4MnBucDFndnZ0Y2J1In0.zTF5HAAJYlPTCrph6ZXlAg',
  );

  const permission = () => {
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      PermissionsAndroid.PERMISSIONS.INTERNET,
    );
  };

  const [locations, setlocations] = React.useState([[40, 40]]);
  const [log, setlog] = React.useState(false);
  React.useEffect(() => {
    permission();
    PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      PermissionsAndroid.PERMISSIONS.INTERNET,
    ).then(response => {
      if (response) {
        geolocation();
        Renderpoints();
      }
    });
  }, []);

  const geolocation = () => {
    Geolocation.getCurrentPosition(
      location => {
        const lat = location.coords.latitude;
        const lon = location.coords.longitude;
        var docData = {lon: lon, lat: lat};
        db.collection('user').doc(auth.currentUser.uid).set(docData);
      },
      error => console.log(error),
      {enableHighAccuracy: true, timeout: 2000, maximumAge: 1000},
      {enableHighAccuracy: true},
    );
  };

  const Renderpoints = () => {
    let coord = [];
    db.collection('user').onSnapshot(querySnapshot => {
      querySnapshot.docs.map(doc => {
        const x = [];
        x.push(doc.data().lon);
        x.push(doc.data().lat);
        coord = [...coord, x];
        setlocations(coord);
      });
    });
  };

  return (
    <View style={{width: '100%', height: '100%'}}>
      <MapboxGL.MapView style={{width: '100%', height: '100%'}} animated={true}>
        {locations.map((user, index) => (
          <View key={index.toString()}>
            <MapboxGL.PointAnnotation
              id={index.toString()}
              title="markers"
              coordinate={user}
            />
          </View>
        ))}
      </MapboxGL.MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  loginButton: {
    backgroundColor: '#46aab8',
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  loginButtonText: {
    color: '#fff',
    alignSelf: 'center',
    fontSize: 20,
  },
});

export default Main;
