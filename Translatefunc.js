import { useState } from 'react';
import axios from 'axios';
import 'react-native-get-random-values';
export default function Translate(text) {
 
  const { v4: uuidv4 } = require('uuid');

  var subscriptionKey = "2a2474abcf4649adb4d6c14eb29460f3";
  var endpoint = "https://api.cognitive.microsofttranslator.com";
  var location = "eastus";
  
  var transltedTxt='initial';


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
   // setTxtList(currentList => [...txtList,response.data[0].translations[0].text]);
   // setTransltedTxt(response.data[0].translations[0].text);
   transltedTxt=response.data[0].translations[0].text;
  })

return transltedTxt;

}


