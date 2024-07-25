import React, { useEffect, useRef, useState ,useCallback} from 'react';
import { View,Text,StyleSheet,TouchableOpacity,Image,FlatList,ScrollView} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import RNFS from 'react-native-fs';
import { Camera,useCameraDevice} from 'react-native-vision-camera';
import CustomAlert from './CustomAlert';
import { useSelector, useDispatch } from 'react-redux';
import { addImage, removeImage } from '../redux/actions';

const Item = ({src})=>{
    return(
        <View>
            <Image style={style.img} source={{ uri: 'file://'+src}}/>
        </View>
    );
}

const App = ()=>{
    const images = useSelector((state)=> state.images);
    return(
        <View>
            <FlatList
            data={images}
            renderItem={({item})=><Item src={item.src}/>}>
            </FlatList>
        </View>
    );
}
const style = StyleSheet.create({
    img:{
        width:350,
        height:420,
        alignSelf:'center',
        margin:10,
        borderRadius:10,
    }
});
export default App;