# langchain_js_console_application

This repository contains a console application made up of a set of tools to automate the daily routine tasks using LangChain JS and OpenAI's LLMs. 

You can generate text by these tasks:
-  Simplify text, 
-  Translate from one language to another,
-  Create summaries,
-  Find synonys/antonyms,
-  Create a Linkedin post as a summary by providing a text.

## Instructions:

1. create a new folder in your local computer, navigate to it via the command prompt/terminal,
2. type 'git clone https://github.com/valeadami/LangChainJSConsoleApplication.git',
3. type 'npm install',
3. add an .env file and a folder named 'files' under the root, in which you will create a text file named 'blog.txt',
4. run 'node index.js' to start the console application,
5. select your option: for tasks from #1-#5 just enter the text via console. For task #6, the program reads blog.txt so the LLM can create a Linkedin post after reading its content,
6. select your options, see the result, press S to continue the interaction, N to end.

## .env file

This file is a configuration file where you set up paths and folders required by the application.

You can create first a env.txt, add the following content and then rename it as .env.

In order to use OpenAI's models it is mandatory to add the value of your OpenAI key:

```    OPENAI_API_KEY=INSERT HERE YOUR OPENAI KEY```

These keys are optional
  ```  
    LOG_ENABLED=false
    PATH_HISTORY_FILE= path to a file to trace the output from LLM
    BLOG_FILE=path to a file for task #6
```
If LOG_ENABLED=true you need to setup a PATH_HISTORY_FILE, i.e:

```PATH_HISTORY_FILE=./history/historyfile.txt```

Historyfile.txt tracks your activity: prompt, LLM output, date and time.

A complete example of .env might be the following:
```
OPENAI_API_KEY=sk-AAA123434
DEBUG=false
MYDEBUG=true
LOG_ENABLED=true
PATH_HISTORY_FILE=./history/historyfile.txt
BLOG_FILE=./files/blog.txt
```
Feel free to give the names to folder and files according to your needs.


