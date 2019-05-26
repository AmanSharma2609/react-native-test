import React from 'react'
import {TextInput, StyleSheet, View} from 'react-native'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
  } from "react-native-responsive-screen";

export default function InputComponent(props){
    return(
            <TextInput 
            {...props}
            style={styles.inputComponet}
        />
    )
}
const styles = StyleSheet.create({
    inputComponet:{
        fontSize: hp('3%'),
        width: '100%',
        marginBottom: "7%",
        borderColor: 'gray',
        borderWidth: 1,
        paddingLeft: '4%',
        backgroundColor: 'white'
    }
})