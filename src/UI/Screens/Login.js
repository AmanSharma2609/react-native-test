import React, { Component } from "react";
import {
  StyleSheet,
  Platform,
  Button,
  Text,
  ActivityIndicator,
  View,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback
} from "react-native";
import commonStyle from "../../styleSheets/commonStyle";
import InputComponent from "../reusableComponent/TextInput";
import {validationSchema} from '../../validation'
import {items} from '../../service'
import { Formik } from "formik";
import AsyncStorage from '@react-native-community/async-storage';
import { Toast } from "native-base";

export default class Login extends Component {
  render() {
    return (
      <View style={commonStyle.container}>
        <ScrollView
          scrollEnabled={true}
          contentContainerStyle={commonStyle.scrollContainer}
        >
          <Formik
            initialValues={{
              username: "",
              password: ""
            }}
            onSubmit={(values, actions) => {
              items('POST', values, 'http://183.182.84.84/restapi/wp-json/jwt-auth/v1/token' )
              .then(response => {
                console.log(response)
                if(response.token !== undefined) {
                  AsyncStorage.setItem('@accessToken', `${response.token}`);
                  actions.resetForm()
                  this.props.navigation.navigate('App')
                  actions.setSubmitting(false);
                }
                else if(response.code === "[jwt_auth] invalid_username") {
                  Toast.show({
                    text: "Invalid Username",
                    buttonText: "Okay",
                    type: "danger"
                  })
                  actions.setSubmitting(false);
                }
                else if(response.code === "[jwt_auth] incorrect_password") {
                  Toast.show({
                    text: "Invalid Password",
                    buttonText: "Okay",
                    type: "danger"
                  })
                  actions.setSubmitting(false);
                }
                else{
                  
                }
              })
               
            }}
            validationSchema={validationSchema}
          >
            {formikProps => (
              <View style={commonStyle.container}>
                <Text style={[commonStyle.LoginText, commonStyle.marginBottom]}>LOGIN</Text>
                <View style={commonStyle.inputBox}>
                  <InputComponent
                    value={formikProps.values.username}
                    placeholder="Username"
                    onChangeText={formikProps.handleChange("username")}
                  />
                  {formikProps.touched.username &&
                    formikProps.errors.username && (
                      <Text style={commonStyle.validationText}>
                        {formikProps.errors.username}
                      </Text>
                    )}
                </View>
                <View style={commonStyle.inputBox}>
                  <InputComponent
                    value={formikProps.values.password}
                    placeholder="Password"
                    secureTextEntry={true}
                    onChangeText={formikProps.handleChange("password")}
                  />
                  {formikProps.touched.password &&
                    formikProps.errors.password && (
                      <Text style={commonStyle.validationText}>
                        {formikProps.errors.password}
                      </Text>
                    )}
                </View>
                <TouchableOpacity
                    onPress={formikProps.handleSubmit}
                    style={commonStyle.button}
                  >
                    <View>
                    {formikProps.isSubmitting ? (
                  <ActivityIndicator size='large'/>
                ) : (
                  <Text style={commonStyle.text}>SUBMIT</Text>
                )}
                      
                    </View>
                  </TouchableOpacity>
              
                <TouchableWithoutFeedback onPress={()=>this.props.navigation.navigate('Signup')}><Text style={commonStyle.toSignup}>Don't have an account? Signup </Text></TouchableWithoutFeedback>
              </View>
            )}
          </Formik>
        </ScrollView>
      </View>
    );
  }
}
