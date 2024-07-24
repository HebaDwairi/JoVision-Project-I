import React from 'react';
import { View,Text,StyleSheet,Button,Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Screen1 from './Components/screen1';
import RNFS from 'react-native-fs';
const Tab = createBottomTabNavigator();

const Screen2 = ({navigation})=>{
    return(
        <View style={style.container}>
            <Text style={style.text}>Screen two</Text>
            <Image style={style.img} source={{ uri: 'file://'+RNFS.DocumentDirectoryPath + '/image1.jpg'}}/>
        </View>
    );
}
const Screen3 = ({navigation})=>{
    return(
        <View style={style.container}>
            <Text style={style.text}>Screen three</Text>
        </View>
    );
}
const Screen4 = ({navigation})=>{
    return(
        <View style={style.container}>
            <Text style={style.text}>Screen four</Text>
        </View>
    );
}
const App = () =>{
    return(
        <NavigationContainer style={style.container}>
            <Tab.Navigator>
                <Tab.Screen name="Camera" component={Screen1} />
                <Tab.Screen name="screen2" component={Screen2} />
                <Tab.Screen name="screen3" component={Screen3} />
                <Tab.Screen name="screen4" component={Screen4} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}
const style = StyleSheet.create({
    container:{
       flex:1,
       justifyContent:'center',
       alignItems:'center'
    },
    text:{
        fontSize:35,
        color:'black',
    },
    img:{
        width:300,
        height:300,
    }
});

export default App;