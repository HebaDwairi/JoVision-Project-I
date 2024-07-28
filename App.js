import React from 'react';
import { View,Text,StyleSheet,Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Screen1 from './Components/screen1';
import Screen3 from './Components/screen3';
import Screen4 from './Components/screen4';
import Screen2 from './Components/screen2';
import RNFS from 'react-native-fs';
import { persistor,store } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';

const Tab = createBottomTabNavigator();

const Scren2 = ({navigation})=>{
    return(
        <View style={style.container}>
            <Text style={style.text}>Screen two</Text>
            <Image style={style.img} source={{ uri: 'file://'+RNFS.DocumentDirectoryPath + '/image0.jpg'}}/>
        </View>
    );
}
const MyTheme = {
    dark: true,
    colors: {
      primary: '#355c5c',
      background: '#183D3D',
      card: '#2c4f4f',
      text: 'white',
      border: '#93B1A6',
      notification: 'rgb(255, 69, 58)',
    },
  };
const App = () =>{
    return(
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <NavigationContainer theme={MyTheme}>
                <Tab.Navigator  screenOptions={{
                    tabBarActiveBackgroundColor:'#183D3D',
                    tabBarInactiveBackgroundColor:'#355c5c',
                    tabBarActiveTintColor:'#ffffff',
                    tabBarInactiveTintColor:'gray',
                }}>
                    <Tab.Screen name="Camera" component={Screen1} />
                    <Tab.Screen name="Sensors" component={Screen2} />
                    <Tab.Screen name="Gallery" component={Screen3} />
                    <Tab.Screen name="Slideshow" component={Screen4} />
                </Tab.Navigator>
            </NavigationContainer>
            </PersistGate>
            
        </Provider>
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