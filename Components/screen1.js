import React, { useEffect } from 'react';
import { View,Text,StyleSheet,Button} from 'react-native';
import { useCameraPermission } from 'react-native-vision-camera';
const Screen1 = ({navigation})=>{
    const { hasPermission, requestPermission } = useCameraPermission();
    return(
        <View style={style.container}>
            <Text style={style.text}>Screen one</Text>
        </View>
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
export default Screen1;