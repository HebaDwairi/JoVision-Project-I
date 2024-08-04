import React, { useEffect, useRef, useState,useCallback } from 'react';
import { View,Text,StyleSheet,Image,FlatList,TouchableOpacity, Pressable} from 'react-native';
import { useSelector} from 'react-redux';
import Video from 'react-native-video';
import { useFocusEffect } from '@react-navigation/native';

const move = (dir,list)=>{
    if(dir == 'l'){ 
        if(list.currentIndex > 0 ){
            list.ref.current.scrollToIndex({animated:true, index: list.currentIndex-1});
            list.setCurrentIndex(list.currentIndex-1);
        }
       console.log(list.currentIndex)
    }
    else if(dir == 'r'){
        console.log(list.currentIndex)
        if(list.currentIndex < list.length -1){
            list.setCurrentIndex(list.currentIndex+1);
            list.ref.current.scrollToIndex({animated:true, index: list.currentIndex+1}); 
        }
    }
}

const VideoItem = ({item, list}) =>{
    return(
        <View>
            <Video
            source={{ uri: 'file://'+item.src}}
            controls={false}
            style={style.img}
            />
            <View style={style.imageControls}>
                <TouchableOpacity style={style.btn} onPress={()=>{move('l',list)}}><Text style={style.text}>{'<<'}</Text></TouchableOpacity>
                <TouchableOpacity style={style.btn}><Text style={style.text}>-5</Text></TouchableOpacity>
                <TouchableOpacity style={style.btn}><Text style={style.text}>play</Text></TouchableOpacity>
                <TouchableOpacity style={style.btn}><Text style={style.text}>+5</Text></TouchableOpacity>
                <TouchableOpacity style={style.btn} onPress={()=>{move('r',list)}}><Text style={style.text}>{'>>'}</Text></TouchableOpacity>
            </View>
        </View>
        
        
    );
}

const ImageItem = ({item, list}) =>{
    return(
        <View > 
            <Image style={style.img} source={{ uri: 'file://'+item.src}}/>
            <View style={style.imageControls}>
                <TouchableOpacity style={style.btn} onPress={()=>{move('l',list)}}><Text style={style.text}>{'<<'}</Text></TouchableOpacity>
                <TouchableOpacity style={style.btn} onPress={()=>{move('r',list)}}><Text style={style.text}>{'>>'}</Text></TouchableOpacity>
            </View> 
        </View>
        
    );
}
const Item = ({item,list})=>{
    return(
        <View>
            {item.type == 'image' ? <ImageItem item={item} list={list}/>: <VideoItem item={item} list={list}/> }  
        </View>
    );
}

const App = ({route, navigation})=>{
    const [currentIndex, setCurrentIndex] = useState(route.params.index);
    const media = useSelector((state)=> state.media);
    const flatListRef = useRef(null);
    const scroll = () => {
        flatListRef.current.scrollToIndex({animated:false, index: route.params.index}); 
    }
    useFocusEffect(
       useCallback(() => {
        scroll();
       }, [])
    );
    const listData = {
        ref :flatListRef,
        currentIndex: currentIndex,
        setCurrentIndex: setCurrentIndex,
        length: media.length,
    }
    return(
        <View style={style.container}>
            <FlatList
            data={media}
            renderItem={({item})=><Item item={item} list={listData} />}
            horizontal={true}
            ref={flatListRef}
            scrollEnabled={false}
            getItemLayout ={(data, index) => ({
                length: 700,
                offset: 394.4 * index,
                index
              })} >
            </FlatList> 
        </View>
    );
}
const style = StyleSheet.create({
    img:{
        width:392,
        height:720,
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
    imageControls:{
        flexDirection:'row',
        alignSelf:'center',
        backgroundColor:'#183D3D',
    },
    btn:{
        backgroundColor:'#355c5c',
        marginHorizontal:10,
        padding:10,
        borderRadius:20,
        bottom:5,
    }
});
export default App;