import React, {useState} from 'react';
import { View,Text,StyleSheet,TextInput,Image,FlatList,TouchableOpacity,Alert} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import CustomAlert from '../CustomAlert';
import RNFS from 'react-native-fs';
import { addMedia, removeMedia,renameMedia } from '../../redux/actions';

const App = ()=>{
    const media = useSelector((state)=> state.media);
    const [show, setShow] = useState(false);
    const [showRename, setShowRename] = useState(false);
    const [source, setSource] = useState({});
    const [index,setIndex] =useState(0);
    const dispatch = useDispatch();

    const renameFile =  (name)=>{
        const ext = source.type === 'image' ? '.jpg' : '.mp4'; 
        const newPath = RNFS.DocumentDirectoryPath +'/'+ name + ext; 
        RNFS.exists(newPath).then((exist)=>{
            if(exist){
                Alert.alert('a file with this name already exists');
            }
            else{
               RNFS.moveFile(source.src, newPath).then(console.log('renamed')).catch((err)=>{console.log(err)});
               console.log(newPath);
               dispatch(renameMedia(index,newPath));       
            }
            setShow(false);
            setShowRename(false);
        })
    }
    const RenameDialog = ()=>{
        const [name,setName] = useState('');
        return(
            <View style={style.alert}>
                <Text style={style.text}>Current name: {source.src.substring(32)}</Text>
                <TextInput  style= {style.input} onChangeText={setName} placeholder='new name'/>
                <TouchableOpacity onPress={()=>{renameFile(name)}}>
                    <Text style={style.text} >confirm</Text>
                </TouchableOpacity>
            </View>
        );
    }

    const deleteFile = () => {
        
    }
    const displayFile = () => {
        
    }

    const AlertContent = ()=>{
        return(
            <View style={style.alert}>
                <TouchableOpacity onPress={()=>{setShowRename(true)}}>
                    <Text style={style.text}>Rename</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={deleteFile}>
                    <Text style={style.text}>Delete</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={displayFile}>
                    <Text style={style.text}>Fullscreen</Text>
                </TouchableOpacity>
            </View>
        );
    }
    const Item = ({src,index})=>{
        return(
            <View>
                <TouchableOpacity onPress={()=>{setShow(!show); setSource(src); setIndex(index)}}>
                    <Image style={style.img} source={{ uri: 'file://'+src.src}}/>
                </TouchableOpacity>
            </View>
        );
    }
    return(
        <View>
            <FlatList
            data={media}
            renderItem={({item,index})=><Item src={item} index={index}/>}
            numColumns={1}>
            </FlatList>
            <CustomAlert show={show} setShow={setShow} content={showRename? <RenameDialog/> : <AlertContent/>}/>
         
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
        padding:30,
        borderRadius:15,
    },
    text:{
        fontSize:20,
        padding:10,
        borderRadius:15,
        backgroundColor:'#183D3D',
        width:200,
        margin:10,
    },
    input:{
        backgroundColor:'white',
        borderRadius:14,
        color:'black',
        alignSelf:'center',
        width:200,
        fontSize:20,
    }
});
export default App;