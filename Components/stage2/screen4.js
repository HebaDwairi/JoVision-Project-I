import React, { useEffect, useRef, useState } from 'react';
import { View,Text,StyleSheet,Image,FlatList,TouchableOpacity} from 'react-native';
import { useSelector} from 'react-redux';
import Video from 'react-native-video';
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

let index = 0;
const App = ()=>{
    const [isPaused,setIsPaused] = useState(false);
    const media = useSelector((state)=> state.media);
    const flatListRef = useRef(null);
    const maxNum = media.length;
    const Scroll = () => {
        let interval;
        if(!isPaused){
            interval =  setInterval(() => {
                flatListRef.current.scrollToIndex({animated:true, index:index});
                index++;
                if(index == maxNum){
                    index=0;
                }        
            }, 1500);
        }
        
        return(
            <View style={style.btnContainer}>
                <TouchableOpacity onPress={()=>{setIsPaused(!isPaused); clearInterval(interval)}}>
                <Text style={style.text}>{isPaused?'Resume':'Pause'}</Text>
            </TouchableOpacity>
            </View>
        );
    }
    return(
        <View style={style.container}>
            
            <FlatList
            data={media}
            renderItem={({item})=><Item item={item}/>}
            horizontal={true}
            ref={flatListRef}
            scrollEnabled={true}>
            </FlatList> 
        </View>
    );
}
const style = StyleSheet.create({
    img:{
        width:373,
        height:700,
        alignSelf:'center',
        margin:10,
        borderRadius:10,
    },
    container:{
        backgroundColor:'#183D3D',
    },
    text:{
        fontSize:25,
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