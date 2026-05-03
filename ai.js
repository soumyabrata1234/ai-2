import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import readline from "readline";

const model = new ChatGoogleGenerativeAI({
    model: "gemini-2.5-flash-lite",
    apiKey: "AIzaSyBZlmbIK_DsNK_Is58HwmqIvc0VZOJNuYo",
    temperature: 0
});

import { PromptTemplate } from "@langchain/core/prompts";

const prompt = new PromptTemplate({
  inputVariables: ["topic"],
  template: "write a 2line sentence on this topic {topic}",
});

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

function askQuestion(query) {
    return new Promise((resolve) => {
        rl.question(query, (answer) => {
            resolve(answer);
        });
    });
}




const userInput = await askQuestion("You: ");
const text = await prompt.format({ topic: userInput });


const response = await model.invoke(text);
console.log(`AI: ${response.content}\n`);



rl.close();