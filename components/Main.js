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
//import Icon from 'react-native-elements';

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

  const [locations, setlocations] = React.useState([{name: '', x: [40, 40]}]);
  const [log, setlog] = React.useState(false);
  const [polyloc, setpolyloc] = React.useState([]);
  React.useEffect(() => {
    permission();
    PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      PermissionsAndroid.PERMISSIONS.INTERNET,
    ).then(response => {
      if (response) {
        geolocation();
      }
    });
  }, []);

  // setTimeout(() => {
  //   geolocation();
  // }, 5000);
  const geolocation = () => {
    Geolocation.getCurrentPosition(
      location => {
        const lat = location.coords.latitude;
        const lon = location.coords.longitude;
        var mail = auth.currentUser.email;
        mail = mail.split('@gmail.com');
        mail = mail.join('');
        console.log(mail);
        var docData = {lon: lon, lat: lat, mail: mail};
        console.log(auth.currentUser.uid);
        db.collection('user').doc(auth.currentUser.uid).set(docData);
        setTimeout(() => Renderpoints(), 3000);
      },
      error => geolocation(),
      {enableHighAccuracy: true, timeout: 5000, maximumAge: 1000},
      {enableHighAccuracy: true},
    );
  };

  const Renderpoints = () => {
    let coord = [];
    let poly = [];
    db.collection('user').onSnapshot(querySnapshot => {
      querySnapshot.docs.map(doc => {
        const x = [];
        var dat = new Object();
        dat.name = doc.data().mail;
        x.push(doc.data().lon);
        x.push(doc.data().lat);
        dat.x = x;
        coord = [...coord, dat];
        setlocations(coord);
        poly = [...poly, x];
        setpolyloc(poly);
        console.log(polyloc);
        setlog(true);
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
              coordinate={user.x}
            />
            <MapboxGL.MarkerView id={index.toString()} coordinate={user.x}>
              <View style={styles.container}>
                <Text>{user.name}</Text>
              </View>
            </MapboxGL.MarkerView>
          </View>
        ))}
        {log ? (
          <MapboxGL.ShapeSource
            id="polygonSource"
            maxZoomLevel={12}
            shape={{
              type: 'Feature',
              geometry: {
                type: 'Polygon',
                coordinates: [polyloc],
              },
            }}>
            <MapboxGL.FillLayer
              id="polygion"
              style={{
                fillOpacity: 0.2,
                fillColor: 'red',
                fillOutlineColor: '#ffffff',
              }}
            />
          </MapboxGL.ShapeSource>
        ) : null}
      </MapboxGL.MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    width: 100,
    height: 20,
    justifyContent: 'center',
    //width: moderateScale(100),
    backgroundColor: 'white',
    borderRadius: 8,
    //height: moderateScale(100),
  },
});
export default Main;
