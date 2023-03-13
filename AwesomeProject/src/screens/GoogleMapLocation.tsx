import {REACT_APP_GOOGLE_MAP_KEY} from '@env';
import {View} from 'react-native';
import React, {useRef} from 'react';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {useTailwind} from 'tailwind-rn/dist';
import MapView, {LatLng, Marker} from 'react-native-maps';
import {useDispatch} from 'react-redux';
import {setOrigin} from '../redux/GoogleMapLocation/Slice';
import {useRootSelector} from '../redux/store';

const GoogleMapLocation = () => {
  const tw = useTailwind();
  const dispatch = useDispatch();

  // const googleMapLocation=  useRootSelector(
  //   state => state.googleMapLocation.location_lat,
  // );

  const location_lat = useRootSelector(
    state => state.googleMapLocation.location_lat,
  );
  const location_lng = useRootSelector(
    state => state.googleMapLocation.location_lng,
  );

  const description = useRootSelector(
    state => state.googleMapLocation.description,
  );

  const mapRef = useRef<MapView>(null);
  const moveTo = async (position: LatLng) => {
    const camera = await mapRef.current?.getCamera();
    if (camera) {
      camera.center = position;
      mapRef.current?.animateCamera(camera, {duration: 1000});
    }
  };

  return (
    <View style={tw('p-4 h-full')}>
      <MapView
        style={tw('h-1/2')}
        ref={mapRef}
        initialRegion={{
          latitude: location_lat,
          longitude: location_lng,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}>
        <Marker
          coordinate={{latitude: location_lat, longitude: location_lng}}
          title="Your favorite place"
          description={description!}
          // identifier="origin"
        />
        {/* <Image source={require('../assets/image/chopper.jpg')} style={{height: 35, width:35 }}  */}
        {/* </Marker> */}
      </MapView>

      {/* style={tw('flex-row bg-white border mt-6  ')} */}
      <View style={tw('flex-row bg-white border mt-6  ')}>
        <GooglePlacesAutocomplete
          GooglePlacesDetailsQuery={{fields: 'geometry'}}
          minLength={2}
          placeholder="Search"
          fetchDetails={true}
          nearbyPlacesAPI="GooglePlacesSearch"
          enablePoweredByContainer={false}
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            const description = data.description;
            const location_lat = details?.geometry.location.lat;
            const location_lng = details?.geometry.location.lng;

            dispatch(setOrigin({location_lat, location_lng, description}));
            const position = {
              latitude: details?.geometry.location.lat as number,
              longitude: details?.geometry.location.lng as number,
            };

            moveTo(position);
          }}
          query={{key: REACT_APP_GOOGLE_MAP_KEY, language: 'en'}}
        />
      </View>
    </View>
  );
};

export default GoogleMapLocation;
