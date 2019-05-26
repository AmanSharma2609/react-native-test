import React, { Component } from "react";
import {
  StyleSheet,
  Platform,
  Button,
  Text,
  ActivityIndicator,
  View,
  ScrollView,
  FlatList,
  WebView
} from "react-native";
import commonStyle from "../../styleSheets/commonStyle";
import { Getitems } from "../../getService";
import * as actionTypes from '../../actions/action'
import AsyncStorage from "@react-native-community/async-storage";
import { connect } from "react-redux";
import HTMLView from "react-native-htmlview";
import postListStyles from '../../styleSheets/postListStyles'

class Post extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      headerStyle: {
        backgroundColor: "#143958",
        shadowOpacity: 0,
        elevation: 0,
        shadowOffset: {
          height: 0
        },
        shadowRadius: 0
      },
      headerLeft: (
        <View style={{ marginLeft: 10 }}>
          <Button title="logout" onPress={params.toLogin} />
        </View>
      )
    };
  };
  toLogin = () => {
    AsyncStorage.removeItem("@accessToken");
    this.props.navigation.navigate("Auth");
  };
  _keyExtractor = item => item.id.toString();
  async componentDidMount() {
    this.props.navigation.setParams({ toLogin: this.toLogin });
    const token = await AsyncStorage.getItem("@accessToken");
    Getitems("GET", "http://183.182.84.84/restapi/wp-json/wp/v2/posts").then(
      response => {
        this.props.AddData(response);
        console.log(this.props.postList);
      }
    );
  }

  render() {
    return (
      <View style={commonStyle.container}>
        <FlatList
          data={this.props.postList}
          keyExtractor={this._keyExtractor}
          renderItem={({ item }) => (
            <View style={postListStyles.textCont}>
              <View style={commonStyle.marginBottom}>
                <Text>TITLE - {item.title.rendered}</Text>
              </View>
              <View style={commonStyle.marginBottom}>
                <Text>STATUS -{item.status}</Text>
                </View>
              <View style={commonStyle.marginBottom}>
              <HTMLView value={item.content.rendered} style={{marginBottom:0}}/>
              </View>
              <View />
            </View>
          )}
        />
      </View>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    AddData: response => dispatch({ type: actionTypes.ADD_DATA, payload: response })
  };
};
const mapStateToProps = (state) => {
  return {
    postList: state.rootReducer.postList
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Post);
