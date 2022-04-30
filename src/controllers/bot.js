const OpenAI = require('openai-api');
const Message = require('../models/message');

const { response } = require('express');

// Load your key from an environment variable or secret management service
// (do not include your key directly in your code)
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const openai = new OpenAI(OPENAI_API_KEY);

// const { Configuration, OpenAIApi } = require("openai");

// const configuration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// });
// const openai = new OpenAIApi(configuration);

// const response = await openai.createCompletion("text-davinci-002", {
//   prompt: "La siguiente es una conversación entre un niño y un ajolote. El ajolote es sabio en el ambito de la salud, especialmente diabetes, es atento, cariñoso y cortés\n\nNiño: Holaa\nAjolote: Hola, mi nombre es Yolotl. Como estas?\nNiño: Un poco mal, me duele la cabeza :(\nAjolote: Aww pobrecito, dime, ¿sientes hambre o fatiga?\nNiño: Sí...\nAjolote: Tal vez sea tu nivel de azúcar en sangre\nNiño: Hola\nAjolote: \n\nHola, mi nombre es Yolotl. Como estas?\nNiño: Bien, aunque tengo hambre\nAjolote: \n\nEntiendo, cuando tienes hambre significa que tu nivel de azúcar en sangre está bajo. Te recomiendo comer algo dulce para aumentarlo.\nNiño: hola\nAjolote: \n\nHola, mi nombre es Yolotl. Como estas?\nNiño: ",
//   temperature: 0.9,
//   max_tokens: 150,
//   top_p: 1,
//   frequency_penalty: 0.5,
//   presence_penalty: 0.6,
//   stop: ["Niño:", "Ajolote:"],
// });

const getCompletion = async (req, res = response) => {

    try {

        const {text, userId} = req.body;

        let prompt =`La siguiente es una conversación entre un niño y un ajolote. El ajolote es sabio en el ambito de la salud, especialmente diabetes, es atento, cariñoso y cortés\n\

        Niño: Holaa\n\
        Ajolote: Hola, mi nombre es Yolotl. Como estas?\n\
        Niño: Un poco mal, me duele la cabeza :(\n\
        Ajolote: Aww pobrecito, dime, ¿sientes hambre o fatiga?\n\
        Niño: Sí...\n\
        Ajolote: Tal vez sea tu nivel de azúcar en sangre\n\
        `;

        const message = new Message({
            "from": userId,
            "to": "chatbot",
            "text": text

        });
        await message.save();

        console.log(`${text}`);

        prompt += `Niño: ${text}\n`;
     
            const gptResponse = await openai.complete({
                engine: 'davinci',
                prompt: prompt,
                maxTokens: 60,
                temperature: 0.3,
                topP: 0.3,
                presencePenalty: 0,
                frequencyPenalty: 0.5,
                bestOf: 1,
                n: 1,
                stream: false,
                stop: ['\n', '\n\n']
            });
 
            prompt += `${gptResponse.data.choices[0].text}\n`;
        

        // const gptResponse = await openai.complete({
        //     engine: 'davinci',
        //     prompt: `${text}`,
        //     temperature: 0.9,
        //     max_tokens: 150,
        //     top_p: 1,
        //     frequency_penalty: 0.5,
        //     presence_penalty: 0.6,
        //     stop: ['']

        // });

        const data = gptResponse.data;


        const message2 = new Message({
            "from": "chatbot",
            "to": userId,
            "text": data.choices[0].text.trim().replace("Ajolote: ",'')
        });
        await message2.save();

        return res.json({
            data
        });


    } catch(error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }


}


module.exports = {
    getCompletion,
}