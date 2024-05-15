const { exec } = require('child_process');

function predict(inputFile, modelpath, pythonExecutable = 'C:\\Users\\adity\\AppData\\Local\\Programs\\Python\\Python310\\python.exe') {
    const pythonScript = 'model.py';

    return new Promise((resolve, reject) => {
        exec(`${pythonExecutable} ${pythonScript} ${inputFile} ${modelpath}`, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error executing Python script: ${error}`);
                reject(error);
            } else {
                // console.log(`Python script output: ${stdout}`);
                resolve(stdout);
            }
        });
    });
}

module.exports = predict;