import React, { PureComponent } from 'react';
import { View, Text, NetInfo, Dimensions, StyleSheet, Platform } from 'react-native';
import { isIphoneX } from 'react-native-iphone-x-helper'

const { width } = Dimensions.get('window');

function MiniOfflineSign() {
  if (!isIphoneX()) {
    return (
      <View style={styles.offlineContainer}>
        <Text style={styles.offlineText}>No Internet Connection</Text>
      </View>
    );
  }
  else {
    return (
      <View style={styles.offlineContainerIOS}>
        <Text style={styles.offlineText}>No Internet Connection</Text>
      </View>
    );
  }

}

class OfflineNotice extends PureComponent {
  state = {
    isConnected: true
  };

  _isMounted = false

  componentDidMount() {
      this._isMounted = true;
    NetInfo.isConnected.fetch().then(isConnected => {
      console.log('First, is ' + (isConnected ? 'online' : 'offline'));
      if(this._isMounted){
          this.setState({isConnected});
      }
    });

    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
  }

  componentWillUnmount() {
    this._isMounted = false;
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
  }

  handleConnectivityChange = isConnected => {
    if (isConnected) {
      this.setState({ isConnected });
    } else {
      this.setState({ isConnected });
    }
  };

  render() {

    if (!this.state.isConnected) {
      return <MiniOfflineSign />;
    }
    return null;


  }
}

const styles = StyleSheet.create({
  offlineContainer: {
    backgroundColor: '#b52424',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width,
    position: 'absolute',
    top: 0
  },
  offlineContainerIOS: {
    backgroundColor: '#b52424',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width,
    position: 'absolute',
    top: 30
  },
  offlineText: { color: '#fff' }
});

export default OfflineNotice;
