// const axios = require('axios');

// const apiKey = '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';
// const apiUrl = 'https://api.openai.com/v1/engines/davinci/completions';

// const headers = {
//   'Content-Type': 'application/json',
//   'Authorization': `Bearer ${apiKey}`
// };

// const completionPrompt = "I am working on a project to train a model on STAR question and answers asked in behavorial interviews. I need a dataset comprising of example questions and answers. I want the model to distinguish between good , medium and bad answers to STAR questions. Give me a bad answer example along with question which is not at all specific in highlighting some real life work done and does not include ay numbers or details to to maximise the specificity. Answer should be atlest 8-10 sentences .";
// const data = {
//  // model: 'text-davinci-003',
//  model : 'gpt-3.5-turbo-instruct',
//   prompt: completionPrompt,
//   max_tokens:500,
//   //temperature:0.5,
//   //top_p:1
// };

// axios.post(apiUrl, data, { headers })
//   .then(response => {
//     if (response.status === 200) {
//       const completionText = response.data.choices;
//       console.log(completionText);
//     } else {
//       console.log('Request failed with status code:', response);
//     }
//   })
//   .catch(error => {
//     console.error('Error making API request:', error);
//   });
  
const axios = require('axios')
const { createObjectCsvWriter } = require('csv-writer');
const fs = require('fs');

async function test()
{
        try {
        let url = 'https://api.openai.com/v1/completions'

        let prompt = `I am working on a project to train a model on STAR question and answers asked in behavorial interviews. I need a dataset comprising of example questions and answers. I want the model to distinguish between good , medium and bad answers to STAR questions. Give me 10 question answer pairs with bad answer examples which is not at all specific in highlighting some real life work done and does not include ay numbers or details to to maximise the specificity. Answer should be atlest 8-10 sentences long. Output like this 
        Question : 
        Answer:` 
        let data = {
            model: 'text-davinci-003',
            prompt: prompt,
            max_tokens: 3000,
            temperature:0.5,
            top_p:0.1
          }

        const options = {
            headers: {
                Authorization : `Bearer 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`
            }
        }
        let response = await axios.post(url,data,options);
        let res = response.data.choices[0].text;
        let final = res.split('\n').filter((item) => item !== "");
        let concatenatedStrings = [];
        // for(let i=0 ; i<final.length ; i++){
        //     concatenatedStrings.push(final[i] + final[i+1]);
        // }
        for (let i = 0; i < final.length; i++) {
            if (i + 1 < final.length) {
              concatenatedStrings.push(final[i] + final[i + 1]);
            }
            if (i + 3 < final.length) {
              concatenatedStrings.push(final[i + 2] + final[i + 3]);
            }
          }

        console.log(concatenatedStrings);
    
       const sendDataToCsa = [
         //{prompt : JSON.stringify({ prompt : res }) }, 
         {prompt : final}
      ];

      const csvWriter = createObjectCsvWriter({
        path: 'Bad_answers.csv',
        header: [
          { id: 'prompt', title: 'prompt' },
        //   { id: 'completion', title: 'completion' },
        //   { id: 'type', title: 'typr' },
        ]
      });

      csvWriter.writeRecords(sendDataToCsa)
            .then(() => {
                console.log('CSV file has been written successfully');
            })
            .catch((err) => {
                console.error('Error writing CSV file:', err);
            });

    } catch (error) {
        console.log(error)
    }
}
test();




