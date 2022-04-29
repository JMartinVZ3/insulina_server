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
            prompt: `${text}`,
            maxTokens: 30,
            temperature: 0.9,
            topP: 1,
            presencePenalty: 1,
            frequencyPenalty: 1,
            bestOf: 5,
            n: 1,
            stream: false,
            stop: ['\n']

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