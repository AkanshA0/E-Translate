import React, { Component } from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Button
} from 'react-native'
import axios from 'axios';
import 'react-native-get-random-values';
import Voice from '@react-native-community/voice';
import Tts from 'react-native-tts';
import { Picker } from '@react-native-picker/picker'

//import Translate from './Translatefunc';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
       recognized: '',
       started: '',
       speechState: '',
       results: '',
       transltedTxt: '',
       language: 'hi-IN'
   };
        Tts.setDefaultLanguage('en-IE');
        Voice.onSpeechStart = this.onSpeechStart.bind(this)
        Voice.onSpeechRecognized = this.onSpeechRecognized.bind(this)
        Voice.onSpeechResults = this.onSpeechResults.bind(this) 
    }
    changeLang = (lang) => {
      this.setState({ language: lang })
   }
  onSpeechStart(e) {
    this.setState({
      speechState: 'Start Speaking',
    });
  }
  onSpeechRecognized(e) {
    this.setState({
      recognized: 'done',
    });
  }
  setTranslatedText(txt){
    this.setState({
      transltedTxt: txt,
    });
  }
  translate(text) {
 
    const { v4: uuidv4 } = require('uuid');
  
    var subscriptionKey = "2a2474abcf4649adb4d6c14eb29460f3";
    var endpoint = "https://api.cognitive.microsofttranslator.com";
    var location = "eastus";
    var self = this;
      axios({
      baseURL: endpoint,
      url: '/translate',
      method: 'post',
      headers: {
          'Ocp-Apim-Subscription-Key': subscriptionKey,
          'Ocp-Apim-Subscription-Region': location,
          'Content-type': 'application/json',
          'X-ClientTraceId': uuidv4().toString()
      },
      params: {
          'api-version': '3.0',
          'to': ['en'],
      },
      data: [{
          'text': text
      }],
      responseType: 'json'
    }).then(function(response){
      console.log(response.data[0].translations[0].text);
      self.setTranslatedText(response.data[0].translations[0].text);
      //alert("Translated text: "+self.state.transltedTxt);
      Tts.speak(response.data[0].translations[0].text);
    })
  
  }

  onSpeechResults(e) {
    this.setState({
      results: e.value[0],
      speechState: e.value[0],
    });
    this.translate(this.state.results)
  }

  async _startRecognition(e) {
    this.setState({
      recognized: '',
      started: '',
      speechState: '',
      results: '',
      transltedTxt: ''
    });
    try {
      await Voice.start(this.state.language);
    } catch (e) {
      console.error(e);
    }
  }

  render() {
    return (
      <View>
        <Picker style={styles.picker} selectedValue = {this.state.language} onValueChange = {this.changeLang}>
            <Picker.Item label = "Hindi" value = "hi-IN" />
            <Picker.Item label = "French" value = "fr-FR" />
            <Picker.Item label = "German" value = "de-DE" />
            <Picker.Item label = "Spanish" value = "es-ES" />
            <Picker.Item label = "Gujarati" value = "gu-IN" />
            <Picker.Item label = "Malayalam" value = "ml-IN" />
            <Picker.Item label = "Marathi" value = "mr-IN" />
            <Picker.Item label = "Punjabi" value = "pa-IN" />
         </Picker>
        <Button onPress={this._startRecognition.bind(this)}
        title="Click to Speak"></Button>
        <Text style={styles.text}> {this.state.speechState}</Text>
        <Text style = {styles.translatedText}>{this.state.transltedTxt}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  picker:{
    marginTop: 10,
  },
  text: {
    fontSize: 20,
    alignSelf: 'center',
    marginTop: 20,
    color: 'red'
 },
 translatedText: {
  fontSize: 20,
  alignSelf: 'center',
  marginTop: 10,
  color: 'green'
}


})


export default App;