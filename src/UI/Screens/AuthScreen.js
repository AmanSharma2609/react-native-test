import React from 'react'
import { StyleSheet, View, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export default function DummyScreen(props){

    React.useEffect(() => {
        loadApp()
    },[])
    loadApp = async () => {
        const userToken = await AsyncStorage.getItem('@accessToken')
        props.navigation.navigate(userToken ? 'App' : 'Auth')

    }
    return(
        <View style={styles.container}/>
    )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        opacity: 0.5,
        backgroundColor:'#143958'
    },
})