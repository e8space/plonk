class GameController{

  constructor(font){
  
   this.boardView = new BoardView();
  }

  init(){
    this.plonkBlue = new GameObject(GameObject.Type.Blue);
    this.plonkYellow = new GameObject(GameObject.Type.Yellow);
    this.plonkRed = new GameObject(GameObject.Type.Red);
    this.plonkGreen = new GameObject(GameObject.Type.Green);
    this.plonk = new GameObject(GameObject.Type.plonk);

    
    this.boardView.init();
    this.gameLoop = new GameLoop(this.boardView.getStatsCanvas(), this.boardView.getGameObjectsCanvas());
    this.plonk.position.x = this.boardView.boardFields[0][3].anchorX;
    this.plonk.position.y = this.boardView.boardFields[0][3].anchorY;
 
  }

  startGame = ()=>{
    this.boardView.show();
    this.gameLoop.start();
  }

  pauseGame = ()=>{
    this.gameLoop.pause();
  }

  resumeGame = ()=>{
    this.gameLoop.resume();
  }

  endGame = ()=>{
    this.gameLoop.end();
    this.boardView.hide();
  }
  
}