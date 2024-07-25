import React from 'react';
import {StyleSheet, View, Modal, Pressable} from 'react-native';

const CustomAlert = ({content, show,setShow}) =>{
    const showHideModal= ()=>{
        setShow(!show);
    }
    return(
        <View style={style.view}>
            <Modal visible={show}  animationType="fade" transparent={true} onRequestClose={showHideModal}>
                <Pressable style={style.backdrop}></Pressable>
                <View style={style.modal}>
                    {content}
                </View>
            </Modal>
        </View>
    );
}
const style = StyleSheet.create({
    modal:{
        justifyContent:'center',
        alignItems:'center',
        flex:1,
    },
    backdrop:{
        position: 'absolute',
        top: 0,
        left:0,
        right:0,
        bottom:0,
        opacity:0.5,
        backgroundColor:'black',
    },
});
export default CustomAlert;