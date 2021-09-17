import React from 'react';
import MapboxGL from '@react-native-mapbox-gl/maps';

import {
  View,
  Text,
  PermissionsAndroid,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
  ScrollView,
} from 'react-native';
import x from './landmarks.json';

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

  const cameraRef = React.createRef();
  const [index, setIndex] = React.useState(0);
  const [modal, setModal] = React.useState(false);
  const [data, setData] = React.useState(x.data.allLandmarks);

  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
      }}>
      <MapboxGL.MapView style={{width: '100%', height: '100%'}} animated={true}>
        <MapboxGL.Camera ref={cameraRef} />
        {data.map((item, index) => {
          return (
            <View key={index.toString()}>
              {/* <MapboxGL.PointAnnotation
                id={index.toString() + 'mark'}
                coordinate={[item.location.longitude, item.location.latitude]}
              /> */}
              <MapboxGL.MarkerView
                id={index.toString() + 'sndsdsd'}
                coordinate={[item.location.longitude, item.location.latitude]}>
                <TouchableOpacity
                  style={styles.container}
                  onPress={() => {
                    setIndex(index);
                    setModal(!modal);
                    cameraRef.current?.setCamera({
                      centerCoordinate: [
                        item.location.longitude,
                        item.location.latitude,
                      ],
                      zoomLevel: 18,
                      animationDuration: 1000,
                    });
                  }}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      marginLeft: 10,
                      marginRight: 10,
                    }}>
                    {item.name}
                  </Text>
                </TouchableOpacity>
              </MapboxGL.MarkerView>
            </View>
          );
        })}
      </MapboxGL.MapView>
      {modal ? (
        <View
          style={{
            position: 'absolute',
            bottom: 10,
            left: 0,
            width: '100%',
            height: '20%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              backgroundColor: 'white',
              borderRadius: 20,
              height: '100%',
              width: '90%',
            }}>
            <Image
              source={{uri: x.data.allLandmarks[index].images[1].url}}
              style={{
                width: '30%',
                height: '100%',
                borderTopLeftRadius: 20,
                borderBottomLeftRadius: 20,
              }}
            />
            <View
              style={{display: 'flex', flexDirection: 'column', width: '70%'}}>
              <Text
                style={{
                  marginRight: 10,
                  marginLeft: 10,
                  fontWeight: 'bold',
                  marginTop: 10,
                  marginBottom: 10,
                  fontSize: 18,
                }}>
                {x.data.allLandmarks[index].name}
              </Text>
              <Text
                style={{
                  marginRight: 10,
                  marginLeft: 10,
                  fontWeight: 'bold',
                  marginTop: 10,
                  marginBottom: 10,
                  fontSize: 14,
                }}>
                {x.data.allLandmarks[index].description}
              </Text>
            </View>
          </View>
        </View>
      ) : null}

      {data.map((item, index) => {
        return (
          <TouchableOpacity
            key={item.name}
            style={{
              backgroundColor: 'white',
              position: 'absolute',
              top: index * 80,
              display: 'flex',
              left: 10,
              flexDirection: 'row',
              width: 'auto',
              height: 60,
              borderRadius: 60,
              aliginItems: 'center',
            }}
            onPress={() => {
              setModal(!modal);
              setIndex(index);
              cameraRef.current?.setCamera({
                centerCoordinate: [
                  item.location.longitude,
                  item.location.latitude,
                ],
                zoomLevel: 18,
                animationDuration: 1000,
              });
            }}>
            <Image
              source={{uri: item.images[1].url}}
              style={{width: 60, height: '100%', borderRadius: 30}}
            />
            <Text
              style={{marginRight: 10, marginLeft: 10, alignSelf: 'center'}}>
              {item.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 40,
    width: '30%',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
  },
});
export default Main;
