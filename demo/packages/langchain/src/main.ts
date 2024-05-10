import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";
import * as dotenv from 'dotenv';
dotenv.config();


const chatModel = new ChatOpenAI({
    modelName: "gpt-3.5-turbo",
    temperature: 0,
    openAIApiKey: process.env.OPENAI_API_KEY,
});

const prompt = ChatPromptTemplate.fromMessages([
    ["system", "You are a world class technical documentation writer."],
    ["user", "{input}"],
]);


async function main() {
    console.log('====invoking====');
    const chain = prompt.pipe(chatModel);

    const result = await chain.invoke({
        input: "what is bitcoin?",
    });

    console.log('====result====\n', result?.content);
}

main().then(() => {
    process.exit(0);
}).catch(err => {
    console.error(err)
})