const fs =require("fs");



const writeFileLog=async (prompt, response)=>{
    const content = 'Prompt: ' +prompt +'; risposta: ' + response.replace(/\n/g, "") +'; data: '+ new Date().toLocaleDateString(undefined,{ day: '2-digit', month: '2-digit', year: 'numeric',  hour: '2-digit', minute: '2-digit',second: '2-digit' })+'\n';
    const filePath = process.env.PATH_HISTORY_FILE; 
   
    fs.access(filePath, fs.constants.F_OK, (err) => {
      if (err) {
        
        fs.writeFile(filePath, content, (err) => {
          if (err) {
            console.error('\nError in writing the file::', err);
          } else {
          //  console.log('\nFile created and content written successfully!');
          }
        });
      } else {
        // Il file esiste, apri in append e scrivi il contenuto
        fs.appendFile(filePath, content, (err) => {
          if (err) {
            console.error('\nError in writing the file::', err);
          } else {
          //  console.log('\nContent added to the existing file!');
          }
        });
      }
    });

  }
    const logFile = async (prompt, response) => {
    // Chiama writeFileLog all'interno di log
    await writeFileLog(prompt, response);
    };
module.exports.logFile=logFile;