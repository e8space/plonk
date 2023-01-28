class InputHandler {

  constructor(){
    this.subscribers = new Map();
  }

  init = ()=> {
    document.addEventListener('keydown', this.keyEvent);
  }

  keyEvent = (e)=>{
    try {
      this.subscribers.forEach((value)=>{
        value(e.key);
      })
    } catch (e) {
      console.error(e);
    }
  }

  subscribe = (callback)=>{
    const key = self.crypto.randomUUID();
    this.subscribers.set(key, callback);
    return key;
  }
}