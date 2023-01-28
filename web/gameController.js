class GameController{

  static GameStatus = "idle";

  static lift = null;

  constructor(inputHandler, gameObjectHandler){
    this.gameObjectHandler = gameObjectHandler;
    this.boardView = new Board();
    this.elapsedAccumulate = 0.0;
    this.stepTime = 0.3;
    this.board = [];
    this.boardStates = Object.freeze({
      free: "free",
      occupied: "occupied"
    })

  }

  init = ()=>{
   this.initSubscriptions();
    this.boardView.init();
    this.initBoardStatus();
    GameController.lift = this.gameObjectHandler.createLift();
    this.gameObjectHandler.activateGameObject(GameController.lift.id);
    this.createPlonk();
    this.gameLoop = new GameLoop(this,this.boardView.getGameObjectsCanvas(), this.gameObjectHandler);
    ns.appState.transition("startGame");
  }

  initBoardStatus = ()=>{
    for (let i=0; i < 7; i++) {
      this.board[i]=[];
      for (let j=0; j<13; j++){
        this.board[i][j]= this.boardStates.free;
      }
    }
    console.log("board:", this.board);
  }

  initSubscriptions = ()=>{
    ns.pubSub.subscribe(payload=>{
      switch (payload.message){
        case "plonk catched": {

          this.gameObjectHandler.deactivateGameObject(payload.content);
          this.createPlonk();
          break;
        }
        case "plonk settled": {

          this.createPlonk();
          break;
        }
      }

    })
  }

  createPlonk=()=>{
    const plonk = this.gameObjectHandler.createPlonk();
   // GameController.plonks.set((plonk.id), plonk);
    this.gameObjectHandler.activateGameObject(plonk.id);
  }

  startGame = ()=>{
    this.boardView.show();
    GameController.GameStatus = "running";
    this.gameLoop.start();
  }

  pauseGame = ()=>{
    GameController.GameStatus = "paused";
    this.gameLoop.pause();
  }

  resumeGame = ()=>{
    GameController.GameStatus = "running";
    this.gameLoop.resume();
  }

  endGame = ()=>{
    GameController.GameStatus = "ended";
    this.gameLoop.end();
    this.boardView.hide();
  }
}