import React, { useEffect, useRef, useState,useCallback } from 'react';
import { View,Text,StyleSheet,Image,FlatList,TouchableOpacity} from 'react-native';
import { useSelector} from 'react-redux';
import Video from 'react-native-video';
import { useFocusEffect } from '@react-navigation/native';
const Item = ({item})=>{

    return(
        <View>
            {item.type == 'image' ? 
            <Image style={style.img} source={{ uri: 'file://'+item.src}}/>:
            <Video
            source={{ uri: 'file://'+item.src}}
            controls={true}
            style={style.img}
            paused={false}/>  }  
        </View>
    );
}

const App = ({route, navigation})=>{
    const [isPaused,setIsPaused] = useState(false);
    const media = useSelector((state)=> state.media);
    const flatListRef = useRef(null);
    const maxNum = media.length;
    const index = route.params.index;
    const scroll = () => {
        flatListRef.current.scrollToIndex({animated:false, index:index}); 
        console.log( route.params.index)
       }
    useFocusEffect(
       useCallback(() => {
        console.log('scrrooo')
        scroll();
       }, [])
    );
    
    return(
        <View style={style.container}>
            <FlatList
            data={media}
            renderItem={({item})=><Item item={item}/>}
            horizontal={true}
            ref={flatListRef}
            scrollEnabled={true}
            getItemLayout ={(data, index) => ({
                length: 700,
                offset: 393 * index,
                index
              })} >
            </FlatList> 
        </View>
    );
}
const style = StyleSheet.create({
    img:{
        width:392,
        height:700,
        alignSelf:'center',
        marginHorizontal:1,
    },
    container:{
        backgroundColor:'#183D3D',
    },
    text:{
        fontSize:20,
        alignSelf:'center',

    },
    btnContainer:{
        width:140,
        height:50,
        backgroundColor:'#183D3D',
        position:'absolute',
        bottom:10,
        alignSelf:'center',
        zIndex:1,
        borderRadius:20,
    }
});
export default App;