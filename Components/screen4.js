import React, { useEffect, useRef, useState } from 'react';
import { View,Text,StyleSheet,Image,FlatList,TouchableOpacity} from 'react-native';
import { useSelector} from 'react-redux';
const Item = ({src})=>{
    return(
        <View>
            <Image style={style.img} source={{ uri: 'file://'+src}}/>
        </View>
    );
}

let index = 0;
const App = ()=>{
    const [isPaused,setIsPaused] = useState(false);
    const images = useSelector((state)=> state.images);
    const flatListRef = useRef(null);
    const maxNum = images.length;
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
            <Scroll/>
            <FlatList
            data={images}
            renderItem={({item})=><Item src={item.src}/>}
            horizontal={true}
            ref={flatListRef}
            scrollEnabled={false}>
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