//
//  CreateGroupModal.js
//  magic version 1
//
//  Created by dhvani&dhrumil.
//  Copyright © 2019 magic. All rights reserved.
//

import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, Modal, Keyboard, Alert, Platform } from "react-native"
import React from "react"

import firebase from 'react-native-firebase'
import DateTimePicker from 'react-native-modal-datetime-picker';
import PushNotification from 'react-native-push-notification'

export default class CreateGroupModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      newGroupName: "",
      newGroupTime: "",
      newGroupLocation: "",
      errorMessage: null,
      successMessage: null,
      newName: "",
      height: 220,
      heightForm: 158,
      isModalVisible: props.modalVisible,
      isDateTimePickerVisible: false,
      hasName: false,
    };
  }

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

 _handleDatePicked = (time) => {
   // console.log('A time has been picked: ', time.getHours() + ':' + time.getMinutes());

   var hours = new Date().getHours(); //Current Hours
   var min = new Date().getMinutes(); //Current Minutes
   if(time.getHours() < hours){
    if (Platform.OS == 'android') {
     this._hideDateTimePicker();
   }
     Alert.alert(
  'Invalid Time',
  'Cannot create an event in the past! Pick a time in the future.',
  [
    {text: 'OK', onPress: () => this._showDateTimePicker()},
  ],
  {cancelable: false},
    );
   }
   else if(time.getHours() == hours){
     if(time.getMinutes() <= min){

       if (Platform.OS == 'android') {
        this._hideDateTimePicker();
      }


       Alert.alert(
    'Invalid Time',
    'Cannot create an event in the past! Pick a time in the future.',
    [
      {text: 'OK', onPress: () => this._showDateTimePicker()},
    ],
    {cancelable: false},
      );
     }
     else{
       this.setState({newGroupTime: ("0" + time.getHours()).slice(-2) + ':' + ("0" + time.getMinutes()).slice(-2)});
       this._hideDateTimePicker();
     }
   }
   else{
     this.setState({newGroupTime: ("0" + time.getHours()).slice(-2) + ':' + ("0" + time.getMinutes()).slice(-2)});
     this._hideDateTimePicker();
   }
 };

 _setModalVisible(visible) {
   this.setState({isModalVisible: visible});
 }

 createNewGroup(){



 //   var addMessage = firebase.functions().httpsCallable('addMessage');
 // //  console.log(addMessage({text: "Test"}))
 // addMessage({text: "Test Patel", state: this.state}).then(function(result) {
 //   // Read result of the Cloud Function.
 //   var sanitizedMessage = result.data.text;
 //   console.log(sanitizedMessage);
 //   // ...
 // }).catch(function(error) {
 //   // Getting the Error details.
 //   var code = error.code;
 //   var message = error.message;
 //   var details = error.details;
 //   // ...
 //   console.log(code)
 //   console.log(message)
 //   console.log(details)
 // });


     // console.log(this.props)
     // console.log("creating..");
    const { newGroupName, newGroupLocation, newGroupTime, modalCreateVisible, newName} = this.state
    var that = this;
    if(newGroupLocation.trim() == "" || newGroupName.trim() == "" || newGroupTime.trim() == "") {
       this.setState({errorMessage: "Please fill in all fields!"});
     }
    else{
        if(this.state.hasName == false){
          if (newName.trim() == "") {
             this.setState({errorMessage: "Please fill in your name!"});
           }
          else{
            this.setState({errorMessage: null});

            // database start
            var that = this;
            var setName = firebase.functions().httpsCallable('setName');
            setName({name: newName}).then(function(result) {
              // Read result of the Cloud Function.
              //console.log(sanitizedMessage);
                      that.props.setHasName(true);
              // ...
            }).catch(function(error) {
              // Getting the Error details.
              var code = error.code;
              var message = error.message;
              var details = error.details;
              // ...
              // console.log(code)
              // console.log(message)
              // console.log(details)
              alert("Error with database: " + message);
            });



            var groupCount = 0;
            firebase.database().ref('groups_count').once('value').then(function(snapshot) {
              groupCount = snapshot.val();

              var updates = {};
              updates['/key/'] = groupCount;
              updates['/creator/'] = that.props.uniqueId;
              updates['/free_food/'] = false;
              updates['/group_name/'] = newGroupName;
              updates['/location_name/'] = newGroupLocation;
              updates['/time/'] = newGroupTime;
              updates['/number_going/'] = 1;
              updates['/people/' + that.props.uniqueId + '/prompt'] = "Group Creator";

              var date = new Date().getDate(); //Current Date
              var month = new Date().getMonth() + 1; //Current Month
              var year = new Date().getFullYear(); //Current Year

              updates['/date_stamp/'] = year+'-'+("0" + date).slice(-2)+'-'+("0" + month).slice(-2);

              firebase.database().ref('groups/' + groupCount).update(updates);

              var update_count = {};
              update_count['/groups_count/'] = ++groupCount;
              firebase.database().ref().update(update_count);

              // database end

              var date = new Date().getDate(); //Current Date
              var month = new Date().getMonth(); //Current Month
              var year = new Date().getFullYear(); //Current Year
              var hours = new Date().getHours(); //Current Hours
              var min = new Date().getMinutes(); //Current Minutes

              var now = new Date(year, date, month, hours, min);
              var eventHour = parseInt(newGroupTime.substr(0, 2));
              var eventMin = parseInt(newGroupTime.substr(3, 5));

              var notifMessage = "Event Now: " + newGroupName + " @ " + newGroupLocation;
              if(eventHour == hours){
                if(eventMin-10 > min){
                  eventMin = eventMin - 10;
                  notifMessage = "Upcoming event: " + newGroupName + " @ " + newGroupLocation + " in 10 minutes";
                }
              }
              else{
                if(eventMin-10 > 0){
                  eventMin = eventMin - 10;
                  notifMessage = "Upcoming event: " + newGroupName + " @ " + newGroupLocation + " in 10 minutes";
                }
              }

              var eventDate = new Date(year, date, month, eventHour, eventMin);
              var timeLeft = eventDate - now;
              // console.log(timeLeft);

              PushNotification.localNotificationSchedule({
                //... You can use all the options from localNotifications
              message: notifMessage, // (required)
              date: new Date(Date.now() + timeLeft) // in 60 secs
              });

               that.setState({newGroupName: "", newGroupTime: "", newGroupLocation: ""});
              that._setModalVisible(!that.state.isModalVisible)
               that.setState({successMessage: "Group Added!"})
           });
          }
        }
        else{
          this.setState({errorMessage: null});

          // database start
          var groupCount = 0;

          firebase.database().ref('groups_count').once('value').then(function(snapshot) {
            groupCount = snapshot.val();

            var updates = {};
            updates['/key/'] = groupCount;
            updates['/creator/'] = that.props.uniqueId;
            updates['/free_food/'] = false;
            updates['/group_name/'] = newGroupName;
            updates['/location_name/'] = newGroupLocation;
            updates['/time/'] = newGroupTime;
            updates['/number_going/'] = 1;
            updates['/people/' + that.props.uniqueId + '/prompt'] = "Group Creator";

            var date = new Date().getDate(); //Current Date
            var month = new Date().getMonth() + 1; //Current Month
            var year = new Date().getFullYear(); //Current Year

            updates['/date_stamp/'] = year+'-'+("0" + date).slice(-2)+'-'+("0" + month).slice(-2);

            firebase.database().ref('groups/' + groupCount).update(updates);

            var update_count = {};
            update_count['/groups_count/'] = ++groupCount;
            firebase.database().ref().update(update_count);

            // database end

            var date = new Date().getDate(); //Current Date
            var month = new Date().getMonth(); //Current Month
            var year = new Date().getFullYear(); //Current Year
            var hours = new Date().getHours(); //Current Hours
            var min = new Date().getMinutes(); //Current Minutes

            var now = new Date(year, month, date, hours, min);
            var eventHour = parseInt(newGroupTime.substr(0, 2));
            var eventMin = parseInt(newGroupTime.substr(3, 5));

            var notifMessage = "Event Now: " + newGroupName + " @ " + newGroupLocation;
            if(eventHour == hours){
               if(eventMin-10 > min){
                 eventMin = eventMin - 10;
                 notifMessage = "Upcoming event: " + newGroupName + " @ " + newGroupLocation + " in 10 minutes";
               }
             }
            else{
               if(eventMin-10 > 0){
                 eventMin = eventMin - 10;
                 notifMessage = "Upcoming event: " + newGroupName + " @ " + newGroupLocation + " in 10 minutes";
               }
             }

            var eventDate = new Date(year, month, date, eventHour, eventMin);
            var timeLeft = eventDate - now;
            // console.log(timeLeft);

            PushNotification.localNotificationSchedule({
               //... You can use all the options from localNotifications
             message: notifMessage, // (required)
             date: new Date(Date.now() + timeLeft) // in 60 secs
            });

            that.setState({newGroupName: "", newGroupTime: "", newGroupLocation: ""});
            that._setModalVisible(!that.state.isModalVisible)
            that.setState({successMessage: "Group Added!"})
          });
        }
  }
}

 componentDidMount(){
   // console.log(this.props);
   if(this.props.hasName != null){
      this.setState({hasName: this.props.hasName});
      if(this.props.hasName == false){
          this.setState({height: 280, heightForm: 218});
      }
      else{
          this.setState({height: 220, heightForm: 158});
      }
   }
 }

  componentDidUpdate(prevProps) {
    if(this.props.modalVisible != prevProps.modalVisible){
        this.setState({isModalVisible: true});
        this.setState({hasName: this.props.hasName});
    }
    if(this.props.hasName != prevProps.hasName){
        this.setState({hasName: this.props.hasName});
        if(this.props.hasName == false){
            this.setState({height: 280,heightForm: 218});
          }
        else{
            this.setState({height: 220, heightForm: 158});
          }
      }
    }

  componentWillUnmount(){

  }

  render() {
    return (
   <View>
     <Modal
      animationType="fade"
      transparent={true}
      visible={this.state.isModalVisible}
      onRequestClose={() => {this._setModalVisible(false)}}>
      <View
      style={styles.artboard2View}>
      <View
      style={{
        flexDirection: "row",
        }}>
      <TouchableOpacity
        onPress={() => {this.setState({errorMessage: null}); this._setModalVisible(!this.state.isModalVisible); }}
        style={styles.icCloseButton}>
      <Image
        source={require("./../assets/images/ic-close-2.png")}
        style={styles.icCloseButtonImage}/>
      </TouchableOpacity>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "flex-end",
        }}>
      <View style={styles.viewView}>
      <TouchableOpacity
        onPress={() => {this.createNewGroup()}}
        style={styles.icCartButton}>
      <Image
        source={require("./../assets/images/ic-cart.png")}
        style={styles.icCartButtonImage}/>
      <View
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
        }}>
        <Image
          source={require("./../assets/images/bitmap-3.png")}
          style={styles.bitmapImage}/>
      </View>
      </TouchableOpacity>

      </View>
      </View>
      </View>

      <View style={[styles.contentView, {height: this.state.height}]}>

      <View style={[styles.formView, {height: this.state.heightForm}]}>

        {!this.state.hasName &&
            <View style={styles.edittextTextonlyPlaceholderViewName}>
            <Text style={styles.paymentText}>Your Name</Text>
            <View
              style={{
                flex: 1,
                justifyContent: "flex-end",
              }}>
            <TextInput
              placeholder="Kobe Patel"
              onChangeText={newName => this.setState({newName}) }
              value={this.state.newName}
              style={styles.TextTextInput}/>
            </View>
            </View>
        }

        <View style={styles.edittextTextonlyPlaceholderView}>
        <Text style={styles.paymentText}>Group Name</Text>
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
          }}>
        <TextInput
            placeholder="Enter Group Name"
            onChangeText={newGroupName => this.setState({newGroupName}) }
            value={this.state.newGroupName}
            style={styles.TextTextInput}/>
        </View>
        </View>
        <View style={styles.edittextTextonlyPlaceholderTwoView}>
        <Text style={styles.paymentTwoText}>Venue</Text>
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
          }}>
        <TextInput
          placeholder="Enter Venue"
          onChangeText={newGroupLocation => this.setState({newGroupLocation}) }
          value={this.state.newGroupLocation}
          style={styles.TextTwoTextInput}/>

        </View>
        </View>

        <View style={styles.edittextTextonlyPlaceholderThreeView}>
        <Text style={styles.paymentThreeText}>Time</Text>
        <View
          style={{
                // flex: 1,
                // justifyContent: "flex-end",
          }}>
        <TextInput
            type="time"
            placeholder="Select Time"
            onChangeText={newGroupTime => this.setState({newGroupTime}) }
            value={this.state.newGroupTime}
            style={styles.TextTwoTextInput}
            onFocus={() => {this._showDateTimePicker(); Keyboard.dismiss();}}
        />

        <DateTimePicker
           isVisible={this.state.isDateTimePickerVisible}
           onConfirm={this._handleDatePicked}
           onCancel={this._hideDateTimePicker}
           titleIOS="Pick a time"
           mode="time"
        />

        </View>
        </View>

        {this.state.errorMessage && <Text style={{ color: 'red', marginTop: 7}}>{this.state.errorMessage}</Text>}

        </View>
        </View>
        </View>
        </Modal>
        </View>
    );
  }

}

const styles = StyleSheet.create({
  artboard2View: {
    backgroundColor: 'rgba(55, 58, 61,  0.95)',
    flex: 1,
  },
  icCloseButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.0)',
    shadowColor: 'rgba(0, 0, 0, 0.10594995)',
    shadowRadius: 3,
    shadowOpacity: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 19,
    marginTop: 36,
    width: 60,
    height: 60,
  },
  icCloseButtonImage: {
    resizeMode: "contain",
  },
  icCloseButtonText: {
    color: 'rgb(0, 0, 0)',
   // fontFamily: ".SFNSText",
    fontSize: 12,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "left",
    letterSpacing: 0,
  },
  viewView: {
    backgroundColor: 'rgba(0, 0, 0, 0.0)',
    marginRight: 16,
    marginTop: 6,
    width: 63.92,
    height: 90,
  },
  icCartButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.0)',
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-end",
    width: 63.92,
    height: 90,
  },
  icCartButtonImage: {
    resizeMode: "contain",
  },
  icCartButtonText: {
    color: 'rgb(0, 0, 0)',
    //fontFamily: ".SFNSText",
    fontSize: 12,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "left",
    letterSpacing: 0,
  },
  bitmapImage: {
    resizeMode: "center",
    backgroundColor: 'rgba(255, 255, 255, 0.0)',
    marginRight: 18,
    marginTop: 48,
    alignSelf: "flex-end",
    width: 27,
    height: 27,
  },
  contentView: {
    backgroundColor: 'rgb(255, 255, 255)',
    borderRadius: 22,
    marginLeft: 16,
    marginRight: 16,
    marginTop: 45,
    alignSelf: "stretch",
  },
  formView: {
    backgroundColor: 'rgba(0, 0, 0, 0.0)',
    marginLeft: 13,
    marginRight: 19,
    marginTop: 21,
    alignSelf: "stretch",
  },
  edittextTextonlyPlaceholderView: {
    backgroundColor: 'rgba(0, 0, 0, 0.0)',
    alignSelf: "stretch",
    height: 48,
  },
  edittextTextonlyPlaceholderViewName: {
    backgroundColor: 'rgba(0, 0, 0, 0.0)',
    alignSelf: "stretch",
    height: 48,
    marginBottom: 7,
  },
  paymentText: {
    color: 'rgb(0, 0, 0)',
    fontSize: 12,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "left",
    letterSpacing: 0.34,
    backgroundColor: 'rgba(0, 0, 0, 0.0)',
    // marginRight: 236,
    width: 75,
    height: 16,
  },
  edittextTextonlyPlaceholderTwoView: {
    backgroundColor: 'rgba(0, 0, 0, 0.0)',
    marginTop: 7,
    alignSelf: "stretch",
    height: 48,
  },
  paymentTwoText: {
    color: 'rgb(0, 0, 0)',
    fontSize: 12,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "left",
    letterSpacing: 0.34,
    backgroundColor: 'rgba(0, 0, 0, 0.0)',
    // marginRight: 274,
    width: 37,
    height: 16,
  },
  TextTwoTextInput: {
    color: 'rgb(74, 74, 74)',
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "left",
    // lineHeight: 0,
    letterSpacing: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.0)',
    // marginRight: 4,
    // marginBottom: 1,
    alignSelf: "stretch",
    padding: 0,
    margin: 0,
    borderWidth: 0,
  },
  TextTextInput: {
    color: 'rgb(74, 74, 74)',
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "left",
    // lineHeight: 0,
    // letterSpacing: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.0)',
    alignSelf: "stretch",
    padding: 0,
    margin: 0,
    borderWidth: 0,
  },
  edittextTextonlyPlaceholderThreeView: {
    backgroundColor: 'rgba(0, 0, 0, 0.0)',
    marginTop: 7,
    alignSelf: "stretch",
    height: 48,
  },
  paymentThreeText: {
    color: 'rgb(0, 0, 0)',
    fontSize: 12,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "left",
    letterSpacing: 0.34,
    backgroundColor: 'rgba(0, 0, 0, 0.0)',
    // marginRight: 282,
    width: 29,
    height: 16,
  },
  TextThreeTextInput: {
    color: 'rgb(74, 74, 74)',
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "left",
    // lineHeight: 0,
    letterSpacing: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.0)',
    marginRight: 6,
    alignSelf: "stretch",
    padding: 0,
    margin: 0,
    borderWidth: 0,
  },
});
