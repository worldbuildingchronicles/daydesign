//
//  ListRest1TwoTwo
//  dynamic
//
//  Created by dhvani&dhrumil.
//  Copyright © 2018 magic. All rights reserved.
//

import { Text, StyleSheet, View } from "react-native"
import React from "react"
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from "react-native-responsive-screen";


export default class ListRest1TwoTwo extends React.Component {
    
    constructor(props) {
        super(props)
    }
    
    componentDidMount() {
        
    }
    
    render() {
        
        return <View
        style={styles.listRest1}>
        <View
        style={styles.group3View}>
        <View
        style={{
        flexDirection: "row",
        }}>
        <Text
        style={styles.jawadSStyleChickText}>Jawad's Style: Chicken Shawarma Wrap rwrwerwertyuiytuuuyu</Text>
        <Text
        style={styles.textText}>$11.00</Text>
        </View>
        <View
        style={{
        flex: 1,
        justifyContent: "flex-end",
        }}>
        <View
        style={{
        flexDirection: "row",
        alignItems: "flex-end",
        }}>
        <Text
        style={styles.servingsText}>3 Servings</Text>
        <View
        style={styles.groupView}>
        <Text
        style={styles.textTwoText}>+23</Text>
        </View>
        </View>
        </View>
        </View>
        </View>
    }
}

const styles = StyleSheet.create({
                                 listRest1: {
                                 backgroundColor: "white",
                                 height: 66,
                                 marginBottom: 4,
                                 
                                 },
                                 group3View: {
                                 backgroundColor: "transparent",
                                 width: wp('100%'),
                                 height: 66,
                                 },
                                 jawadSStyleChickText: {
                                 color: "rgb(55, 58, 61)",
                                 fontSize: 16,
                                 fontStyle: "normal",
                                 fontWeight: "normal",
                                 textAlign: "left",
                                 backgroundColor: "transparent",
                                 width: wp('80%'),
                                 marginTop: 5,
                                 marginLeft: 5,
                                 },
                                 textText: {
                                 color: "rgb(55, 58, 61)",
                                 fontSize: 16,
                                 fontStyle: "normal",
                                 fontWeight: "normal",
                                 backgroundColor: "transparent",
                                 marginRight: 5,
                                 marginTop: 5,
                                 textAlign: "right",
                                 flex: 1,
                                 width: wp('20%'),
                                 },
                                 servingsText: {
                                 color: "rgb(55, 58, 61)",
                                 fontSize: 12,
                                 fontStyle: "normal",
                                 fontWeight: "normal",
                                 textAlign: "right",
                                 backgroundColor: "transparent",
                                 marginBottom: 5,
                                 marginLeft: 5,
                                 
                                 },
                                 groupView: {
                                 backgroundColor: "transparent",
                                 borderRadius: 11,
                                 borderWidth: 1,
                                 borderColor: "rgb(226, 175, 47)",
                                 borderStyle: "solid",
                                 marginLeft: 15,
                                 marginBottom: 1,
                                 width: 39,
                                 height: 22,
                                 justifyContent: "center",
                                 },
                                 textTwoText: {
                                 color: "rgb(226, 175, 47)",
                                 fontSize: 10,
                                 fontStyle: "normal",
                                 fontWeight: "normal",
                                 textAlign: "center",
                                 backgroundColor: "transparent",
                                 width: 39,
                                 },
                                 })
