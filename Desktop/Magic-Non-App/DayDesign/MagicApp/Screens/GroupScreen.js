//
//  GroupScreen.js
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

import Group from "./Group"
import Friend from "./Friend"
import CreateGroupModal from "./CreateGroupModal"
import OfflineNotice from './OfflineNotice'

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

export default class GroupScreen extends React.Component {

    state = {
    uniqueId: null,
    modalCreateVisible: false,
    newGroupName: "",
    newGroupTime: "",
    newGroupLocation: "",
    newName: "",
    hasName: false,
    newIntro: "",
    errorMessage: null,
    successMessage: null,
    modalDetailVisible: false,
    item: {location_name: "loading", group_name: "", time:"loading"},
    friendData: [],
    key: -1,
    modalJoinVisible: false,
    notInEvent: true,
    data: [],
    scrollEnabled: true,
    appState: AppState.currentState,
    loading: true,
    };

    _isMounted = false

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

        this.updateDetailModal = this.updateDetailModal;

        // Configure notifications
        PushNotification.configure({

                                   // (optional) Called when Token is generated (iOS and Android)
                                   onRegister: function(token) {
                                   console.log( 'TOKEN:', token );
                                   },

                                   // (required) Called when a remote or local notification is opened or received
                                   onNotification: function(notification) {
                                   console.log( 'NOTIFICATION:', notification );
                                   },

                                   // ANDROID ONLY: (optional) GCM Sender ID.
                                   senderID: "YOUR GCM SENDER ID",

                                   // IOS ONLY (optional): default: all - Permissions to register.
                                   permissions: {
                                   alert: true,
                                   badge: true,
                                   sound: true
                                   },

                                   // Should the initial notification be popped automatically
                                   // default: true
                                   popInitialNotification: true,

                                   /**
                                    * (optional) default: true
                                    * - Specified if permissions (ios) and token (android and ios) will requested or not,
                                    * - if not, you must call PushNotificationsHandler.requestPermissions() later
                                    */
                                   requestPermissions: true,
                                   });


    }

    setCreateModalVisible(visible) {
        this.setState({modalCreateVisible: visible});
    }

    setDetailModalVisible(visible){
        this.setState({modalDetailVisible: visible});
    }

    setJoinModalVisible(visible){
        this.setState({modalJoinVisible: visible});
    }

    updateCreateState(){
        this.setState({modalCreateVisible: false});
    }

    loadEverything(my){
        // console.log("constructing...");

        let root = firebase.database();
        let solid = root.ref('build_version');
        // console.log( solid.once('value'));
        solid.once('value').then(function(snapshot) {

                                 if(snapshot.val() != null){

                                  //console.log(snapshot.val())
                                 // console.log(parseInt(DeviceInfo.getBuildNumber()));
                                  // console.log(snapshot.val().localeCompare(DeviceInfo.getVersion()));
                                 console.log(DeviceInfo.getVersion());
                                  // console.log('load now');

                                 if(snapshot.val().localeCompare(DeviceInfo.getVersion()) == 0){

                                 let fireID = root.ref("users/" + my.state.uniqueId).child('num_opened');
                                 fireID.once('value').then(function(snapshot) {

                                                           if(snapshot.val() == null){

                                                           var updates = {};
                                                           updates['/num_opened'] = 1;
                                                           root.ref("users/" + my.state.uniqueId).update(updates).then(function(){
                                                                                                                       //alert("Set initial stuff, now load groups");
                                                                                                                       my.loadGroups(my, root);

                                                                                                                       }).catch(function(error) {
                                                                                                                                alert("Data could not be loaded. Try reopening app." + error);
                                                                                                                                });

                                                           }
                                                           else{

                                                           var updates = {};
                                                           updates['/num_opened'] = snapshot.val()+1;
                                                           root.ref("users/" + my.state.uniqueId).update(updates).then(function(){
                                                                                                                       // alert("Set initial stuff, now load groups");
                                                                                                                       my.loadGroups(my, root);

                                                                                                                       }).catch(function(error) {
                                                                                                                                alert("Data could not be loaded. Try reopening app." + error);
                                                                                                                                });

                                                           }

                                                           });

                                 }
                                 else{

                                 if (Platform.OS == 'android') {
                                 Alert.alert(
                                             'Old Version of App',
                                             'App is not up to date!\nPlease update the app.',
                                             [
                                              {text: 'Exit App', onPress: () => BackHandler.exitApp()},
                                              ],
                                             { cancelable: false });
                                 }
                                 else if (Platform.OS == 'ios') {
                                 Alert.alert(
                                             'Old Version of App',
                                             'App is not up to date!\nPlease update the app.',
                                             [
                                              {text: 'Exit App', onPress: () => {RNExitApp.exitApp();}},
                                              ],
                                             { cancelable: false });
                                 }
                                 }
                                 }
                                 else{
                                 alert("Data could not be loaded. Try reopening app." + error);
                                 }

                                 }).catch(function(error) {
                                          alert("Data could not be loaded. Try reopening app." + error);
                                          });

    }

    loadGroups(my, root){
        // console.log('loading groups...')

        var getKey = my.state.key;

        root.ref('groups').on('value', function(snapshot) {

                              // console.log(snapshot.val());
                              // console.log(my.state)

                              var date = new Date().getDate(); //Current Date
                              var month = new Date().getMonth(); //Current Month
                              var year = new Date().getFullYear(); //Current Year
                              var now = new Date(year, month, date);
                              // console.log(date+'-'+month+'-'+year+' '+hours+':'+min+':'+sec);

                              var todayGroups = []

                              for(var i = 0; i < snapshot.val().length; i++){
                              // console.log(snapshot.val())
                              var full_date = snapshot.val()[i].date_stamp;
                              // console.log(snapshot.val()[i].date_stamp);
                              var check_date = new Date(parseInt(full_date.substring(0, 4)), parseInt(full_date.substring(8, 10))-1, parseInt(full_date.substring(5, 7)));
                              // console.log(parseInt(full_date.substring(5, 7))-1);
                              // console.log(check_date.getMonth());
                              // console.log(now.getMonth());
                              if(check_date < now){
                              // console.log("Selected date is in the past");
                              // Don't show to user
                              }
                              else{
                              // console.log("Selected date is NOT in the past");
                              todayGroups.push(snapshot.val()[i]);
                              }
                              }
                              // console.log(todayGroups);

                              // Sort from earliest time to latest time
                              todayGroups.sort(function (a, b) {

                                               var aHours = a.time.substr(0, 2);
                                               var aMin = a.time.substr(3, 5);

                                               var bHours = b.time.substr(0, 2);
                                               var bMin = b.time.substr(3, 5);

                                               if(aHours < bHours){
                                               // console.log("less than");
                                               return 1;
                                               }
                                               else if(aHours == bHours){
                                               if(aMin < bMin){
                                               // console.log("less than");
                                               return 1;
                                               }
                                               else if(aMin == bMin){
                                               return 0;
                                               }
                                               else{
                                               // console.log("more than");
                                               return -1;
                                               }
                                               }
                                               else{
                                               //    console.log("more than");
                                               return -1;
                                               }
                                               });

                              if(my._isMounted){

                              my.setState({data: todayGroups, loading: false},  function() {

                                          // console.log("set state with group data");

                                          if(my.state.modalDetailVisible == true){
                                          // console.log(my.state.key);
                                          getKey = my.state.key;
                                          if(getKey != -1){

                                          // modal is open
                                          var item;
                                          for(var i = 0; i < todayGroups.length; i++){
                                          if(todayGroups[i].key == getKey){
                                          item = todayGroups[i];
                                          }
                                          }

                                          my.loadFriends(my, item.key, item.number_going, item.people, true);
                                          }

                                          }

                                          root.ref("users/" + my.state.uniqueId).once('value').then(function(snapshot) {
                                                                                                    // console.log(snapshot.val());
                                                                                                    // console.log("Got name");
                                                                                                    if(snapshot.val() != null){
                                                                                                    if(snapshot.val().name != null){
                                                                                                    my.setState({newName: snapshot.val().name});
                                                                                                    my.setState({hasName: true});
                                                                                                    }
                                                                                                    else{
                                                                                                    my.setState({hasName: false});
                                                                                                    }
                                                                                                    }
                                                                                                    });

                                          my.arrayholder = todayGroups;



                                          // console.log("finished setting all data")});
                                          });
                              }

                              });

    }

    loadFriends(my, key, numPeople, people, joined){

        if(!my.state.friendData || my.state.friendData.length != numPeople || key != my.state.key){

            my.setState({friendData: [{key: "0", name: "Loading Patel", prompt: "Loading"}]});
            var counter = 1;

            var found = false;
            var sliced = false;

            for(var i = 0; i < numPeople; i++){

                firebase.database().ref("users/" + Object.keys(people)[i]).on('value', function(snapshot) {

                                                                              if(snapshot.key){

                                                                              var friend = {};
                                                                              var friendID = snapshot.key;
                                                                              if(friendID == my.state.uniqueId){
                                                                              found = true;
                                                                              my.setState({notInEvent: false});
                                                                              }

                                                                              friend["prompt"] = people[friendID].prompt;
                                                                              friend["key"] = counter.toString();
                                                                              friend["id"] = friendID;
                                                                              friend["name"] = snapshot.val().name;

                                                                              my.state.friendData.push(friend);
                                                                              counter++;

                                                                              if(numPeople == 1){
                                                                              my.setState({friendData: my.state.friendData.slice(1)});
                                                                              }
                                                                              else{
                                                                              if(sliced == false){
                                                                              my.setState({friendData: my.state.friendData.slice(1)});
                                                                              sliced = true;
                                                                              }
                                                                              }

                                                                              }

                                                                              }, function(error){
                                                                              alert("Data could not be loaded. Try reopening app." + error);
                                                                              });

            }

            if(found == false){
                my.setState({notInEvent: true});
            }

            // console.log(my.state.friendData);
            // console.log("got all users");

            if(joined == false){
                my.setState({modalDetailVisible: !my.state.modalDetailVisible});
            }

            my.setState({key: key});

        }
        else{

            if(joined == false){
                my.setState({modalDetailVisible: !my.state.modalDetailVisible});
            }

        }

    }

    _handleAppStateChange = (nextAppState) => {
        if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
            // console.log('App has come to the foreground!');
            let root = firebase.database();
            this.loadGroups(this, root);
        }
        else{
            // console.log('leaving app');
            firebase.database().ref('groups').off();
        }
        this.setState({appState: nextAppState});
    }

    searchFilterFunction = text => {
        // console.log(this.arrayholder);
        if(this.arrayholder != null){
            const newData = this.arrayholder.filter(item => {
                                                    const itemData = `${item.location_name.toUpperCase()} ${item.group_name.toUpperCase()}}`;
                                                    const textData = text.toUpperCase();
                                                    return itemData.indexOf(textData) > -1;
                                                    });
            this.setState({
                          data: newData,
                          });
        }
    };

    onCreateButtonPressed = () => {
        this.setCreateModalVisible(!this.state.modalCreateVisible);
    }

    renderGroupFlatListCell = ({ item }) => {
        return (<Group item={item} nav={this.props.nav} updateModalDet={this.updateDetailModal} setScroll={this.setScroll}/> )
    }

    renderViewFlatListCell = ({ item }) => {
        return(<Friend item={item} />)
    }

    showEmptyListView = () => {
        <View>
        <Text>Loading</Text>
        </View>
    }

    setScroll = (item) => {
        this.setState({scrollEnabled: item});
    }

    setHasName = (item) => {
        this.setState({hasName: item});
    }

    updateDetailModal = (item) => {
        // console.log(item);
        this.setState({item: item});
        this.setState({scrollEnabled: true});
        this.loadFriends(this, item.key, item.number_going, item.people, false);
    }

    openReport = () => {
        Linking.canOpenURL('https://wbc-magic.weebly.com/report').then(supported => {
                                                                       if (supported) {
                                                                       Linking.openURL('https://wbc-magic.weebly.com/report');
                                                                       } else {
                                                                       console.log("Don't know how to open URI: https://wbc-magic.weebly.com/report");
                                                                       }
                                                                       });
    };

    joinEvent(){

        userID = this.state.uniqueId;

        const { newName, newIntro, friendData} = this.state

        var numPeople = friendData.length;
        var that = this;

        if (newName.trim() == "") {
            this.setState({errorMessage: "Please fill in your name!"});
        }
        else{
            this.setState({errorMessage: null});

            var updates_1 = {};
            updates_1['/name/'] = newName;
            firebase.database().ref("users/" + userID).update(updates_1);
            this.setState({hasName: true});

            var updates = {};
            updates['/people/' + userID + '/prompt'] = newIntro;

            updates['/number_going'] = numPeople + 1;
            firebase.database().ref('groups/' + this.state.key).update(updates);

            this.setJoinModalVisible(!this.state.modalJoinVisible);

            var date = new Date().getDate(); //Current Date
            var month = new Date().getMonth(); //Current Month
            var year = new Date().getFullYear(); //Current Year
            var hours = new Date().getHours(); //Current Hours
            var min = new Date().getMinutes(); //Current Minutes

            var now = new Date(year, month, date, hours, min);
            var eventHour = parseInt(this.state.item.time.substr(0, 2));
            var eventMin = parseInt(this.state.item.time.substr(3, 5));

            var notifMessage = "Event Now: " + this.state.item.group_name + " @ " + this.state.item.location_name;
            if(eventHour == hours){
                if(eventMin-10 > min){
                    eventMin = eventMin - 10;
                    notifMessage = "Upcoming event: " + this.state.item.group_name + " @ " + this.state.item.location_name + " in 10 minutes";
                }
            }
            else{
                if(eventMin-10 > 0){
                    eventMin = eventMin - 10;
                    notifMessage = "Upcoming event: " + this.state.item.group_name + " @ " + this.state.item.location_name + " in 10 minutes";
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

        }

    }

    componentDidMount() {
        // console.log('In main group screen');

        this._isMounted = true;

        // console.log(DeviceInfo.getUniqueID());
        //     const uniqueId = DeviceInfo.getUniqueID();

        if (firebase.auth().currentUser !== null){
            // console.log("user id: " + firebase.auth().currentUser.uid);
            this.setState({uniqueId: firebase.auth().currentUser.uid});

            // this.setState({uniqueId: uniqueId});


            AppState.addEventListener('change', this._handleAppStateChange);

            let my = this;
            this.loadEverything(my);
        }


        // console.log('Done loading everything');
    }

    // Remove all listeners
    componentWillUnmount() {
        console.log('leaving...');
        this._isMounted = false;
        AppState.removeEventListener('change', this._handleAppStateChange);
    }

    // called when prop updates
    componentDidUpdate(prevProps) {
        // console.log('updating...');
        // console.log(this.state);
    }

    render() {

        return (
                <View
                style={styles.groupsView}>
                <StatusBar
                animated={true}
                hidden={true}
                backgroundColor="#F6F6F6"
                barStyle="dark-content" // Here is where you change the font-color
                />
                <CreateGroupModal modalVisible={this.state.modalCreateVisible} uniqueId={this.state.uniqueId} hasName={this.state.hasName} setHasName={this.setHasName}/>
                <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.modalDetailVisible}
                onRequestClose={() => {
                this.setDetailModalVisible(!this.state.modalDetailVisible); this.setState({friendData: []})
                }}>

                <View
                style={styles.menuView}>
                <View
                style={{
                flexDirection: "row",
                }}>
                <TouchableOpacity
                style={styles.buttonButton}
                onPress={() => {this.setState({scrollEnabled: true}); this.setDetailModalVisible(!this.state.modalDetailVisible); this.setState({friendData: []})}}>
                <Image
                source={require("./../assets/images/ic-close.png")}
                style={styles.buttonButtonImage}/>
                </TouchableOpacity>
                {    this.state.notInEvent &&     <TouchableOpacity
                style={styles.buttonTwoButton}
                onPress={() => { this.setJoinModalVisible(!this.state.modalJoinVisible); }}>
                <Image
                source={require("./../assets/images/bob-2.png")}
                style={styles.buttonButtonImage}/>
                </TouchableOpacity> }

                </View>
                <View
                style={styles.restHeaderView}>
                <View style={{    height: hp('7%')}}>
                <ScrollView horizontal={true}>
                <Text
                style={styles.theTandoorText}>{this.state.item.location_name + ' | ' + this.state.item.group_name}</Text>
                </ScrollView>
                </View>
                <Text
                style={styles.pmText}>{tConvert(this.state.item.time)}</Text>
                </View>
                <View
                style={styles.viewFlatListViewWrapper}>
                <FlatList
                horizontal={false}
                renderItem={this.renderViewFlatListCell}
                data={this.state.friendData}
                extraData={this.state}
                ListEmptyComponent={this.showEmptyListView()}
                style={styles.viewFlatList}/>
                </View>
                </View>

                <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.modalJoinVisible}
                onRequestClose={() => {
                this.setJoinModalVisible(!this.state.modalJoinVisible);
                }}>
                <View
                style={styles.artboard2View}>
                <View
                style={{
                flexDirection: "row",
                }}>
                <TouchableOpacity
                onPress={() => {  this.setState({errorMessage: null}); this.setJoinModalVisible(!this.state.modalJoinVisible); }}
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
                onPress={() => { this.joinEvent();}}
                style={styles.icCartButton}>
                <Image
                source={require("./../assets/images/bob-2.png")}
                style={styles.buttonButtonImage}/>
                </TouchableOpacity>



                </View>
                </View>
                </View>

                <View
                style={styles.contentView}>
                <View
                style={styles.formView}>

                <View
                style={styles.edittextTextonlyPlaceholderView}>
                <Text
                style={styles.paymentText}>Your Name</Text>
                <View
                style={{
                flex: 1,
                justifyContent: "flex-end",
                }}>
                <TextInput
                placeholder="Enter Name"
                onChangeText={newName => this.setState({newName}) }
                value={this.state.newName}
                style={styles.TextTextInput}/>

                </View>
                </View>
                <View
                style={styles.edittextTextonlyPlaceholderTwoView}>
                <Text
                style={styles.paymentTwoText}>Intro</Text>
                <View
                style={{
                flex: 1,
                justifyContent: "flex-end",
                }}>
                <TextInput
                placeholder="Enter Intro"
                onChangeText={newIntro => this.setState({newIntro}) }
                value={this.state.newIntro}
                style={styles.TextTwoTextInput}/>
                </View>
                </View>

                {this.state.errorMessage &&
                <Text style={{ color: 'red', marginTop: 5}}>
                {this.state.errorMessage}
                </Text>}
                </View>
                </View>
                </View>

                </Modal>

                </Modal>

                <TextInput
                placeholder="Search groups or restaurants"
                onChangeText={text => this.searchFilterFunction(text)}
                style={styles.group5TwoTextInput}/>
                <OfflineNotice />
                <View
                style={{
                //  flex: 1,
               flexDirection: "row",
               alignItems: "flex-start"
                }}>
                {this.state.successMessage &&
                <Text style={{ color: 'green'}}>
                {this.state.successMessage}
                </Text>}
                <Text numberOfLines={1} adjustsFontSizeToFit={true}
                style={styles.group5Text}>Today's Groups</Text>

                <View
                style={{
                flex: 0.5,
                flexDirection: "row-reverse",
                marginLeft: wp('5%'),
                marginTop: hp('4%'),
                }}>
                <TouchableOpacity
                onPress={this.onCreateButtonPressed}
                disabled={this.state.loading}
                style={styles.miscBigButtonButton}>
                <Text
                style={styles.miscBigButtonButtonText}>Create</Text>
                </TouchableOpacity>
                </View>
                </View>
                
                <View
                style={styles.groupFlatListViewWrapper}>
                {this.state.loading &&<ActivityIndicator size="large" />}
                <FlatList
                keyboardShouldPersistTaps='always'
                scrollEnabled={this.state.scrollEnabled}
                horizontal={false}
                numColumns={2}
                renderItem={this.renderGroupFlatListCell}
                data={this.state.data}
                extraData={this.state}
                style={styles.groupFlatList}/>
                </View>
                
                <TouchableOpacity
                onPress={this.openReport}
                style={styles.miscReportButtonButton}>
                <Text
                style={styles.miscReportButtonButtonText}>Report</Text>
                </TouchableOpacity>
                </View>
                );
    }

}

const styles = StyleSheet.create({
                                 groupsView: {
                                 backgroundColor: 'rgb(255, 255, 255)',
                                 flex: 1,
                                 },
                                 group5Text: {
                                 backgroundColor: 'rgba(0, 0, 0, 0.0)',
                                 color: 'rgb(33, 34, 36)',
                                 fontSize: 18,
                                 fontStyle: "normal",
                                 fontWeight: "bold",
                                 // textAlign: "right",
                                 //lineHeight: 5,
                                 // letterSpacing: 0,
                                 marginLeft: wp('5%'),
                                 marginTop: hp('4%'),
                                  width: wp("88%"),
                                 },
                                 miscBigButtonButton: {
                                 backgroundColor: 'rgb(98, 179, 255)',
                                 borderRadius: 10,
                                 //  position: 'absolute',
                                 //  alignItems: "center",
                                 //  justifyContent: "center",
                                 //  marginLeft: 140,
                                 // marginTop: 35,
                                 width: wp('19%'),
                                 height: hp('3%'),
                                 },
                                 miscBigButtonButtonImage: {
                                 resizeMode: "contain",
                                 marginRight: 10,
                                 },
                                 miscBigButtonButtonText: {
                                 color: 'rgb(255, 255, 255)',
                                 fontSize: hp('2%'),
                                 fontStyle: "normal",
                                 fontWeight: "normal",
                                 textAlign: "center",
                                // justifyContent: "center",
                                 //alignSelf: "center",
                                 //flex: 1,
                                 //flexDirection: "row",
                                 },
                                 miscReportButtonButton: {
                                 borderRadius: 10,
                                 //  position: 'absolute',
                                 //  alignItems: "center",
                                 //  justifyContent: "center",
                                 marginLeft: 10,
                                 marginBottom: 10,
                                 // marginTop: 35,
                                 width: 58,
                                 height: 25,
                                 },
                                 miscReportButtonButtonText: {
                                 color: 'rgb(0, 0, 0)',
                                 fontSize: 14,
                                 fontStyle: "normal",
                                 fontWeight: "normal",
                                 textAlign: "center",
                                 justifyContent: "center",
                                 //alignSelf: "center",
                                 //flex: 1,
                                 //flexDirection: "row",
                                 },
                                 groupFlatList: {
                                 backgroundColor: 'rgba(0, 0, 0, 0.0)',
                                 width: "100%",
                                 height: "100%",
                                 },
                                 groupFlatListViewWrapper: {
                                 marginTop: hp('2%'),
                                 marginBottom: hp('3%'),
                                 alignSelf: "stretch",
                                 marginLeft: wp("4%"),
                                 marginRight: wp("4%"),
                                 flex: 1,
                                 },

                                 group5TwoTextInput: {
                                 color: 'rgb(0, 0, 0)',
                              //   fontFamily: ".SFNSText",
                                 fontSize: hp('1.8%'),
                                 fontStyle: "normal",
                                 fontWeight: "bold",
                                 textAlign: "center",
                                 letterSpacing: 0,
                                 backgroundColor: 'rgba(0, 0, 0, 0.0)',
                                 borderRadius: 17,
                                 borderWidth: 1,
                                 borderColor: 'rgb(196, 201, 223)',
                                 borderStyle: "solid",
                                 marginLeft: wp('5%'),
                                 marginRight: wp('5%'),
                                 marginTop: hp('6%'),
                                 alignSelf: "stretch",
                                 height: hp('5%'),

                                 },
                                 artboard2View: {
                                 backgroundColor: 'rgba(55, 58, 61,  0.95)',
                                height: 10000,
                                 //flex: 1,
                                 //flexDirection: "column",
                                 },
                                 icCloseButton: {
                                 backgroundColor: 'rgba(0, 0, 0, 0.0)',
                                 shadowColor: 'rgba(0, 0, 0, 0.10594995)',
                                 shadowRadius: 3,
                                 shadowOpacity: 1,
                                 flexDirection: "row",
                                 alignItems: "center",
                                 justifyContent: "center",
                                 marginLeft: wp('7%'),
                                 marginTop: hp('6%'),
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
                                   flexDirection: "row",
                                   alignItems: "center",
                                   justifyContent: "center",
                                   alignSelf: "flex-end",
                                 //  position: "absolute",
                                   //marginLeft: wp('12%'),
                                   marginRight: wp('3%'),
                                   marginTop: hp('5%'),
                                 //  marginRight: wp('1%'),
                                   width: 60,
                                   height: 60,
                                 },
                                 icCartButtonImage: {
                                   width: 60,
                                   height: 60,
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
                                 height: 150,
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
                                 paymentText: {
                                 color: 'rgb(0, 0, 0)',
                                 fontSize: hp('1.5%'),
                                 fontStyle: "normal",
                                 fontWeight: "normal",
                                 textAlign: "left",
                                 letterSpacing: 0.34,
                                 backgroundColor: 'rgba(0, 0, 0, 0.0)',
                                 // marginRight: 236,
                                 //width: 75,
                                 //height: 16,
                                 },
                                 edittextTextonlyPlaceholderTwoView: {
                                 backgroundColor: 'rgba(0, 0, 0, 0.0)',
                                 marginTop: 7,
                                 alignSelf: "stretch",
                                 height: 48,                                 },
                                 paymentTwoText: {
                                 color: 'rgb(0, 0, 0)',
                                 fontSize: hp('1.5%'),
                                 fontStyle: "normal",
                                 fontWeight: "normal",
                                 textAlign: "left",
                                 letterSpacing: 0.34,
                                 backgroundColor: 'rgba(0, 0, 0, 0.0)',
                                 // marginRight: 274,
                               //  width: 37,
                                 //height: 16,
                                 },
                                 TextTwoTextInput: {
                                 color: 'rgb(74, 74, 74)',
                                 fontSize: hp('2.5%'),
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
                                 fontSize: hp('2.5%'),
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
                                 marginTop: hp('1.5%'),
                                 alignSelf: "stretch",
                                 height: hp('5%'),
                                 },
                                 paymentThreeText: {
                                 color: 'rgb(0, 0, 0)',
                                 fontSize: hp('1.5%'),
                                 fontStyle: "normal",
                                 fontWeight: "normal",
                                 textAlign: "left",
                                 letterSpacing: 0.34,
                                 backgroundColor: 'rgba(0, 0, 0, 0.0)',
                                 // marginRight: 282,
                                 // width: 29,
                                 // height: 16,
                                 },
                                 TextThreeTextInput: {
                                 color: 'rgb(74, 74, 74)',
                                 fontSize: hp('2%'),
                                 fontStyle: "normal",
                                 fontWeight: "normal",
                                 textAlign: "left",
                                 // lineHeight: 0,
                                 letterSpacing: 0.34,
                                 backgroundColor: 'rgba(0, 0, 0, 0.0)',
                                 // marginRight: 6,
                                 alignSelf: "stretch",
                                 // padding: 0,
                                 // margin: 0,
                                 borderWidth: 0,
                                 },
                                 menuView: {
                                 backgroundColor: 'rgba(55, 58, 61, 0.95)',
                                 flex: 1,
                                 // flexDirection: "column",
                                 },
                                 buttonButton: {
                                  backgroundColor: 'rgba(0, 0, 0, 0.0)',
                                  shadowColor: 'rgba(0, 0, 0, 0.10594995)',
                                  shadowRadius: 3,
                                  shadowOpacity: 1,
                                  flexDirection: "row",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  marginLeft: wp('7%'),
                                  marginTop: hp('6%'),
                                  width: 60,
                                  height: 60,
                                  },
                                  buttonButtonText: {
                                  color: 'rgb(255, 255, 255)',
                                  fontSize: 12,
                                  fontStyle: "normal",
                                  fontWeight: "normal",
                                  textAlign: "left",
                                  letterSpacing: 0,
                                  width: 60,
                                  height: 60,
                                  },
                                  buttonButtonImage: {
                                  width: 60,
                                  height: 60,
                                  },
                                  buttonTwoButton: {
                                  flexDirection: "row",
                                  alignItems: "center",
                                  justifyContent: "center",
                                //  alignSelf: "flex-end",
                                //  position: "absolute",
                                  marginLeft: wp('52%'),
                                  //marginRight: wp('1%'),
                                  marginTop: hp('6%'),
                                //  marginRight: wp('1%'),
                                  width: 60,
                                  height: 60,
                                  },
                                  buttonTwoButtonText: {
                                  fontSize: 12,
                                  fontStyle: "normal",
                                  fontWeight: "normal",
                                  textAlign: "left",
                                  letterSpacing: 0,
                                  width: 60,
                                  height: 60,
                                  },
                                  buttonTwoButtonImage: {

                                  width: 60,
                                  height: 60,
                                  },
                                 restHeaderView: {
                                 backgroundColor: 'rgb(255, 255, 255)',
                                 marginTop: 36,
                                 alignSelf: "stretch",
                                 height: hp('15%'),
                                 },
                                 theTandoorText: {
                                 color: 'rgb(55, 58, 61)',
                                 fontSize: wp('6%'),
                                 fontStyle: "normal",
                                 fontWeight: "normal",
                                 textAlign: "left",
                                 letterSpacing: 0,
                                 backgroundColor: 'rgba(0, 0, 0, 0.0)',
                                 marginLeft: 20,
                                 marginTop: hp('3%'),
                                 //width: 318,
                                 height: hp('7%'),
                                 },
                                 pmText: {
                                 color: 'rgb(113, 118, 122)',
                                 fontSize: hp('2%'),
                                 fontStyle: "normal",
                                 fontWeight: "normal",
                                 textAlign: "left",
                                 letterSpacing: 0,
                                 backgroundColor: 'rgba(0, 0, 0, 0.0)',
                                 marginLeft: 20,
                                 //width: 74,
                                 marginTop: hp('1%'),

                                 height: hp('3%'),
                                 },

                                 viewFlatList: {
                                 backgroundColor: 'rgb(246, 246, 246)',
                                 width: "100%",
                                 height: "100%",

                                 },
                                 viewFlatListViewWrapper: {
                                 marginLeft: -3,
                                 marginRight: 3,
                                // flex: 1,
                                 },
                                 })
