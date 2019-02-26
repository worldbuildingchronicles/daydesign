//
//  Group.js
//  magic version 1
//
//  Created by dhvani&dhrumil.
//  Copyright © 2019 magic. All rights reserved.
//

import { Text, StyleSheet, View, Platform, TouchableHighlight, ScrollView } from "react-native"
import React from "react"
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from "react-native-responsive-screen";

// Function convert 24hour time to 12hour format
export function tConvert (time) {
    // Check correct time format and split into components
    time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) { // If time format correct
        time = time.slice (1);  // Remove full string match value
        time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
        time[0] = +time[0] % 12 || 12; // Adjust hours
    }

    return time.join (''); // return adjusted time or original string
}

export default class Group extends React.Component {

  	state = {
  	 modalInfoVisible: false,
     disabled: false,
    };

    constructor(props) {
      super(props)
    }

    setInfoModalVisible(visible){
      this.setState({modalInfoVisible: visible});
    }

    openInfo(){

      var hours = new Date().getHours(); //Current Hours
      var min = new Date().getMinutes(); //Current Minutes

      var eventHour = this.props.item.time.substr(0, 2);
      var eventMin = this.props.item.time.substr(3, 5);

      if(eventHour < hours){
        this.setState({disabled: true});
      }
      else if(eventHour == hours){
        if(eventMin < min){
          this.setState({disabled: true});
        }
        else{
          this.setState({disabled: false});
          this.props.updateModalDet(this.props.item);
        }
      }
      else{
          this.setState({disabled: false});
          this.props.updateModalDet(this.props.item);
      }

    }

    componentDidMount() {
      // console.log(this.props);

      var hours = new Date().getHours(); //Current Hours
      var min = new Date().getMinutes(); //Current Minutes

      var eventHour = this.props.item.time.substr(0, 2);
      var eventMin = this.props.item.time.substr(3, 5);

      if(eventHour < hours){
        this.setState({disabled: true});
      }
      else if(eventHour == hours){
        if(eventMin < min){
              this.setState({disabled: true});
        }
        else{
            this.setState({disabled: false});
        }
      }
      else{
          this.setState({disabled: false});
      }

    }

    render() {

      if (Platform.OS == 'android') {
        return(

          <View opacity={this.state.disabled ? 0.5 : 1} style={styles.group7}>

          <TouchableHighlight onPress={() => {this.openInfo()}}  disabled={this.state.disabled} underlayColor="white" >

          <View style={styles.group6View}>

          <View style={styles.bitmapView}/>

          <View
          style={{
              flex: 1,
              justifyContent: "flex-end",
            }}>

          <View
          style={{
            flexDirection: "row",
            }}>

        <Text style={styles.federationHallText}>{this.props.item.location_name}</Text>

        <View
        style={{
          width: "100%",
          height: "100%",
          flexDirection: "row",
          position: "absolute",
        }}>

        <Text numberOfLines={1} style={styles.pmText}>{tConvert(this.props.item.time)}</Text>

        </View>
        </View>
        </View>

        <View
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
        }}>



        <Text adjustsFontSizeToFit={true} style={styles.tdInformationSessiText}>{this.props.item.group_name}</Text>




        <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
        }}>

        <View style={styles.viewView}/>
        <View
        style={{
          width: 87,
          height: 87,
          alignItems: "center",
         justifyContent: "center",
         position: "absolute",
        }}>

        <Text style={styles.textText}>{this.props.item.number_going}</Text>

        </View>

        <View
        style={{
          width: 87,
          height: 87,
          alignSelf: 'flex-start',
          justifyContent: "center",
          position: "absolute",
        }}>

        <Text style={styles.goingText}>Going</Text>

        </View>
        </View>

        <View
        style={{
          flexDirection: "column",
        }}>

        <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "flex-end",
        }}>

        {this.props.item.free_food && <Text style={styles.freeText}>Free Food</Text>}

        </View>

        <View
        style={{
          width: "100%",
          height: "100%",
          flexDirection: "row",
          justifyContent: "center",
          position: "absolute",
        }}/>

        </View>
        </View>
        </View>
        </TouchableHighlight>
        </View>
        );
      }
      else if (Platform.OS == 'ios') {

        return(
        <View opacity={this.state.disabled ? 0.5 : 1}style={styles.group7}>

        <TouchableHighlight onPress={() => {this.props.setScroll(true); this.openInfo();}}  disabled={this.state.disabled} underlayColor="white" >

        <View style={styles.group6View}>

        <View style={styles.bitmapView}/>

        <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
        }}>

        <View
        style={{
          flexDirection: "row",
        }}>

        <Text style={styles.federationHallText}>{this.props.item.location_name}</Text>

        <View
        style={{
          width: "100%",
          height: "100%",
          flexDirection: "row",
          position: "absolute",
        }}>

        <Text style={styles.pmText}>{tConvert(this.props.item.time)}</Text>

        </View>
        </View>
        </View>

        <View
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
        }}>

        <Text numberOfLines={2} adjustsFontSizeToFit={true} style={styles.tdInformationSessiTextIos}>{this.props.item.group_name}</Text>

        <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
        }}>

        <View style={styles.viewView}/>

        <View
        style={{
          width: 87,
          height: 87,
          alignItems: "center",
         justifyContent: "center",
         position: "absolute",
        }}>

        <Text style={styles.textText}>{this.props.item.number_going}</Text>

        </View>

        <View
        style={{
          width: 87,
          height: 87,
          alignSelf: 'flex-start',
          justifyContent: "center",
          position: "absolute",
        }}>

        <Text style={styles.goingText}>Going</Text>

        </View>
        </View>

        <View
        style={{
          flexDirection: "column",
        }}>

        <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "flex-end",
        }}>

        {this.props.item.free_food && <Text style={styles.freeText}>Free Food</Text>}

        </View>

        <View
        style={{
          width: "100%",
          height: "100%",
          flexDirection: "row",
          justifyContent: "center",
          position: "absolute",
        }}/>

        </View>
        </View>
        </View>
        </TouchableHighlight>
        </View>
        );
      }
    }

}

const styles = StyleSheet.create({
  group7: {
    backgroundColor: 'rgba(0, 0, 0, 0.0)',
    width: wp("45%"),
    height: 190,
    padding: wp('2%'),
    marginBottom: hp('1%') ,
    justifyContent: "center",
    flex: 0.5
  },
  group6View: {
    backgroundColor: 'rgba(0, 0, 0, 0.0)',
    alignSelf: "stretch",
    height: 180,
  },
  bitmapView: {
    backgroundColor: 'rgba(155, 155, 155, 0.15)',
    borderRadius: 8.2,
    alignSelf: "stretch",
    height: 150,
  },
  federationHallText: {
    color: 'rgb(74, 78, 82)',
    fontSize: 10,
    fontStyle: "normal",
    fontWeight: "bold",
    textAlign: "left",
    letterSpacing: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.0)',
    marginBottom: hp('2%'),
    alignSelf: "flex-end",
    width: wp("100%")
  },
  pmText: {
    color: 'rgb(74, 78, 82)',
    fontSize: 10,
    fontStyle: "normal",
    fontWeight: "bold",
    textAlign: "left",
    letterSpacing: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.0)',
    marginBottom: 1,
    //marginTop: 10,
    alignSelf: "flex-end",
    width: wp("100%")
  },
  tdInformationSessiText: {
    color: 'rgb(74, 78, 82)',
    fontStyle: "normal",
    fontWeight: "bold",
    textAlign: "left",
    letterSpacing: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.0)',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 3,
    height: hp('5%'),
    alignSelf: "stretch",
  },
  tdInformationSessiTextIos: {
    color: 'rgb(74, 78, 82)',
    fontStyle: "normal",
    fontWeight: "bold",
    textAlign: "left",
    letterSpacing: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.0)',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 3,
    alignSelf: "stretch",
    height: hp('5%'),
  },
  viewView: {
    backgroundColor: 'rgb(74, 78, 82)',
    borderRadius: 43,
    //marginTop: hp('5%'),
    //marginBottom: hp('1%'),
   // justifyContent: "center",
    width: 87,
    height: 87,
  },
  textText: {
    color: 'rgb(127, 177, 233)',
    fontSize: wp('10%'),
    fontStyle: "normal",
    fontWeight: "bold",
    backgroundColor: 'rgba(0, 0, 0, 0.0)',
  },
  goingText: {
    color: 'rgb(240, 240, 240)',
    fontSize: 10,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "center",
    letterSpacing: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.0)',
    marginTop: hp('7.5%'),
  },
  freeText: {
    color: 'rgb(127, 177, 233)',
    fontSize: 10,
    fontStyle: "normal",
    fontWeight: "bold",
    textAlign: "center",
    letterSpacing: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.0)',
    marginRight: 10,
    marginTop: 6,
  },
})
