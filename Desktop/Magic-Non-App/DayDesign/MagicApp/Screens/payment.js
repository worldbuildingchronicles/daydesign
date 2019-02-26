
import React, { Component } from 'react';
import { View } from 'react-native';
import stripe from 'tipsi-stripe';


stripe.setOptions({
                  publishableKey: 'pk_test_ihRia1aLHxyCBjEMl0p7oqNk',
                  });

const theme = {
primaryBackgroundColor: '##FFFFFF',
secondaryBackgroundColor: '#f0f0f0',
primaryForegroundColor: '#3e8be1',
secondaryForegroundColor: '#76a9e3',
accentColor: '#4286f4',
errorColor: '#e12020'
};


export default class NewCardPage extends Component {
    componentDidMount() {
        
        const options = {
        smsAutofillDisabled: true,
            theme
        };
        stripe.paymentRequestWithCardForm(options)
        .then(response => {
              this.props.navigation.navigate("Menu")
              // Get the token from the response, and send to your server
              })
        .catch(error => {
               // Handle error
               });
    }
    
    render() {
        return <View />
    }
    
}
