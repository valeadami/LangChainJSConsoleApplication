const prompt_templates= [
    {"id":1,  prompt: "Simplify this message to just few words: {message}", description: "Simplify text from user input",goal: "simplifier"},
    {"id":2,  prompt: "You are an English master, spelling corrector, and language enhancer. I will provide you with input forms including text, I want you to improve the text's vocabulary and sentences with more natural language. Keep the  same meaning. Here is the text to fix:\n {message}", description: "Fix English",goal: "Fix English"},
    {"id":3,  prompt: "You are a competent translator. You know all modern world languages. I will provide the text to translate in the required language.\n {message}\n{language}", description: "Translate from one language to another",goal: "translator"},
    {"id":4,  prompt: "Summarize this text in few words, highlight the key points. Use plain Italian language. Here is the text:\n {message}", description: "Summarize text",goal: "summarizer"},
    {"id":5,  prompt: "You are an English dictionary, your task is to provide a synonym and antonym for the word provided by the user. Here is word:\n {message}", description: "Find a synonim for a word",goal: "synonim"},
    {"id":6,  prompt: "", description: "Create a blog summary for a Linkedin post",goal: "chain fixEnglish and create blog post for Linkedin"},
]
module.exports.prompt_templates = prompt_templates;
