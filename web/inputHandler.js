class InputHandler {

  constructor(){
    this.subscribers = [];
  }

  init = ()=> {
    document.addEventListener('keydown', this.keyEvent);
  }

  keyEvent = (e)=>{
    for (let i=0; i < this.subscribers.length; i++){
      this.subscribers[i](e.key);
    }
  }

  subscribe = (callback)=>{
    this.subscribers.push(callback);
  }
}