import React, { useEffect, useRef, useState ,useCallback} from 'react';
import { View,Text,StyleSheet,Button,ActivityIndicator,TouchableOpacity,Image} from 'react-native';
import {NavigationContainer, useIsFocused,useFocusEffect} from '@react-navigation/native';
import RNFS from 'react-native-fs';
import { useCameraPermission,Camera, useCameraDevices,useCameraDevice,requestCameraPermission} from 'react-native-vision-camera';
const App = ({navigation})=>{
    const device = useCameraDevice('back');
    const [showCamera,setShowCamera] = useState(true);
    const camera = useRef(null);
    const [show,setshow] = useState(false);
    const [src,setSrc] = useState('');
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
       console.log(RNFS.DocumentDirectoryPath);
       //setshow(true);
       const oldPath = photo.path;
       const newPath = RNFS.DocumentDirectoryPath + '/image1.jpg';
       RNFS.copyFile(oldPath,newPath).then(()=>{console.log('success!');}).catch((error)=>{console.log('err'+error);});
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
            {show && <Image style={style.img} source={ { uri: "file:///data/user/0/com.project1/cache/mrousavy-3207401882513816704.jpg" }}/>}
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