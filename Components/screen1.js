import React, { useEffect, useRef, useState ,useCallback} from 'react';
import { View,Text,StyleSheet,Button,ActivityIndicator,TouchableOpacity} from 'react-native';
import {NavigationContainer, useIsFocused,useFocusEffect} from '@react-navigation/native';
import { DocumentDirectoryPath, writeFile } from 'react-native-fs';
import { useCameraPermission,Camera, useCameraDevices,useCameraDevice,requestCameraPermission} from 'react-native-vision-camera';
const App = ({navigation})=>{
    const device = useCameraDevice('back');
    const [showCamera,setShowCamera] = useState(true);
    const camera = useRef(null);
    useFocusEffect(
        useCallback(() => {
          setShowCamera(true);
          return () => {
            setShowCamera(false);
          };
        }, [])
      );
      useEffect(()=>{
        const checkCameraPermission = async () => {
            const permission = Camera.requestCameraPermission();
          };
          checkCameraPermission();
      },[]);
      const takeAPhoto = async()=>{
       const photo = await camera.current.takePhoto();
       console.log(photo.path)
      }
    return (
        <View style={StyleSheet.absoluteFill}>
            <Camera
            style={StyleSheet.absoluteFill}
            device={device}
            isActive={showCamera}
            ref={camera}
            photo={true}
            />
            <TouchableOpacity onPress={takeAPhoto} style={style.capture}></TouchableOpacity>
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
        fontSize:25,
        color:'black',
    },
    capture:{
        backgroundColor:'white',
        alignSelf:'center',
        position:'absolute',
        bottom:20,
        padding:20,
        borderRadius:50,
        width:85,
        height:85,
        borderWidth:6,
        borderColor:'gray',
        opacity:0.8,
    },

});
export default App;