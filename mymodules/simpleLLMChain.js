 
const {OpenAI}=require("langchain/llms/openai");
const {PromptTemplate}=require("langchain/prompts");
const {LLMChain}=require("langchain/chains");
const dotenv=require("dotenv");
const { prompt_templates } =require('../prompts/prompts');
const {encode, decode} = require('gpt-3-encoder');

  dotenv.config();

  
  //funzione anonima asincrona
  const simplifyText = async (userInput) => {

  try {
    console.log('-----> simplifyText function');
  
    const model = new OpenAI({ temperature: 0.8, modelName: "text-davinci-003" });
  
    const promptTemplate = new PromptTemplate({ template: prompt_templates[0].prompt, inputVariables: ["message"] });


    const chain = new LLMChain({ llm: model, prompt: promptTemplate });
  
    const result = await chain.call({
      message:userInput
    });
  
    return result.text;
   
  } catch (err) {
    
    throw(err);
  }
}
//FIX ENGLISH
const fixEnglish = async (userInput) => {

  try {
    console.log('-----> FixEnglish function');
    const model = new OpenAI({ temperature: 0.5, modelName: "text-davinci-003" });
    //const prompt = "You are an English master, spelling corrector, and language enhancer. I will provide you with input forms including text, I want you to improve the text's vocabulary and sentences with more natural language. Keep the  same meaning. Here is the text to fix:\n {message}";
    const promptTemplate = new PromptTemplate({ template: prompt_templates[1].prompt, inputVariables: ["message"] });


    const chain = new LLMChain({ llm: model, prompt: promptTemplate });
  
    const result = await chain.call({
      message:userInput
    });
  
    return result.text;
   
  } catch (err) {
    
    throw(err);
  }
}

//translator
const translateFromOneLanguageToAnother = async (userInput, language) => {

  try {
    console.log('-----> translateTextToAnotherLanguage function');
    const model = new OpenAI({ temperature: 0.7, modelName: "text-davinci-003" });
   // const prompt = "You are a competent translator. You know all modern world languages. I will provide the text to translate in the required language.\n {message}\n{language}";
    const promptTemplate = new PromptTemplate({ template:  prompt_templates[2].prompt, inputVariables: ["message","language"] });


    const chain = new LLMChain({ llm: model, prompt: promptTemplate });
  
    const result = await chain.call({
      message:userInput,language
    });
  
    return result.text;
   
  } catch (err) {
    
    throw(err);
  }
}
//summarize
const summarize = async (userInput) => {

  try {
    console.log('-----> summarize example');
    const model = new OpenAI({ temperature: 0.7, modelName: "text-davinci-003" });
    //const prompt = "Summarize this text in few words, highlight the key points. Use plain Italian language. Here is the text:\n {message}";
    const promptTemplate = new PromptTemplate({ template:  prompt_templates[3].prompt, inputVariables: ["message"] });


    const chain = new LLMChain({ llm: model, prompt: promptTemplate });
  
    const result = await chain.call({
      message:userInput
    });
  
    return result.text;
   
  } catch (err) {
    
    throw(err);
  }
}
//synonim
const findSynonymAntonym = async (userInput) => {

  try {
    console.log('-----> findSynonymAntonym example');
    const model = new OpenAI({ temperature: 0.7, modelName: "text-davinci-003" });
    //const prompt = "Summarize this text in few words, highlight the key points. Use plain Italian language. Here is the text:\n {message}";
    const promptTemplate = new PromptTemplate({ template:  prompt_templates[4].prompt, inputVariables: ["message"] });


    const chain = new LLMChain({ llm: model, prompt: promptTemplate });
  
    const result = await chain.call({
      message:userInput
    });
  
    return result.text;
   
  } catch (err) {
    
    throw(err);
  }
}

module.exports.simplifyText=simplifyText;
module.exports.fixEnglish=fixEnglish;
module.exports.translateFromOneLanguageToAnother=translateFromOneLanguageToAnother;
module.exports.summarize=summarize;
module.exports.findSynonymAntonym=findSynonymAntonym;
