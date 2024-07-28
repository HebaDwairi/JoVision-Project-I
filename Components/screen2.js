import React, { useEffect, useState ,useCallback} from 'react';
import { View,Text,StyleSheet,RefreshControl,Image,FlatList,ScrollView} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import {
    accelerometer,
    setUpdateIntervalForType,
    SensorTypes
  } from "react-native-sensors";

const App = ()=>{
    const [orientation, setOrientation] = useState({});
    setUpdateIntervalForType(SensorTypes.accelerometer, 500);
    useEffect(()=>{
        const subscription = accelerometer.subscribe((data) =>{
            setOrientation(data); }    
        );
        return () => {
            subscription.unsubscribe();
        };
    },[]);
    return(
        <ScrollView>
            <View style={style.container}> 
            <Text style={style.text}>Location: </Text>
            <View style={style.sensorsContainer}>
                    <Text style={style.text}>Altitude: {}</Text>
                    <Text style={style.text}>Longitude: {}</Text>
                    <Text style={style.text}>Latitude: {}</Text>
                    <Text style={style.text}>Speed: {}</Text>
            </View>
            <Text style={style.text}>Orientation: </Text>
            <View style={style.sensorsContainer}>
                    <Text style={style.text}>X: {orientation.x}</Text>
                    <Text style={style.text}>Y: {orientation.y}</Text>
                    <Text style={style.text}>Z: {orientation.z}</Text>
            </View>
            </View>
        </ScrollView>
    );
}
const style = StyleSheet.create({
    sensorsContainer:{
        width:340,

        backgroundColor:'#355c5c',
        padding:12,
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
        padding:15,
        borderRadius:20,
    }
});
export default App;