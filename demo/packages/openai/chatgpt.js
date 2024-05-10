const OpenAI = require('openai');

async function chat(input, options) {
    if (!process.env.OPENAI_API_KEY) throw new Error('please provide OPENAI_API_KEY');

    options = _setDefaultOptions(options);

    let result = '';

    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });

    try {
        stream = await openai.chat.completions.create({
            'messages': [
                { 'role': 'system', 'content': options.prompt },
                { 'role': 'user', 'content': input },
            ],
            'model': options.model,
            'temperature': options.temperature,
            'stream': true
        });

        for await (const part of stream) {
            const content = part?.choices[0]?.delta?.content || '';
            console.log(content);
            result += content;
        }

    } catch (err) {
        console.error(`====openai chat====failed. Reason: ${err.message}`);
    }

    return result;
}

function _setDefaultOptions(options = {}) {
    const { prompt, model, temperature } = options;

    if (!prompt) options.prompt = process.env.prompt || 'You are a helpful assistant.';
    if (!model) options.model = process.env.MODEL || 'gpt-3.5-turbo';
    if (!temperature) options.temperature = process.env.TEMPERATE || 1;

    return options
}


module.exports = {
    chat,
}