import React, { useEffect, useState ,useCallback} from 'react';
import { View,Text,StyleSheet,RefreshControl,Image,FlatList,ScrollView} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import * as Location from 'expo-location';
import {
    accelerometer,
    setUpdateIntervalForType,
    SensorTypes
  } from "react-native-sensors";

const App = ()=>{
    const [orientation, setOrientation] = useState({});
    const [location, setLocation] = useState({coords:{}});
    setUpdateIntervalForType(SensorTypes.accelerometer, 500);
    async function loc (){
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            console.log('could not get permission');
            return;
        }
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
        console.log(location)
    }
    useEffect(()=>{
        const subscription = accelerometer.subscribe((data) =>{
            setOrientation(data); }    
        );
        setInterval(loc,10000);
        return () => {
            subscription.unsubscribe();
        };
    },[]);
    return(
        <View style={style.container}> 
            <Text style={style.text}>Location: </Text>
            <View style={style.sensorsContainer}>
                    <Text style={style.text}>Altitude: {location.coords.altitude}</Text>
                    <Text style={style.text}>Longitude: {location.coords.longitude}</Text>
                    <Text style={style.text}>Latitude: {location.coords.latitude}</Text>
                    <Text style={style.text}>Speed: {location.coords.speed}</Text>
            </View>
            <Text style={style.text}>Orientation: </Text>
            <View style={style.sensorsContainer}>
                    <Text style={style.text}>X: {orientation.x}</Text>
                    <Text style={style.text}>Y: {orientation.y}</Text>
                    <Text style={style.text}>Z: {orientation.z}</Text>
            </View>
        </View>
    );
}
const style = StyleSheet.create({
    sensorsContainer:{
        width:340,
        backgroundColor:'#355c5c',
        padding:10,
        borderRadius:20,
    },
    container:{
        flex:1,
        justifyContent:'flex-start',
        alignItems:'center'
    },
    text:{
        fontSize:18,
        backgroundColor:'#183D3D',
        margin:8,
        padding:13,
        borderRadius:20,
    }
});
export default App;