//Build Your Own EventEmitter
class EventEmitter {
  constructor(){
    this.events={}
  }
  on(eventName, callback){
    if(this.events[eventName]){
      this.events[eventName].push(callback);
    } else {
      this.events[eventName] = [callback];
    }
  }
  trigger(eventName, ...rest){
    if(this.events[eventName]){
      this.events[eventName].forEach(cb => {
        cb.apply(rest);
      });
    }
  }
}

const ee = new EventEmitter();
ee.on("change", () => {
  console.log("Hello There!")
});
ee.trigger("change")


//Extending the Event Emitter
//app.js
const EventEmitter = require("events")
const Logger = require("./logger")
const logger = new Logger();

logger.on("messageLogged", (arg) => {
  console.log("listener called!", arg) 
});

logger.log("message");

//logger.js
const EventEmitter = require("events").EventEmitter;

class Logger extends EventEmitter {
  log(message) {
    //Send an HTTP request
    console.log(message);
    //Raise an event
    this.emit("messageLogged", {id:1, url:"http"});
  }
}

module.exports = Logger;
