const OpenAI = require('openai-api');
const { response } = require('express');

// Load your key from an environment variable or secret management service
// (do not include your key directly in your code)
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const openai = new OpenAI(OPENAI_API_KEY);


const getCompletion = async (req, res = response) => {

    try {

        const { text } = req.body;

        console.log(`${text}`);


        const gptResponse = await openai.complete({
            engine: 'davinci',
            prompt: `La siguiente es una conversación entre un niño y un ajolote. El ajolote es sabio en el ambito de la salud, especialmente diabetes, es atento, cariñoso y cortés/n/nNiño: Holaa/nAjolote: Hola, mi nombre es Yolotl. Como estas?/nNiño: Un poco mal, me duele la cabeza :(/nAjolote: Aww pobrecito, dime, ¿sientes hambre o fatiga?/nNiño: Sí.../nAjolote: Tal vez sea tu nivel de azúcar en sangre/nNiño: Hola/nAjolote: /n/nHola, mi nombre es Yolotl. Como estas?/nNiño: Bien, aunque tengo hambre/nAjolote: /n/nEntiendo, cuando tienes hambre significa que tu nivel de azúcar en sangre está bajo. Te recomiendo comer algo dulce para aumentarlo./nNiño: hola/nAjolote: /n/nHola, mi nombre es Yolotl. Como estas?/nNiño: ${text}`,
            temperature: 0.9,
            max_tokens: 200,
            top_p: 1,
            frequency_penalty: 0.5,
            presence_penalty: 0.6,
            stream: false,
            stop: ["Niño:", "Ajolote:", "/n"],
          });

        const data = gptResponse.data;

        res.json({
            data

        })

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