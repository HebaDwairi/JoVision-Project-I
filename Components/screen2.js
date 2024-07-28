import React from 'react';
import { View,Text,StyleSheet,RefreshControl,Image,FlatList,ScrollView} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
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
            renderItem={({item})=><Item src={item.src}/>}
            numColumns={1}>
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