class Board {

  static fields = [];
  static fieldState = Object.freeze({
    "free": "free",
    "occupied": "occupied"
  })

  constructor(){
    this.gameViewHeight = 600;
    this.gameViewWidth = 280;
    this.boardCanvasHeight = 520;
    this.boardCanvasWidth = 280;
    this.statsCanvasHeight = 71;
    this.statsCanvasWidth = 280;
    this.blockSize = 40;
    this.boardFieldsX = 7;
    this.boardFieldsY = 13;
    this.boardCanvas = null;
    this.statsCanvas = null;

    this.fieldStates = Object.freeze({
      free: "free",
      occupied: "occupied"
    })

    this.getGameObjectsCanvas = ()=>{
      return this.gameObjectsCanvas;
    }
  }

  init = () =>{
    const gameView = this.initGameView();
    this.statsCanvas = this.initStatsCanvas(gameView); 
    this.boardCanvas = this.initBoardCanvas(gameView);
    this.gameObjectsCanvas = this.initGameObjectsCanvas(gameView);
    this.initFieldsState();
    this.drawBoard(this.boardCanvas);
    this.drawStats(this.statsCanvas);
  }

  initFieldsState = ()=>{
    for (let i= 0;i<this.boardFieldsX; i++){
      Board.fields[i]=[]
      for (let j=0; j<this.boardFieldsY;j++){
        Board.fields[i][j] =  Board.fieldState.free;
      }
    }
    console.log(Board.fields);
  }

  /**
   *
   * @param x
   * @param y
   * @param state
   */
  setFieldState = (x,y,state)=>{
    Board.fields[x][y]=state;
  }

  show(){
    document.querySelector("#gameView").style.display ="block";
  }

  hide(){
    document.querySelector("#gameView").style.display="none";
  }

  drawStats(statsCanvas){
    const ctx = statsCanvas.getContext("2d");
    ctx.fillStyle =  ns.colorPalette.platinum;
    ctx.font = "20px statsFont";
    ctx.fillText("HIGH", 5, 25);
    ctx.font = "25px statsFont";
    ctx.fillText("SCORE",5,60);
  }
   /**
   * 
   * @param {*} boardCanvas 
   */
   drawBoard(boardCanvas) {
    const ctx = boardCanvas.getContext("2d");
    ctx.lineWidth = 2;
    ctx.strokeStyle = ns.colorPalette.platinum;
    for (let i=0; i<7; i++){
      for (let j=0; j < 13; j++) {
        ctx.beginPath();
        ctx.rect((i*this.blockSize)+2, (j*this.blockSize)+2, (this.blockSize-4),this.blockSize-4);
        ctx.stroke();
      }
    }
  }

  /**
   * 
   * @returns {Object}
   */
  initGameView(){
    const gameView = document.querySelector("#gameView");
    gameView.style = `
      position: absolute;
      top: 50%;
      left: 50%;
      width: ${this.gameViewWidth}px;
      height: ${this.gameViewHeight}px;
      margin: auto;
      -ms-transform: translate(-50%, -50%);
      transform: translate(-50%, -50%);
      border: 8px solid;
      border-radius: 10px;
      border-color: ${ns.colorPalette.platinum};
    `;
    return gameView;
  }

  initGameObjectsCanvas(gameView) {
    const style = `
      position:absolute; top:80px;
    `
    let canvas = document.createElement("canvas");
    canvas.id = "gameObjectsCanvas";
    canvas.style = style;
    canvas.height = this.boardCanvasHeight;
    canvas.width = this.boardCanvasWidth;
    gameView.append(canvas);
    return canvas;
  }

  /**
   * 
   * @param {*} gameView 
   * @returns {Object} canvas
   */
  initBoardCanvas(gameView){
    const style = `
      position:absolute; top:80px;
    `
    let canvas = document.createElement("canvas");
    canvas.id = "boardCanvas";
    canvas.style = style;
    canvas.height = this.boardCanvasHeight;
    canvas.width = this.boardCanvasWidth;
    gameView.append(canvas);
    return canvas;
  }

  /**
   * 
   * @param {*} gameView 
   * @returns {Object} canvas
   */
  initStatsCanvas(gameView){
    const style = `
      position:absolute;
      top:0px;
      border-bottom-style:solid; 
      border-bottom-width:8px;  
      border-color: ${ns.colorPalette.platinum};
    `
    let canvas = document.createElement("canvas");
    canvas.id = "statsCanvas";
    canvas.style= style;
    canvas.height = this.statsCanvasHeight;
    canvas.width = this.statsCanvasWidth;
    gameView.append(canvas);
    return canvas;
  }
}