const path = require("path");
const colors = require('colors');
class Logger{
    static log(message){
        console.log(colors.green(`log -> ${message}`));
    }
    static info(message){
        console.info(colors.cyan(`info -> ${message}`));    
    }
    static error(message){
        console.error(colors.red(`error -> ${message}`));
    }
    static warn(message){
        console.warn(colors.yellow(`warn -> ${message}`));
    }
}
module.exports =  Logger
