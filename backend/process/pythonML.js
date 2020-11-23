const {spawn} = require('child_process');
const python = spawn('python', ['script1.py']);
let data = '';
 // collect data from script
python.stdout.on('data', function (data) {
    console.log('Pipe data from python script ...');
    data = data.toString();
});
// in close event we are sure that stream from child process is closed
python.on('close', (code) => {
console.log(`child process close all stdio with code ${code}`);
 // send data to browser
});