const { exec } = require('child_process');

function predict(inputFile,modelpath,pythonExecutable='C:\\Users\\adity\\AppData\\Local\\Programs\\Python\\Python310\\python.exe'){
    const pythonScript = 'model.py';

    exec(`${pythonExecutable} ${pythonScript} ${inputFile} ${modelpath}`, (error, stdout, stderr) => {
    if (error) {
        console.error(`Error executing Python script: ${error}`);
        return;
    }
    // console.log(`Python script output: ${stdout}`);
    return stdout;
    });
}
module.exports = predict;