class AppController{

  constructor(){
    this.inputHandler = new InputHandler();
    this.gameController = new GameController();
    this.resourceLoader = new ResourceLoader();
  }

  startApp =()=>{
      this.resourceLoader.loadResources.then(()=>{
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
    console.log(key);
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