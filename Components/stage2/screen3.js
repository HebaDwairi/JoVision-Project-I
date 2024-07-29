import React, {useState} from 'react';
import { View,Text,StyleSheet,RefreshControl,Image,FlatList,TouchableOpacity} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import CustomAlert from '../CustomAlert';



const App = ()=>{
    const [show,setShow] = useState(false);
    const AlertContent = ()=>{
        return(
            <View style={style.alert}>
                <TouchableOpacity onPress={()=>{setShow(!show)}}>
                    <Text style={style.text}>Rename</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{setShow(!show)}}>
                    <Text style={style.text}>Delete</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{setShow(!show)}}>
                    <Text style={style.text}>Fullscreen</Text>
                </TouchableOpacity>
            </View>
        );
    }
    const Item = ({src})=>{
      
        return(
            <View>
                <TouchableOpacity onPress={()=>{setShow(!show)}}>
                    <Image style={style.img} source={{ uri: 'file://'+src}}/>
                </TouchableOpacity>
            </View>
        );
    }
    const media = useSelector((state)=> state.media);
    return(
        <View>
            <FlatList
            data={media}
            renderItem={({item})=><Item src={item.src}/>}
            numColumns={1}>
            </FlatList>
            <CustomAlert show={show} setShow={setShow} content={<AlertContent/>}/>
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
    },
    alert:{
        backgroundColor:'#355c5c',
        padding:10,
        borderRadius:15,
    },
    text:{
        fontSize:20,
        padding:10,
        borderRadius:15,
        backgroundColor:'#183D3D',
        margin:10,
    }
});
export default App;