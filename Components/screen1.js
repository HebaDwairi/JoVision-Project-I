import React, { useEffect, useRef, useState ,useCallback} from 'react';
import { View,Text,StyleSheet,TouchableOpacity,Image} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import RNFS from 'react-native-fs';
import { Camera,useCameraDevice} from 'react-native-vision-camera';
import CustomAlert from './CustomAlert';
const App = ({navigation})=>{
    const device = useCameraDevice('back');
    const [showCamera,setShowCamera] = useState(true);
    const camera = useRef(null);
    const [showPreview,setShowPreview] = useState(false);
    const [src,setSrc] = useState('');
    const [imageNum, setImageNum] = useState(1);
    const discardImage = ()=>{
      
    }
    const AlertContent = () =>{
      return(
        <View style={style.container}>
          <Image style={style.img} source={src}></Image>
          {console.log(src)}
          <View style={style.btnContainer}>
            <TouchableOpacity  style={style.btn} onPress={()=>{setShowPreview(false)}}><Text style={style.text}>Save</Text></TouchableOpacity>
            <TouchableOpacity style={style.btn} onPress={discardImage}><Text  style={style.text}>Discard</Text></TouchableOpacity>
          </View>
        </View>
      );
    }
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

    const confirmPhoto = (path)=>{
        const oldPath = path;
        const newPath = RNFS.DocumentDirectoryPath + '/image1.jpg';
        RNFS.copyFile(oldPath,newPath).then(()=>{console.log('success!');}).catch((error)=>{console.log('err'+error);});
        setSrc({ uri: 'file://'+path});
        setShowPreview(true);
    }

    const takeAPhoto = async()=>{
      try{
        const photo = await camera.current.takePhoto();
        confirmPhoto(photo.path);
      }
      catch(err){
        console.log('error while taking a photo' + err);
      }
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
            <CustomAlert show={showPreview} setShow={setShowPreview} content={<AlertContent src={src}/>}/> 
        </View>
    );
}
const style = StyleSheet.create({
    container:{
      backgroundColor:'#5C8374',
      padding:20,
      borderRadius:20,

    },
    text:{
        fontSize:18,
        color:'#ffffff',
        alignSelf:'center'
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
    img:{
      width:330,
      height:500,
      borderRadius:20,
    },
    btnContainer:{
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'space-around',
      paddingTop:10,
    },
    btn:{
      backgroundColor:'#183D3D',
      padding:8,
      width:100,
      borderRadius:10,
    }
});
export default App;