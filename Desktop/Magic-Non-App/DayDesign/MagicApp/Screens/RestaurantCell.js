//
//  RestaurantCell.js
//  dynamic
//
//  Created by dhvani&dhrumil.
//  Copyright © 2018 magic. All rights reserved.
//

import { Text, View, StyleSheet, TouchableOpacity } from "react-native"
import React from "react"
import MenuFour from "./MenuFour"



export default class RestaurantCell extends React.Component {
    
    constructor(props) {
        super(props)
    }
    
    componentDidMount() {
        
    }
    
    render() {
        
        return <View
        style={styles.restaurantcell}>
    

        <TouchableOpacity
        onPress={() => {this.props.navigation.navigate("MenuFour")}}>
        
        <View
        style={styles.graybackgroundView}>
        <View
        style={styles.currentdealView}>
        <Text
        style={styles.activeText}>active</Text>
        <View
        style={{
        width: "100%",
        height: "100%",
        alignItems: "stretch",
        position: "absolute",
        }}>
        <Text
        style={styles.currentmoneyText}>$1</Text>
        </View>
        </View>
        <View
        style={{
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-end",
        }}>
        <View
        style={styles.nextdealView}>
        <Text
        style={styles.buyersneededText}>8/10</Text>
        <View
        style={{
        width: "100%",
        height: "100%",
        alignItems: "stretch",
        position: "absolute",
        }}>
        <Text
        style={styles.nextmoneyText}>$2</Text>
        </View>
        </View>
        </View>
        </View>
        <View
        style={styles.nameofstoreView}>
        <Text
        style={styles.storenameText}>Shawerma Plus</Text>
        <View
        style={{
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "stretch",
        }}>
        <Text
        style={styles.storetypeText}>Middle Eastern</Text>
        </View>
        </View>
        
        </TouchableOpacity>

        </View>
    }
}

const styles = StyleSheet.create({
                                 restaurantcell: {
                                 backgroundColor: 'rgba(0, 0, 0, 0.0)',
                                 width: 100,
                                 height: 106,
                                 marginRight: 10,
                                 alignItems: "stretch",
                                 },
                                 graybackgroundView: {
                                 backgroundColor: 'rgb(74, 78, 82)',
                                 borderRadius: 4,
                                 height: 50,
                                 flexDirection: "row",
                                 },
                                 currentdealView: {
                                 backgroundColor: 'rgba(0, 0, 0, 0.0)',
                                 alignSelf: "center",
                                 width: 50,
                                 height: 37,
                                 flex: 1,
                                 justifyContent: "flex-end",
                                 },
                                 activeText: {
                                 color: 'rgb(114, 167, 228)',
                                 fontSize: 8,
                                 fontStyle: "normal",
                                 fontWeight: "normal",
                                 textAlign: "center",
                                 letterSpacing: -0,
                                 backgroundColor: 'rgba(0, 0, 0, 0.0)',
                                 width: 50,
                                 },
                                 currentmoneyText: {
                                 color: 'rgb(114, 167, 228)',
                                 fontSize: 21,
                                 fontStyle: "normal",
                                 fontWeight: "bold",
                                 textAlign: "center",
                                 letterSpacing: -0,
                                 backgroundColor: 'rgba(0, 0, 0, 0.0)',
                                 marginLeft: 11,
                                 marginRight: 11,
                                 },
                                 nextdealView: {
                                 backgroundColor: 'rgba(0, 0, 0, 0.0)',
                                 alignSelf: "center",
                                 width: 50,
                                 height: 37,
                                 flex: 1,
                                 justifyContent: "flex-end",
                                 },
                                 buyersneededText: {
                                 color: 'rgb(146, 146, 146)',
                                 fontSize: 8,
                                 fontStyle: "normal",
                                 fontWeight: "normal",
                                 textAlign: "center",
                                 letterSpacing: -0,
                                 backgroundColor: 'rgba(0, 0, 0, 0.0)',
                                 width: 50,
                                 },
                                 nextmoneyText: {
                                 color: 'rgb(155, 155, 155)',
                                 fontSize: 21,
                                 fontStyle: "normal",
                                 fontWeight: "bold",
                                 textAlign: "center",
                                 letterSpacing: -0,
                                 backgroundColor: 'rgba(0, 0, 0, 0.0)',
                                 marginLeft: 11,
                                 marginRight: 11,
                                 },
                                 nameofstoreView: {
                                 backgroundColor: 'rgba(0, 0, 0, 0.0)',
                                 height: 56,
                                 },
                                 storenameText: {
                                 color: 'rgb(3, 3, 3)',
                                 fontSize: 15,
                                 fontStyle: "normal",
                                 fontWeight: "bold",
                                 textAlign: "left",
                                 letterSpacing: -0.24,
                                 backgroundColor: 'rgba(0, 0, 0, 0.0)',
                                 width: 100,
                                 },
                                 storetypeText: {
                                 color: 'rgb(146, 146, 146)',
                                 fontSize: 12,
                                 fontStyle: "normal",
                                 fontWeight: "bold",
                                 textAlign: "left",
                                 letterSpacing: -0,
                                 backgroundColor: 'rgba(0, 0, 0, 0.0)',
                                 marginRight: 11,
                                 },
                                 })


