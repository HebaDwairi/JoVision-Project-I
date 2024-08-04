import React, { useEffect, useState } from 'react';
import { View,Text,StyleSheet, Image,ScrollView} from 'react-native';
import * as Location from 'expo-location';
import { useDeviceOrientation } from 'react-native-expo-device-orientation';
import {
    accelerometer,
    setUpdateIntervalForType,
    SensorTypes
  } from "react-native-sensors";

const App = ()=>{
    const [orientation, setOrientation] = useState({x:0,y:0,z:0});
    const [location, setLocation] = useState({coords:{}});
    const rotation = useDeviceOrientation();
    
    async function loc (){  
        const location = await Location.getCurrentPositionAsync({});
        setLocation(location);
        console.log(location);
    }
    useEffect(()=>{
        const subscription = accelerometer.subscribe((data) =>{
            setOrientation(data); }    
        );
        const requestLocationPermission = async ()=> {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.log('could not get permission');
                return;
            }
        }
        requestLocationPermission();
        loc();
        setUpdateIntervalForType(SensorTypes.accelerometer, 500);
        setInterval(loc,10000);
        return () => {
            subscription.unsubscribe();
        };
    },[]);

    return(
        <ScrollView> 
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
            <Image source={{uri: 'file:///data/user/0/com.project1/files/guitar.jpg'}}
            style={{width:350, height:350, alignSelf:'center',margin:50,transform: [{rotate: rotation+'deg'}], borderRadius:20}}/>
        </ScrollView>
    );
}
const style = StyleSheet.create({
    sensorsContainer:{
        width:340,
        backgroundColor:'#355c5c',
        padding:10,
        borderRadius:20,
        alignSelf:'center'
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


