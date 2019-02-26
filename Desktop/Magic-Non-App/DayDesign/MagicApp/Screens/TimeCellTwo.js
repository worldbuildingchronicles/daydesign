//
//  TimeCellTwo.js
//  dynamic
//
//  Created by dhvani&dhrumil.
//  Copyright © 2018 magic. All rights reserved.
//

import { Text, Image, FlatList, View, StyleSheet, TouchableOpacity } from "react-native"
import React from "react"
import RestaurantCell from './RestaurantCell'
//var VendorList = require("./VendorList");
import VendorList from './VendorList'





export default class TimeCellTwo extends React.Component {

    state = {
    modalCreateVisible: false,
    }

    constructor(props) {
        super(props)
    }

    componentDidMount() {

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

        return <RestaurantCell/>
    }

    
  openVendorList(){
      this.props.navigation.navigate('VendorListScreen');
  }

    render() {

        return <View
        style={styles.timecell}>
        <View
        style={{
        flexDirection: "row",
        }}>
        <Text
        style={styles.timeText}>10:00 AM</Text>
        <View
        style={{
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-end",
        }}>
        <TouchableOpacity
        onPress={() => {this.openVendorList()}}
        style={styles.seeallButton}>
        <Text
        style={styles.seeallButtonText}>See All</Text>
        <Image
        source={require("./../assets/images/seeallsymbol.png")}
        style={styles.seeallButtonImage}/>
        </TouchableOpacity>
        </View>
        </View>
        <View
        style={styles.viewFlatListViewWrapper}>
        <FlatList
        horizontal={true}
        renderItem={this.renderViewFlatListCell}
        data={this.viewFlatListMockData}
        style={styles.viewFlatList}/>
        </View>
        </View>
    }
}

const styles = StyleSheet.create({
                                 timecell: {
                                 backgroundColor: 'rgba(0, 0, 0, 0.0)',
                                 height: 152,
                                 borderBottomColor: 'gray',
                                 borderBottomWidth: 1,
                                 marginLeft: 10,
                                 marginRight: 10
                                 },
                                 timeText: {
                                 color: 'rgb(3, 3, 3)',
                                 fontSize: 20,
                                 fontStyle: "normal",
                                 fontWeight: "bold",
                                 textAlign: "left",
                                 letterSpacing: 0.38,
                                 backgroundColor: 'rgba(0, 0, 0, 0.0)',
                                 marginLeft: 17,
                                 marginTop: 7,
                                 },
                                 seeallButton: {
                                 backgroundColor: "transparent",
                                 flexDirection: "row",
                                 alignItems: "center",
                                 justifyContent: "center",
                                 padding: 0,
                               //  marginRight: 16,
                                 marginTop: 9,
                                 width: 68,
                                 height: 23,
                                 },
                                 seeallButtonText: {
                                 color: "rgb(191, 191, 191)",
                                 fontSize: 17,
                                 fontStyle: "normal",
                                 fontWeight: "normal",
                                 textAlign: "left",
                                 },
                                 seeallButtonImage: {
                                 resizeMode: "contain",
                                 marginLeft: 3,
                                 },
                                 viewFlatList: {
                                 backgroundColor: 'rgba(0, 0, 0, 0.0)',
                                 width: "100%",
                                 height: "100%",
                                 },
                                 viewFlatListViewWrapper: {
                                 marginLeft: 10,
                                 marginRight: 10,
                                 marginTop: 6,
                                 alignSelf: "stretch",
                                 height: 106,
                                 },
                                 })
