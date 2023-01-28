class AppController{

  constructor(){
    this.resourceHandler = new ResourceHandler();
    this.inputHandler = new InputHandler();
    this.gameObjectHandler = new GameObjectHandler(this.resourceHandler,this.inputHandler);
    this.gameController = new GameController(this.inputHandler,this.gameObjectHandler);
  }

  startApp =()=>{
      this.resourceHandler.loadResources().then(()=>{
        this.inputHandler.init();
        this.inputHandler.subscribe(this.inputListener);
        this.gameController.init();
      }, ()=>{
        console.error("fetching resources failed");
      })
  }

  stopApp=()=>{
    this.boardView.destroy();
  }

  startGame = ()=>{
    this.gameController.startGame()
  }

  endGame = ()=>{
    this.gameController.endGame();
  }

  pauseGame = ()=>{
    this.gameController.pauseGame();
  }

  resumeGame = ()=>{
    this.gameController.resumeGame();
  }

  inputListener =(key)=> {
   
    switch(key){
      case "p" :  {
          ns.appState.transition("pauseGame");
        break;
      }
      case "r" :  {
        ns.appState.transition("resumeGame");
        break;
      }
      case "e" :  {
        ns.appState.transition("endGame");
        break;
      }
      case "s" :  {
        ns.appState.transition("startGame");
        break;
      }
    }
  }
}