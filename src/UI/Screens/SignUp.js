import React, { Component } from "react";
import {
  StyleSheet,
  Platform,
  Button,
  Text,
  ActivityIndicator,
  View,
  ScrollView,
  TouchableWithoutFeedback,
  TouchableOpacity
} from "react-native";
import commonStyle from "../../styleSheets/commonStyle";
import InputComponent from "../reusableComponent/TextInput";
import { signupSchema } from "../../validation";
import { Formik } from "formik";
import { items } from "../../service";
import { Toast } from "native-base";

export default class Signup extends Component {
  toLogin = () => {
    this.props.navigation.navigate("Login");
  };
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
              email: "",
              password: "",
              first_name: "",
              last_name: "",
              role: "Author"
            }}
            onSubmit={(values, actions) => {
              items(
                "POST",
                values,
                "http://183.182.84.84/restapi/wp-json/wp/v2/users/register"
              ).then(response => {
                console.log(response);
                if (response.code === 200) {
                  actions.resetForm();
                  Toast.show({
                    text: "User Registered Successfully",
                    buttonText: "Okay",
                    type: "success"
                  });
                  this.props.navigation.navigate("Login");
                  actions.setSubmitting(false);
                } else if (
                  response.code === 422 &&
                  response.message === "Username already exists."
                ) {
                  actions.setSubmitting(false);
                  Toast.show({
                    text: "Username already exists",
                    buttonText: "Okay",
                    type: "danger"
                  });
                  actions.setSubmitting(false);
                } else if (
                  response.code === 422 &&
                  response.message === "Email already exists."
                ) {
                  actions.setSubmitting(false);
                  Toast.show({
                    text: "Email already exists",
                    buttonText: "Okay",
                    type: "danger"
                  });
                  actions.setSubmitting(false);
                } else {
                  actions.setSubmitting(false);
                }
              });
            }}
            validationSchema={signupSchema}
          >
            {formikProps => (
              <View style={commonStyle.container}>
                <Text style={[commonStyle.LoginText, commonStyle.marginBottom]}>
                  Signup
                </Text>
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
                    value={formikProps.values.email}
                    placeholder="Email"
                    onChangeText={formikProps.handleChange("email")}
                  />
                  {formikProps.touched.email && formikProps.errors.email && (
                    <Text style={commonStyle.validationText}>
                      {formikProps.errors.email}
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
                <View style={commonStyle.inputBox}>
                  <InputComponent
                    value={formikProps.values.first_name}
                    placeholder="First Name"
                    onChangeText={formikProps.handleChange("first_name")}
                  />
                  {formikProps.touched.first_name &&
                    formikProps.errors.first_name && (
                      <Text style={commonStyle.validationText}>
                        {formikProps.errors.first_name}
                      </Text>
                    )}
                </View>
                <View style={commonStyle.inputBox}>
                  <InputComponent
                    value={formikProps.values.last_name}
                    placeholder="Last Name"
                    onChangeText={formikProps.handleChange("last_name")}
                  />
                  {formikProps.touched.last_name &&
                    formikProps.errors.last_name && (
                      <Text style={commonStyle.validationText}>
                        {formikProps.errors.last_name}
                      </Text>
                    )}
                </View>
                <View style={commonStyle.inputBox}>
                  <InputComponent
                    defaultValue={formikProps.values.role}
                    placeholder="Role"
                    editable={false}
                  />
                </View>
                <TouchableOpacity
                  onPress={formikProps.handleSubmit}
                  style={commonStyle.button}
                >
                  <View>
                    {formikProps.isSubmitting ? (
                      <ActivityIndicator size="large" />
                    ) : (
                      <Text style={commonStyle.text}>SUBMIT</Text>
                    )}
                  </View>
                </TouchableOpacity>
                <TouchableWithoutFeedback onPress={this.toLogin}>
                  <Text style={commonStyle.toSignup}>Back to Login </Text>
                </TouchableWithoutFeedback>
              </View>
            )}
          </Formik>
        </ScrollView>
      </View>
    );
  }
}
