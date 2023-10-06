const {OpenAI}=require("langchain/llms/openai");
const {PromptTemplate}=require("langchain/prompts");
const {LLMChain, SimpleSequentialChain, SequentialChain}=require("langchain/chains");
const { prompt_templates } =require('../prompts/prompts');
const dotenv=require("dotenv");

dotenv.config();


const fixEnglishAndTranslate = async (userInput) => {

    try {
        console.log('-----> simpleSequentialChain');
        const model = new OpenAI({ temperature: 0.5, modelName: "text-davinci-003" });
        //const prompt = "You are an English master, spelling corrector, and language enhancer. I will provide you with input forms including text, I want you to improve the text's vocabulary and sentences with more natural language. Keep the  same meaning. Here is the text to fix:\n {message}";
        const promptTemplate = new PromptTemplate({ template: prompt_templates[1].prompt, inputVariables: ["message"] });

        //first chain for the fix english task
        const chain = new LLMChain({ llm: model, prompt: promptTemplate });

        //second chain for the translate task   
        const modelTranslate = new OpenAI({ temperature: 0.7, modelName: "text-davinci-003" });
        //rewriting the prompt for a specific language
        const prompt = "You are a competent translator. You know all modern world languages. I will provide the text and your task is to translate in Italian using an informal tone, be concise and keep the meaning the same.\n {message}";
        const promptTemplateTranslate = new PromptTemplate({ template: prompt, inputVariables: ["message"] });


        const chainTranslate = new LLMChain({ llm: modelTranslate, prompt: promptTemplateTranslate });
        //creating the structure of the overall chain.
        const overallChain = new SimpleSequentialChain({
            chains: [chain, chainTranslate],
            verbose: true,
        });
        const result = await overallChain.run(userInput);

        return result;

    } catch (err) {

        throw (err);
    }
}
const fixEnglishAndCreateSummaryLinkedin = async (userInput) => {

    try {
        console.log('-----> fixEnglishAndCreateSummaryLinkedin');
        const model = new OpenAI({ temperature: 0.5, modelName: "text-davinci-003" });
        //const prompt = "You are an English master, spelling corrector, and language enhancer. I will provide you with input forms including text, I want you to improve the text's vocabulary and sentences with more natural language. Keep the  same meaning. Here is the text to fix:\n {message}";
        const promptTemplate = new PromptTemplate({ template: prompt_templates[1].prompt, inputVariables: ["message"] });

        //first chain for the fix english task
        const chain = new LLMChain({ llm: model, prompt: promptTemplate });

        //second chain for the summary for Linkedin task   
        const modelTranslate = new OpenAI({ temperature: 0.7, modelName: "text-davinci-003" });
       
        const prompt = "{message}\n Based on the text above, draft a concise summary for a Linkedin post. Point out key findings in bulleted points, use emoticons, use an engaging tone and propose hashtags\nSummary:";
        const promptTemplateTranslate = new PromptTemplate({ template: prompt, inputVariables: ["message"] });


        const chainTranslate = new LLMChain({ llm: modelTranslate, prompt: promptTemplateTranslate });
        //creating the structure of the overall chain.
        const overallChain = new SimpleSequentialChain({
            chains: [chain, chainTranslate],
            verbose: true,
        });
        //console.log(overallChain);
        const result = await overallChain.run(userInput);

        return result;

    } catch (err) {

        throw (err);
    }
}
module.exports.fixEnglishAndTranslate=fixEnglishAndTranslate;
module.exports.fixEnglishAndCreateSummaryLinkedin=fixEnglishAndCreateSummaryLinkedin;