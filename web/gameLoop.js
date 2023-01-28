class GameLoop {

  now = 0;
  dt = 0;
  last = null;
  step = 1/10;
  gameIsRunning = false;
  gameObjects = null;

  constructor(gameController, gameObjectsCanvas, gameObjectHandler){
    this.gameController = gameController;
    this.gameObjectsCanvas = gameObjectsCanvas;
    this.gameObjectHandler = gameObjectHandler;
    this.gameObjectsCanvasContext = this.gameObjectsCanvas.getContext('2d');
    this.gameObjectsCanvasHeight =  this.gameObjectsCanvas.height;
    this.gameObjectsCanvasWidth =  this.gameObjectsCanvas.width;
  }

  update = (elapsedTime)=> {
    ns.pubSub.publish({message: "gameLoopUpdate", content:elapsedTime})
   // this.gameController.update(elapsedTime);
    this.gameObjects= this.gameObjectHandler.getActiveGameObjects();
  }

  start(){
    this.gameIsRunning = true;
    this.last = this.timestamp();
    this.update(this.last);
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

  render = (elapsedTime)=>{ 
    this.gameObjectsCanvasContext.clearRect(0,0,this.gameObjectsCanvasWidth,this.gameObjectsCanvasHeight);
    const objects = Object.entries(this.gameObjects);

    objects.forEach(([key, value])=>{
      this.gameObjectsCanvasContext.drawImage(value.images[value.activeImage].image,value.position.x*40+4,value.position.y*40+4);
    })
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
    const state = GameController.lift.state;

    GameObjectHandler.activeGameObjects.forEach((plonk)=>{
      if((plonk.position.x === GameObjectHandler.lift.position.x)
        && (plonk.position.y === GameObjectHandler.lift.position.y)
        && (plonk.type === state )) {
        ns.pubSub.publish({message:"plonk catched", content:plonk.id })

      }
    })
    this.render(this.dt);
    this.last = this.now;
    if (this.gameIsRunning) requestAnimationFrame(this.frame);
  }
}