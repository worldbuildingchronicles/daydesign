//
//  DynamicScreen.js
//  magic version 1
//
//  Created by dhvani&dhrumil.
//  Copyright © 2019 magic. All rights reserved.
//

import React from "react"
import { FlatList, View, Text, StyleSheet, TouchableOpacity, Image, TextInput, Modal, Alert, ScrollView, AppState, StatusBar, BackHandler, Platform, ActivityIndicator, WebView, Linking, NetInfo } from "react-native"
import DeviceInfo from 'react-native-device-info';
import RNExitApp from 'react-native-exit-app';
import PushNotification from 'react-native-push-notification'
import firebase from 'react-native-firebase'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import TimeCellTwo from "./TimeCellTwo"
import { createStackNavigator, createAppContainer } from 'react-navigation';


export default class DynamicScreen extends React.Component {


    static navigationOptions = ({ navigation }) => {

        const { params = {} } = navigation.state
        return {
        header: null,
        headerLeft: null,
        headerRight: null,
        currentUser: null,
        }
    }

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const { currentUser } = firebase.auth()
        this.setState({ currentUser })
    }

    viewFlatListMockData = [{
                            key: "1",
                            }, {
                            key: "2",
                            }, {
                            key: "3",
                            }, {
                            key: "4",
                            }, {
                            key: "5",
                            }, {
                            key: "6",
                            }, {
                            key: "7",
                            }, {
                            key: "8",
                            }, {
                            key: "9",
                            }, {
                            key: "10",
                            }]

    renderViewFlatListCell = ({ item }) => {

        return <TimeCellTwo navigation={this.props.navigation}/>
    }

    render() {

        return <View
        style={styles.restauranthomeView}>
        <View
        style={styles.viewFlatListViewWrapper}>
        <FlatList
        horizontal={false}
        renderItem={this.renderViewFlatListCell}
        data={this.viewFlatListMockData}
        style={styles.viewFlatList}/>
        </View>
        </View>
    }
}

const styles = StyleSheet.create({
                                 restauranthomeView: {
                                 backgroundColor: 'rgb(255, 255, 255)',
                                 flex: 1,
                                 },
                                 viewFlatList: {
                                 backgroundColor: 'rgba(0, 0, 0, 0.0)',
                                 width: "100%",
                                 height: "100%",
                                 },
                                 viewFlatListViewWrapper: {
                                 marginTop: 25,
                                 marginBottom: 6,
                                 flex: 1,
                                 },
                                 })
