import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import auth from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';

const Result = props => {
  const [currentStep, setCurrentStep] = useState('intro');
  

  


  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={props.styles.aoGameContainer}>
        <View style={props.styles.aoGameInnerContainer}>
          <Image style={props.styles.aoGreetingsImage} source={require('./img/player1.png')} resizeMode={"contain"} />
          
          <View style={props.styles.aoGameBar}>
            {currentStep === 'intro' ? (
              <>
                <Text style={props.styles.aoGameTitle}>
                  {"Winner is:"}  {props.GameData.winner}
                </Text>
               
              </>
            ) : (
              null
            )}

            
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Result;
