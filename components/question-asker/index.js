import React, { useState, useEffect,useRef } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import ParticipatingSpirit from '../participating-spirit';

const QuestionAsker = props => {
  const counter=useRef(0);
  const [questions, setQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState({ id: -1, text: '' });
  const [customQuestionText, setCustomQuestionText] = useState('');
  const [error, setError] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
 

  //save the player's question choice
  const selectQuestion = (index, question) => {
    setSelectedQuestion({ id: index, text: question });
  };

  //write the askQuestion function here
  const askQuestion = () => {
    let questionText = '';
    if (customQuestionText.length > 0) {
      questionText = customQuestionText;
    } else if (selectedQuestion.text.length > 0) {
      questionText = selectedQuestion.text;
    }

    if (questionText.length > 0) {
      firestore().collection("ao-games").doc(props.GameID).update({
        question: questionText,
      })
      .catch(err => {
        let friendlyError = { friendly: "Something has gone horribly wrong.", technical: err.toString() };
        setError(() => { throw friendlyError });
      });
    }
  };

  //update the customQuestionText if the player writes a custom question
  const doCustomQuestion = text => {
    setCustomQuestionText(text);
    if (selectedQuestion.id !== -1) {
      setSelectedQuestion({ id: -1, text: '' });
    }
  };
  

  //write the useEffect here
  useEffect(() => {
    if ((props.GameData !== undefined) && (props.GameData.questionAsker.uid === props.auth.uid) && (props.GameData.question === "")) {
      setSelectedQuestion({ id: -1, text: "" });
      
      setCustomQuestionText("");
      const getQuestions = async() => {
        let someQuestions = [];
        while ((someQuestions.length < 3) && (counter.current<150))
        {
          let alreadyPicked = false;
          let key = firestore()
              .collection("ao-questions")
              .doc()
              .id;
          let potentialQuestion = "";
          let dbQuestion = await firestore().collection("ao-questions").where(firebase.firestore.FieldPath.documentId(), ">=", key).limit(1).get();
          counter.current +=1;
          if (dbQuestion.size > 0) {
            dbQuestion.forEach(q => {
              if (q.data().genre === selectedGenre){
              //wrap below statement in an if condition that checks q.data().genre is equal to selectedGenre
              potentialQuestion = q.data().questionText;}
            });
          } else {
            dbQuestion = await firestore().collection("ao-questions").where(firebase.firestore.FieldPath.documentId(), '<', key).limit(1).get();
            counter.current +=1;
            if (dbQuestion.size > 0) {
            dbQuestion.forEach(q => {
              if (q.data().genre === selectedGenre){
              //wrap below statement in an if condition that checks q.data().genre is equal to selectedGenre
              potentialQuestion = q.data().questionText;}
            });
          }
          someQuestions.forEach(question => {
            if (question === potentialQuestion) {
              alreadyPicked = true;
            }
          });
          if (!alreadyPicked) {
            someQuestions.push(potentialQuestion);
          }
        }
        setQuestions(someQuestions);
        console.log(someQuestions);
        console.log(counter.current);
      }
      getQuestions();
    }
  }}, [props.GameData,selectedGenre]);
  



  //show the question list if no question has been asked
  if ((selectedGenre === "") ){
    return (
      <View style={props.styles.aoGameContainer}>
        <View style={props.styles.aoGameInnerContainer}>
          <View style={props.styles.aoLobbyContainer}>
            <View style={props.styles.aoLobbyInnerContainer}>
              <Text style={props.styles.aoHeadline}>
                {"Mortal, which genre shall the Spirits answer?"}
              </Text>
              <View style={{display: "flex", flexDirection: "column", marginTop: 36, alignItems: "center", justifyContent: "flex-start", width: "100%"}}>
                  <TouchableOpacity style={props.styles.aoQuestionRow} onPress={() => setSelectedGenre("only-with-friends")}>
                    <Text style={props.styles.aoQuestionText}>
                     only-with-friends
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={props.styles.aoQuestionRow}  onPress={() => setSelectedGenre("family-friendly")}>
                    <Text style={props.styles.aoQuestionText}>
                    family-friendly
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={ props.styles.aoQuestionRow}  onPress={() => setSelectedGenre("office-friendly")}>
                    <Text style={props.styles.aoQuestionText}>
                    office-friendly
                    </Text>
                  </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }

  if ((props.GameData !== undefined) && (props.GameData.question === "")) {
    return (
      <View style={props.styles.aoGameContainer}>
        <View style={props.styles.aoGameInnerContainer}>
          <View style={props.styles.aoLobbyContainer}>
            <View style={props.styles.aoLobbyInnerContainer}>
              <Text style={props.styles.aoHeadline}>
                {"Mortal, which query shall the Spirits answer?"}
              </Text>
              <View style={{display: "flex", flexDirection: "column", marginTop: 36, alignItems: "center", justifyContent: "flex-start", width: "100%"}}>
                {questions.map((question, index) => (
                  <TouchableOpacity style={selectedQuestion.id === index ? props.styles.aoQuestionRowSelected : props.styles.aoQuestionRow} key={index} onPress={() => selectQuestion(index, question)}>
                    <Text style={props.styles.aoQuestionText}>
                      {question}
                    </Text>
                  </TouchableOpacity>
                ))}
                <TextInput style={{...props.styles.aoTextbox, marginHorizontal: 12, width: "100%"}} value={customQuestionText} onChangeText={text => doCustomQuestion(text)} placeholder="Ask your own question..." />
              </View>
            </View>
            <TouchableOpacity style={((selectedQuestion.id !== -1) || (customQuestionText.length > 0)) ? props.styles.aoPrimaryButton : props.styles.aoPrimaryButtonDisabled} onPress={() => askQuestion()}>
              <Text style={props.styles.aoPrimaryButtonText}>
                {"Ask Your Question"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  //once the question has been asked, show the spirits answering the question
  if ((props.GameData !== undefined) && (props.GameData.question !== '')) {
    return (
      <ParticipatingSpirit styles={props.styles} GameID={props.GameID} GameData={props.GameData} />
    );
  }

  //if all else fails, show nothing
  return null;
};

export default QuestionAsker;
