# langchain_openai_language_generator
This repository contains a set of tools for creating generative text using LangChain and OpenAI. The tools can be used to correct English sentences, create summaries, simplify text, create a Linkedin post as a summary by providing a text.

Instructions:
1. clone this repo or download it to your local computer
2. go to root directory and via console, run 'npm install' 
3. add an .env file, specifying the following keys:
    OPENAI_API_KEY=INSERt HERE YOUR OPENAI KEY
    DEBUG=false 
    LOG_ENABLED=true
    PATH_HISTORY_FILE= path to a file to trace the output from LLM
    BLOG_FILE=path to a file for task #6

An example might be:

OPENAI_API_KEY=sk-AAA123434
DEBUG=false
MYDEBUG=true
LOG_ENABLED=true
PATH_HISTORY_FILE=./history/historyfile.txt
BLOG_FILE=./files/blog.txt
4. run the command node index.js to start the application
5. select your options. For tasks from #1-#5 just enter the text via console, for #6 create a folder named files under the root and create a text file named blog.txt. You can modify their names as you desire, in that case you will need to rename the value for BLOG_FILE in .env file.
