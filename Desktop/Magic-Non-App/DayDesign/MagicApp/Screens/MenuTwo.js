//
//  MenuTwo
//  dynamic
//
//  Created by dhvani&dhrumil.
//  Copyright © 2018 magic. All rights reserved.
//

import { FlatList, Text, View, StyleSheet, TouchableOpacity, Image } from "react-native"
import React from "react"
import ListRest1TwoTwo from "./ListRest1TwoTwo"
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from "react-native-responsive-screen"


export default class MenuTwo extends React.Component {
    
    static navigationOptions = ({ navigation }) => {
        
        const { params = {} } = navigation.state
        return {
        header: null,
        headerLeft: null,
        headerRight: null,
        }
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
        
        return <ListRest1TwoTwo/>
    }
    
    render() {
        
        return <View
        style={styles.menuView}>
        <View
        style={styles.backgroundView}>
       
        
        <TouchableOpacity
        onPress={() => this.props.navigation.goBack()}
        style={styles.icCloseButton}>
        <Image
        source={require("./../assets/images/ic-close.png")}
        style={styles.buttonButtonImage}/>
        </TouchableOpacity>
        
        
        
        <View
        style={{
            
            //position: "absolute",
        //flex: 1,
       // flexDirection: "row",
        }}>
        
        <View
        style={styles.graybackgroundView}>
        <Text
        style={styles.nextmoneyText}>$2</Text>
        <View
        style={{
        flex: 1,
        justifyContent: "flex-end",
        }}>
        <Text
        style={styles.buyersneededText}>145/200</Text>
        </View>
        </View>
        </View>
        </View>
        <View
        style={{
        flex: 1,
        }}>
        <Text
        style={styles.shawarmaPlusText}>Checkout</Text>
        <View
        style={styles.viewFlatListViewWrapper}>
        <FlatList
        renderItem={this.renderViewFlatListCell}
        data={this.viewFlatListMockData}
        style={styles.viewFlatList}/>
        </View>
        <View
        style={styles.group3View}>
        <Text
        style={styles.subtotal4400Text}>SubTotal: $44.00</Text>
        <View>
        <Text
        style={styles.total5000Text}>Total: $50.00</Text>
        </View>
        <View>
        <Text
        style={styles.tax600Text}>Tax: $6.00</Text>
        </View>
        </View>
        <TouchableOpacity
        onPress={() => {this.props.navigation.navigate("payment")}}
        style={styles.payWithCardButton}>
        <Text
        style={styles.payWithCardButtonText}>Pay With Card</Text>
        </TouchableOpacity>
        </View>
        </View>
    }
}



const styles = StyleSheet.create({
                                 menuView: {
                                 backgroundColor: "rgb(246, 246, 246)",
                                 flex: 1,

                                 },
                                backgroundView: {
                                 backgroundColor: "rgba(55, 58, 61, 0.9)",
                                 height: hp('16.5%'),
                                 flexDirection: "row",
                                 },
                                 graybackgroundView: {
                                 backgroundColor: "rgba(226, 175, 47, 0.99)",
                                 borderRadius: 35,
                                 borderWidth: 2,
                                 borderColor: "rgb(246, 246, 246)",
                                 borderStyle: "solid",
                                 marginTop: hp('3%'),
                                 width: 70,
                                 height: 70,
                                 marginLeft: wp('25%'),

                                 },
                                 nextmoneyText: {
                                 color: "white",
                                 fontSize: 25,
                                 fontStyle: "normal",
                                 fontWeight: "bold",
                                 textAlign: "center",
                                 backgroundColor: "transparent",
                                 marginTop: hp('1.5%'),
                                 width: 70,
                                 //height: 29.92,
                                 },
                                 buyersneededText: {
                                 color: "white",
                                 fontSize: 12,
                                 fontStyle: "normal",
                                 fontWeight: "normal",
                                 textAlign: "center",
                                 backgroundColor: "transparent",
                                 marginBottom: hp('1.5%'),
                                 width: 70,
                                 },
                                 shawarmaPlusText: {
                                 color: "rgb(246, 246, 246)",
                                 fontSize: hp('4%'),
                                 fontStyle: "normal",
                                 fontWeight: "normal",
                                 textAlign: "center",
                                 backgroundColor: "rgb(114, 167, 228)",
                                 overflow: 'hidden',
                                 // marginTop: hp('14%'),
                                 width: wp('100%'),
                                 height: hp('5%'),
                                 //flex: 1,
                                 },
                                 
                                 
                                 
                                 viewFlatList: {
                                 backgroundColor: "transparent",
                                 },
                                 viewFlatListViewWrapper: {
                                 marginTop: hp('1%'),
                                 height: hp('45%'),
                                 },
                                 group3View: {
                                 backgroundColor: "transparent",
                                 marginLeft: 8,
                                 marginRight: 8,
                                 marginTop: hp('3%'),
                                 },
                                 subtotal4400Text: {
                                 color: "rgb(55, 58, 61)",
                                 fontSize: 16,
                                 fontStyle: "normal",
                                 fontWeight: "normal",
                                 textAlign: "left",
                                 backgroundColor: "transparent",
                                 width: 358,
                                 
                                 },
                                 total5000Text: {
                                 color: "rgb(55, 58, 61)",
                                 fontSize: 16,
                                 fontStyle: "normal",
                                 fontWeight: "normal",
                                 textAlign: "left",
                                 backgroundColor: "transparent",
                                 width: 358,
                                 marginTop: hp('2%'),
                                 
                                 },
                                 icCloseButton: {
                                 backgroundColor: "transparent",
                                 shadowColor: "rgba(0, 0, 0, 0.11)",
                                 shadowRadius: 3,
                                 shadowOpacity: 1,
                                 flexDirection: "row",
                                 alignItems: "center",
                                 justifyContent: "center",
                                 padding: 0,
                                 marginLeft: wp('5%'),
                                 marginTop:  hp('5%'),
                                 width: 50,
                                 height: 50,
                                 },
                                 icCloseButtonText: {
                                 color: "black",
                                 fontSize: 12,
                                 fontStyle: "normal",
                                 fontWeight: "normal",
                                 textAlign: "left",
                                 },
                                 icCloseButtonImage: {
                                 resizeMode: "contain",
                                 },
                                 tax600Text: {
                                 color: "rgb(55, 58, 61)",
                                 fontSize: 16,
                                 fontStyle: "normal",
                                 fontWeight: "normal",
                                 textAlign: "left",
                                 backgroundColor: "transparent",
                                 marginTop: hp('2%'),
                                 },
                                 payWithCardButton: {
                                 backgroundColor: "transparent",
                                 flexDirection: "row",
                                 alignItems: "center",
                                 justifyContent: "center",
                                 padding: 0,
                                 marginTop:  hp('2%'),
                                 marginBottom: 30,
                                 width: 121,
                                 height: 25,
                                 alignSelf: "center",
                                 },
                                 payWithCardButtonImage: {
                                 resizeMode: "contain",
                                 marginRight: 10,
                                 },
                                 payWithCardButtonText: {
                                 color: "rgb(91, 158, 236)",
                                 fontSize: 18,
                                 fontStyle: "normal",
                                 fontWeight: "normal",
                                 textAlign: "left",
                                 },
                                 })
