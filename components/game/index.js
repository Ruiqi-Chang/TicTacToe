import React, { useState, useEffect,useRef } from 'react';
import { View, Text, TouchableOpacity, Image,TextInput,StatusBar,ScrollView,StyleSheet, SafeAreaView} from 'react-native';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import  styles from '../stylesheet';
import auth from '@react-native-firebase/auth'


const game = props => {
  const counter=useRef(0);
  const [One, setSquareone] = useState("");
  const [Two, setSquaretwo] = useState("");
  const [Three, setSquarethree] = useState("");
  const [Four, setSquarefour] = useState("");
  const [Five, setSquarefive] = useState("");
  const [Six, setSquaresix] = useState("");
  const [Seven, setSquareseven] = useState("");
  const [Eight, setSquareeight] = useState("");
  const [Nine, setSquarenine] = useState("");
  const [player,setplayer]=useState(false);
  const [gameStatus,setgameStatus]=useState("X turn");
  const [error, setError] = useState('');
  const [gameround, setgameround] = useState(1);
  const [status,setstatus]=useState("Playing");
  const [xroundoutcome, setxroundoutcome] = useState(0);
  const [oroundoutcome, setoroundoutcome] = useState(0);
  const [winner,setwinner]=useState("");
 
  
  const updatePlayer = () => {
    if (player === false){
      setplayer(true)
      setgameStatus("O turn")
    } else {
      setplayer(false)
      setgameStatus("X turn")
    }
  }

  const clickSquareOne = ()=>{
    checkWin();
    if(player === false){
    setSquareone("X");
    updatePlayer();
        
  }else{
      setSquareone("O");
      updatePlayer();
    }
    
  }
  const clickSquareTwo = ()=>{
    checkWin();
    if(player === false){
    setSquaretwo("X");
    updatePlayer();
        
  }else{
      setSquaretwo("O");
      updatePlayer();
    }
    checkWin();
  }
  const clickSquareThree = ()=>{
    checkWin();
    if(player === false){
    setSquarethree("X");
    updatePlayer();
        
  }else{
      setSquarethree("O");
      updatePlayer();
    }
    checkWin();
  }
  const clickSquareFour = ()=>{
    checkWin();
    if(player === false){
    setSquarefour("X");
    updatePlayer();
        
  }else{
      setSquarefour("O");
      updatePlayer();
    }
    checkWin();
  }
  const clickSquareFive = ()=>{
    checkWin();
    if(player === false){
    setSquarefive("X");
    updatePlayer();
        
  }else{
      setSquarefive("O");
      updatePlayer();
    }
    checkWin();
  }
  const clickSquareSix = ()=>{
    checkWin();
    if(player === false){
    setSquaresix("X");
    updatePlayer();
        
  }else{
      setSquaresix("O");
      updatePlayer();
    }
    checkWin();
  }
  const clickSquareSeven = ()=>{
    checkWin();
    if(player === false){
    setSquareseven("X");
    updatePlayer();
        
  }else{
      setSquareseven("O");
      updatePlayer();
    }
    checkWin();
  }
  const clickSquareEight = ()=>{
    checkWin();
    if(player === false){
    setSquareeight("X");
    updatePlayer();
        
  }else{
      setSquareeight("O");
      updatePlayer();
    }
    checkWin();
  }
  const clickSquareNine = ()=>{
    checkWin();
    if(player === false){
    setSquarenine("X");
    updatePlayer();
        
  }else{
      setSquarenine("O");
      updatePlayer();
    }
    checkWin();
  }
  
  const numberround=(oroundoutcome,xroundoutcome)=>{
    checkWin();
    setgameround(gameround+1)
    console.log(gameround)
      if (gameround>8){
        setgameround("9 round end")
        setstatus("Check who win")
        if(oroundoutcome>xroundoutcome){
            setwinner("O is winner")
        }
        if (oroundoutcome<xroundoutcome){
            setwinner("X is winner")
        }
        return firestore().collection("tt-game").doc(props.GameID).update({
            status: "Check who win",
            ooutcome:oroundoutcome,
            xoutcome:xroundoutcome,
            winner: winner,
          })
      }
     

      
      

  }

  const roundoutcome=()=>{
    if (gameStatus==="X wins") {
        setxroundoutcome(xroundoutcome+1)
      }
    if (gameStatus==="O wins") {
        setoroundoutcome(oroundoutcome+1)
      }

  }
  const refreshGame = () => {
    setSquareone('');
    setSquaretwo('');
    setSquarethree('');
    setSquarefour('');
    setSquarefive('');
    setSquaresix('');
    setSquareseven('');
    setSquareeight('');
    setSquarenine('');
    numberround();
  }
 

  const checkWin = () => {
    if(One===Two && Two===Three &&
        One!=="" && Two!=="" && Three!=="" ){
      if(One==="X"){
        setgameStatus("X wins")
        
      } else {
        setgameStatus("O wins")
        
      }
      roundoutcome()
    }
    // Wins with 456
    else if(Four===Five  && Five===Six && 
            Four!=="" && Five!=="" && Six!=="" ){
      if(Four==="X"){
        setgameStatus("X wins")
        
      } else {
        setgameStatus("O wins")
     
      }
      roundoutcome()
    }
    // Wins with 789
    else if(Seven===Eight  && Eight===Nine && 
            Seven!=="" && Eight!=="" && Nine!=="" ){
      if(Seven==="X"){
        setgameStatus("X wins")
      
      } else {
        setgameStatus("O wins")
        
      }
      roundoutcome()
    }
    // Wins with 147
    else if(One===Four  && Four===Seven && 
            One!=="" && Four!=="" && Seven!=="" ){
      if(Seven==="X"){
        setgameStatus("X wins")
      } else {
        setgameStatus("O wins")
      }
      roundoutcome()
    }
    // Wins with 258
    else if(Two===Five  && Five===Eight && 
            Two!=="" && Five!=="" && Eight!=="" ){
      if(Two==="X"){
        setgameStatus("X wins")
        
      } else {
        setgameStatus("O wins")
        
      }
      roundoutcome()
    }
    // Wins with 369
    else if(Three===Six  && Six===Nine && 
           Three!=="" && Six!=="" && Nine!=="" ){
      if(Three==="X"){
        setgameStatus("X wins")
        
      } else {
        setgameStatus("O wins")
        
      }
      roundoutcome()
    }
    // Wins with 159
    else if(One===Five  && Five===Nine && 
            One!=="" && One!=="" && Nine!=="" ){
      if(One==="X"){
        setgameStatus("X wins")
        
      } else {
        setgameStatus("O wins")
        
      }
      roundoutcome()
    }
    // Wins with 357
    else if(Three===Five  && Five===Seven && 
            Three!=="" && Five!=="" && Seven!=="" ){
      if(Three==="X"){
        setgameStatus("X wins")
        
      } else {
        setgameStatus("O wins")
      }
      roundoutcome()
    }
  }

   /*const getMyself = () => {
    for (var x=0; x<props.GameData.players.length;x++) {
      if (props.GameData.players[x].uid === props.Auth().currentUser.uid) {
        return (
          <View
            style={{...styles.userContainer,
                marginLeft: 6
            }}
            key={props.GameData.players[x].uid}>
            <Image
              source={{uri: props.GameData.players[x].photoURL}}
              style={props.styles.aoPlayerRowAvatar}
            />
            <Text style={props.styles.aoPlayerRowName}>
              {props.GameData.players[x].displayName}
            </Text>
    
            
          </View>
        )
      }
    }
  }*/
  
    return(
        <SafeAreaView>
        <View style={props.styles.aoGameContainer}>
            <View style={props.styles.aoGameInnerContainer}>
                <View style={props.styles.aoLobbyContainer}>
                <Text style={props.styles.aoGameCode}>
                {"Room Code: "}{props.GameData.gameCode}
                </Text>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.scrollViewStyles} contentContainerStyle={styles.scrollViewContainer}>
                {props.GameData.players.map((player, index) => (
                <View key={index}>
                  <Image source={{uri: 'data:image/png;base64, ' + player.avatar}} style={props.styles.aoPlayerRowAvatar} />
                  <Text style={props.styles.aoPlayerRowName}>
                    {player.displayName}
                  </Text>
                </View>
              ))}
              </ScrollView>
       
                    <View style={props.styles.playdisplay}>
                        <Text style={props.styles.gametext}>
                            round:{gameround}
                         </Text>
                        <View style={props.styles.buttonRow}>
                        <TouchableOpacity style={props.styles.block} onPress={clickSquareOne}>
                        <Text style={props.styles.blockX}>{One}</Text>
                        </TouchableOpacity>
            
                        <TouchableOpacity style={props.styles.block} onPress={clickSquareTwo}>
                        <Text style={props.styles.blockX}>{Two}</Text>
                        </TouchableOpacity>
            
                        <TouchableOpacity style={props.styles.block} onPress={clickSquareThree}>
                        <Text style={props.styles.blockX}>{Three}</Text>
                        </TouchableOpacity>
                        </View>
            
                        <View style={props.styles.buttonRow}>
                        <TouchableOpacity style={props.styles.block} onPress={clickSquareFour}>
                        <Text style={props.styles.blockX}>{Four}</Text>
                        </TouchableOpacity>
            
                        <TouchableOpacity style={props.styles.block} onPress={clickSquareFive}>
                        <Text style={props.styles.blockX}>{Five}</Text>
                        </TouchableOpacity>
            
                        <TouchableOpacity style={props.styles.block} onPress={clickSquareSix}>
                        <Text style={props.styles.blockX}>{Six}</Text>
                        </TouchableOpacity>
                        </View>
            
                        <View style={props.styles.buttonRow}>
                        <TouchableOpacity style={props.styles.block} onPress={clickSquareSeven}>
                        <Text style={props.styles.blockX}>{Seven}</Text>
                        </TouchableOpacity>
            
                        <TouchableOpacity style={props.styles.block} onPress={clickSquareEight}>
                        <Text style={styles.blockX}>{Eight}</Text>
                        </TouchableOpacity>
            
                        <TouchableOpacity style={props.styles.block} onPress={clickSquareNine}>
                        <Text style={props.styles.blockX}>{Nine}</Text>
                        </TouchableOpacity>
                        </View>

                        
                        <Text style={props.styles.gametext}>
                          {gameStatus} </Text>
                        <TouchableOpacity style={props.styles.aoPrimaryButton} onPress={refreshGame}>
                            <Text style={props.styles.aoPrimaryButtonText}>
                            {"Restart"}
                            </Text>
                        </TouchableOpacity>
                        </View>
        
            
                        
                    </View>
                </View>
            </View>
                    

        </SafeAreaView>

  
  
    
    );
 


 
};
export default game
