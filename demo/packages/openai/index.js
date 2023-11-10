const chatgpt = require('./chatgpt');
require('dotenv').config();

async function main() {
    const chatGPTOptions = { 
        'prompt': 'translate the sentenses below into Chinese', 
        'model': 'gpt-3.5-turbo', 
        'temperature': 0.1 
    }

    const result = await chatgpt.chat('This is a ChatGPT demo',chatGPTOptions);

    console.log('====result====\n', result);
}

main();