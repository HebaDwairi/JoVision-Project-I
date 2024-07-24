import React from 'react';
import { View,Text,StyleSheet,Button} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Screen1 from './Components/screen1';
const Tab = createBottomTabNavigator();

const Screen2 = ({navigation})=>{
    return(
        <View style={style.container}>
            <Text style={style.text}>Screen two</Text>
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
                <Tab.Screen name="screen1" component={Screen1} />
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
    }
});

export default App;