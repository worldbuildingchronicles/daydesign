//
//  ViewTwo.js
//  dynamicHOMEEXPANDED
//
//  Created by dhvani&dhrumil.
//  Copyright © 2018 magic. All rights reserved.
//

import { Text, Image, View, StyleSheet, TouchableOpacity } from "react-native"
import React from "react"
import MenuFour from "./MenuFour"


export default class ViewTwo extends React.Component {
    
    constructor(props) {
        super(props)
    }
    
    componentDidMount() {
        
    }
    
    render() {
        
        return <View
        style={styles.view}>
        

        <TouchableOpacity
        onPress={() => {this.props.navigation.navigate("MenuFour")}}>
        
        <View
        style={styles.smallRest1View}>
        <Image
        source={require("./../assets/images/group-3.png")}
        style={styles.group3Image}/>
        <View
        style={{
        width: "100%",
        height: "100%",
        alignItems: "flex-end",
        position: "absolute",
        }}>
        <Text
        style={styles.shawarmaPlusText}>Shawarma Plus </Text>
        <View
        style={styles.group8View}>
        <View
        style={styles.group7View}>
        <Text
        style={styles.textFourText}>$4</Text>
        <View
        style={{
        width: "100%",
        height: "100%",
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "stretch",
        position: "absolute",
        }}>
        <Text
        style={styles.textFiveText}>10/16</Text>
        </View>
        </View>
        <View
        style={{
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        }}>
        <View
        style={styles.group6View}>
        <Text
        style={styles.textText}>$2</Text>
        <View
        style={{
        width: "100%",
        height: "100%",
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "stretch",
        position: "absolute",
        }}>
        <Text
        style={styles.textTwoText}>15/16</Text>
        </View>
        </View>
        </View>
        <View
        style={{
        width: "100%",
        height: "100%",
        flexDirection: "row",
        position: "absolute",
        }}>
        <View
        style={styles.group5View}>
        <Text
        style={styles.textSixText}>12/16</Text>
        <View
        style={{
        width: "100%",
        height: "100%",
       alignItems: "flex-end",
        position: "absolute",
        }}>
        <Text
        style={styles.textSevenText}>$3</Text>
        </View>
        </View>
        <View
        style={{
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-end",
        }}>
        <View
        style={styles.group4View}>
        <Text
        style={styles.activeText}>active</Text>
        <View
        style={{
        width: "100%",
        height: "100%",
        alignItems: "flex-end",
        position: "absolute",
        }}>
        <Text
        style={styles.textThreeText}>10%</Text>
        </View>
        </View>
        </View>
        </View>
        </View>
        </View>
        </View>
        
        
        </TouchableOpacity>

        </View>
    }
}

const styles = StyleSheet.create({
                                 view: {
                                 backgroundColor: 'rgba(0, 0, 0, 0.0)',
                                 height: 87,
                                 alignItems: "center",
                                 marginBottom: 10,
                                 },
                                 smallRest1View: {
                                 backgroundColor: 'rgb(255, 255, 255)',
                                 borderRadius: 8.2,
                                 borderWidth: 1,
                                 borderColor: 'rgb(151, 151, 151)',
                                 borderStyle: "solid",
                                 width: 312,
                                 height: 87,
                                 marginBottom: 10,
                                 justifyContent: "center",
                                 },
                                 group3Image: {
                                 backgroundColor: 'rgba(0, 0, 0, 0.0)',
                                 resizeMode: "center",
                                 width: 103,
                                 height: 87,
                              
                                 },
                                 
                                 shawarmaPlusText: {
                                 color: 'rgb(55, 58, 61)',
                                 fontSize: 18,
                                 fontStyle: "normal",
                                 fontWeight: "normal",
                                 textAlign: "center",
                                 letterSpacing: 0,
                                 backgroundColor: 'rgba(0, 0, 0, 0.0)',
                                 marginRight: 2,
                                 marginTop: 7,
                                 width: 200,
                                 },
                                 
                                 group8View: {
                                 
                                 
                                 backgroundColor: 'rgba(0, 0, 0, 0.0)',
                                 
                                 
                                 marginRight: 5,
                                 
                                 
                                 marginBottom: 10,
                                 
                                 
                                 width: 200,
                                 
                                 
                                 height: 46,
                                 
                                 
                                 flexDirection: "row",
                                 
                                 
                                 alignItems: "center",
                                 
                                 
                                 },
                                 group7View: {
                                 backgroundColor: 'rgba(0, 0, 0, 0.0)',
                                 width: 50,
                                 height: 37,
                                 alignItems: "stretch",
                                 },
                                 textFourText: {
                                 color: 'rgba(155, 155, 155, 0.2)',
                                 fontSize: 21,
                                 fontStyle: "normal",
                                 fontWeight: "bold",
                                 textAlign: "center",
                                 letterSpacing: -0,
                                 backgroundColor: 'rgba(0, 0, 0, 0.0)',
                                 marginLeft: 11,
                                 marginRight: 11,
                                 },
                                 textFiveText: {
                                 color: 'rgba(146, 146, 146, 0.2)',
                                 fontSize: 8,
                                 fontStyle: "normal",
                                 fontWeight: "normal",
                                 textAlign: "center",
                                 letterSpacing: -0,
                                 backgroundColor: 'rgba(0, 0, 0, 0.0)',
                                 marginLeft: 13,
                                 marginRight: 13,
                                 },
                                 group6View: {
                                 backgroundColor: 'rgba(0, 0, 0, 0.0)',
                                 marginRight: 50,
                                 width: 51,
                                 height: 46,
                                 alignItems: "stretch",
                                 },
                                 textText: {
                                 color: 'rgba(155, 155, 155, 0.8)',
                                 fontSize: 21,
                                 fontStyle: "normal",
                                 fontWeight: "bold",
                                 textAlign: "center",
                                 letterSpacing: -0,
                                 backgroundColor: 'rgba(0, 0, 0, 0.0)',
                                 marginLeft: 12,
                                 marginRight: 11,
                                 marginTop: 5,
                                 },
                                 textTwoText: {
                                 color: 'rgba(155, 155, 155, 0.8)',
                                 fontSize: 8,
                                 fontStyle: "normal",
                                 fontWeight: "normal",
                                 textAlign: "center",
                                 letterSpacing: -0,
                                 backgroundColor: 'rgba(0, 0, 0, 0.0)',
                                 marginLeft: 14,
                                 marginRight: 13,
                                 marginBottom: 4,
                                 },
                                 group5View: {
                                 backgroundColor: 'rgba(0, 0, 0, 0.0)',
                                 alignSelf: "center",
                                 width: 50,
                                 height: 46,
                                 flex: 1,
                                 justifyContent: "flex-end",
                                 alignItems: "flex-end",
                                 },
                                 textSixText: {
                                 color: 'rgba(155, 155, 155, 0.4)',
                                 fontSize: 8,
                                 fontStyle: "normal",
                                 fontWeight: "normal",
                                 textAlign: "center",
                                 letterSpacing: -0,
                                 backgroundColor: 'rgba(0, 0, 0, 0.0)',
                                 marginLeft: 14,
                                 marginRight: 13,
                                 marginBottom: 4,
                                 },
                                 textSevenText: {
                                 color: 'rgba(155, 155, 155, 0.4)',
                                 fontSize: 21,
                                 fontStyle: "normal",
                                 fontWeight: "bold",
                                 textAlign: "center",
                                 letterSpacing: -0,
                                 backgroundColor: 'rgba(0, 0, 0, 0.0)',
                                 marginLeft: 12,
                                 marginRight: 11,
                                 marginTop: 5,
                                 },
                                 group4View: {
                                 backgroundColor: 'rgba(0, 0, 0, 0.0)',
                                 alignSelf: "center",
                                 width: 51,
                                 height: 46,
                                 flex: 1,
                                 justifyContent: "flex-end",
                                 alignItems: "flex-end",
                                 },
                                 activeText: {
                                 color: 'rgb(114, 167, 228)',
                                 fontSize: 8,
                                 fontStyle: "normal",
                                 fontWeight: "normal",
                                 textAlign: "center",
                                 letterSpacing: -0,
                                 backgroundColor: 'rgba(0, 0, 0, 0.0)',
                                 marginLeft: 15,
                                 marginRight: 14,
                                 marginBottom: 4,
                                 },
                                 textThreeText: {
                                 color: 'rgb(114, 167, 228)',
                                 fontSize: 21,
                                 fontStyle: "normal",
                                 fontWeight: "bold",
                                 textAlign: "center",
                                 letterSpacing: -0,
                                 backgroundColor: 'rgba(0, 0, 0, 0.0)',
                                 marginLeft: 12,
                                 marginRight: 11,
                                 marginTop: 5,
                                 },
                                 })


