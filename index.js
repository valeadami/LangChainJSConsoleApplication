const readline = require('readline');
const simpleLLMChain = require('./mymodules/simpleLLMChain');
const simpleSequentialChain = require('./mymodules/simpleSequentialChain');
const { prompt_templates } = require('./prompts/prompts');
const utilities = require('./mymodules/utilities');
const fs = require('fs');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function displayMenu() {
  let cont=0;
  prompt_templates.forEach((template) => {
    console.log(template.id + '. ' + template.description+'\n');
   cont++;
  });


  // if (process.env.MYDEBUG === "true") {
  //   console.log('6. this is for test\n');
  // }
  console.log((cont+1)+ '. Exit\n');

}

function continueOrExit(rl) {

  rl.question('Keep going? S/N ', (scelta) => {
    const regexS = /^[Ss]$/;
    const regexN = /^[Nn]$/;

    if (regexS.test(scelta)) {
      // if the answer is "S" or "s"
      displayMenu();
      askForChoice();

    } else if (regexN.test(scelta)) {

      console.log('---------------- MENU END-------------------');
      console.log('---------------- GOODBYE-------------------');
      rl.close();
    } else {
      console.log('Please type S to continue or N to exit');
      continueOrExit(rl);
    }
  });
}
function handleTask(choice) {
  console.log('Executing task ' + choice);
  switch (choice) {
    case "1":
      rl.question('Enter the text to simplify: ', (text) => {
        simpleLLMChain.simplifyText(text)
          .then((res) => {
           
            console.log(`Response= ${res}\n\n`);
            
            if (process.env.LOG_ENABLED === "true") {
              utilities.logFile(text, res);
            }

            continueOrExit(rl);

          }).catch((err) => {
            console.log('Something went wrong in simplifying text:');
                    
            console.error(err.error.message);
          });
      });

      break;

    case "2":
      rl.question('Enter the English text to correct: ', (text) => {

        simpleLLMChain.fixEnglish(text).then((res) => {
          console.log(`Response= ${res}\n\n`);

          if (process.env.LOG_ENABLED === "true") {
            utilities.logFile(text, res);
          }

          continueOrExit(rl);
        }).catch((err) => {
          console.log('Something went wrong while fixing English:');
                  
          console.error(err.error.message);
        });

      });

      break;
    case "3":
      rl.question('Enter the text to translate: ', (text) => {
        rl.question('Now, the target language (for instance, italian): ', (targetLanguage) => {

          simpleLLMChain.translateFromOneLanguageToAnother(text, targetLanguage).then((res) => {

            console.log(`Response= ${res}\n\n`);

            if (process.env.LOG_ENABLED === "true") {
              utilities.logFile(text, res);
            }

            continueOrExit(rl);
          }).catch((err) => {
            console.log('Something went wrong while translating:');
                    
            console.error(err.error.message);
          });
        })


      });

      break;

    case "4":
      rl.question('Enter the text to summarize: ', (text) => {

        simpleLLMChain.summarize(text).then((res) => {
          console.log(`Response= ${res}\n\n`);

          if (process.env.LOG_ENABLED === "true") {
            utilities.logFile(text, res);
          }

          continueOrExit(rl);
        }).catch((err) => {
          console.log('Something went wrong while summaring:');
                  
          console.error(err.error.message);
        });

      });

      break;
      case "5":
        rl.question('Enter the word so I can find a synonym and antonym: ', (text) => {
  
          simpleLLMChain.findSynonymAntonym(text).then((res) => {
            console.log(`Response= ${res}\n\n`);
  
            if (process.env.LOG_ENABLED === "true") {
              utilities.logFile(text, res);
            }
  
            continueOrExit(rl);
          }).catch((err) => {
            console.log('Something went wrong while finding synonyms and antonyms:');
                    
            console.error(err.error.message);
          });
  
        });
  
        break;
    case "6":
      try{
        fs.readFile(process.env.BLOG_FILE, 'utf8', (err, text) => {
          if (err) {
            console.error('Error while reading file:', err);
            rl.close();
           return;
          }
    
          simpleSequentialChain.fixEnglishAndCreateSummaryLinkedin(text).then((res) => {  
            console.log(`Response= ${res}\n\n`);
            if (process.env.LOG_ENABLED === "true") {
              utilities.logFile(text, res);
            }
            continueOrExit(rl);
          }).catch((err) => {
            console.log('Something went wrong while creating blog post for Linkedin:');
                    
            console.error(err.error.message);
          });
        });
      }catch(e){
        console.log(e);
      }
     
    
      break;

    case "7":
      console.log('---------------- MENU END-------------------');
      console.log('---------------- GOODBYE-------------------');
      rl.close();

      break;
  }
}

function askForChoice() {
  rl.question('\nSelect an option from the list below: ', (choice) => {

    handleTask(choice);
  });
}

// Execution
displayMenu();
askForChoice();
