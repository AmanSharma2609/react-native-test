import React, { StyleSheet } from 'react-native'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";

export default StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        width: wp('100%'),
        backgroundColor: '#143958',
      },
      scrollContainer:{
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        width: wp('100%')
      },
      inputBox: {
        position: "relative",
        width: "80%",
        justifyContent: "center",
        alignItems: "center"
      },
      validationText: {
        fontSize: hp("2.5%"),
        color: "red",
        position: "absolute",
        bottom: '3%',
        left: "1%",
        textAlign: "left"
      },
      button:{
        width: '80%',
        backgroundColor:'#F6991A',
        textAlign:'center',
        height: hp('7%'),
        justifyContent: "center",
        alignItems: "center"
      },
      text:{
        fontSize: hp('3.5%'),
        color: 'white',
      },
      marginBottom:{
        marginBottom: '3%'
      },
      marginBottom:{
        marginBottom:'2%'
      },
      LoginText:{
        fontSize: hp('4.5%'),
      
        color:'white',
        fontWeight: "800",
      },
      toSignup:{
        marginTop:'3%',
        fontSize:hp('2%'),
        color:'white'
      }
})