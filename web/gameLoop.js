class GameLoop {

  now = 0;
  dt = 0;
  last = null;
  step = 1/3;
   
  gameIsRunning = false;
  gameObjects=[];

  constructor(statsCanvas, gameObjectsCanvas){
    this.statsCanvas = statsCanvas;
    this.gameObjectsCanvas = gameObjectsCanvas;
    this.statsCanvasContext = this.statsCanvas.getContext('2d');
    this.gameObjectsCanvasContext = this.gameObjectsCanvas.getContext('2d');
    this.gameObjectsCanvasHeight =  this.gameObjectsCanvas.height;
    this.gameObjectsCanvasWidth =  this.gameObjectsCanvas.width;
  }

  addGameObject =(gameObject)=>{
    this.gameObjects.push(gameObject);
    
  }

  update(elapsedTime) {
      console.log("update");
  }

  start(){
    this.gameIsRunning = true;
    this.last = this.timestamp();
    requestAnimationFrame(this.frame);
  }

  pause(){
    this.gameIsRunning = false;
  }

  resume(){
    this.gameIsRunning = true;
    this.last = this.timestamp();
    requestAnimationFrame(this.frame);
  }

  end(){
    this.gameIsRunning = false;
  }

  render(elapsedTime){ 
    this.gameObjectsCanvasContext.clearRect(0,0,this.gameObjectsCanvasWidth,this.gameObjectsCanvasHeight);
    
  }

  timestamp = ()=> {
    return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
  }

  frame = ()=> {
    this.now = this.timestamp();
    this.dt = this.dt + Math.min(1, (this.now - this.last) / 1000);
    while(this.dt > this.step) {
      this.dt = this.dt - this.step;
      this.update(this.step);
    }
    this.render(this.dt);
    this.last = this.now;
    if (this.gameIsRunning) requestAnimationFrame(this.frame);
  }
}