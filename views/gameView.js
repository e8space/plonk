class GameView {
  
  constructor(){
    this.gameViewHeight = 600;
    this.gameViewWidth = 280;
    this.boardCanvasHeight = 560;
    this.boardCanvasWidth = 280;
    this.statsCanvasHeight = 40;
    this.statsCanvasWidth = 280;

    this.colorPalette = {
      "sienna" : "#DD6E42",
      "dutch" : "#E8DAB2",
      "rhythm" : "#797790",
      "columbia" : "#C0D6DF",
      "platinum" : "#EAEAEA"
    }
    this.init();
  }
  init(){
    const gameView = this.initGameView();
    const statsCanvas = this.initStatsCanvas(gameView); 
    const boardCanvas = this.initBoardCanvas(gameView);
   
    this.drawGameView(gameView, statsCanvas, boardCanvas);
  }

  initGameView(){
    const gameView = document.querySelector("#gameView");
    const gameViewStyle = `
      border:solid;
      width:`+this.gameViewWidth+`px;
      height:`+this.gameViewHeight+`px;
      margin: auto;
      position: absolute;
      top: 50%;
      left: 50%;
      -ms-transform: translate(-50%, -50%);
      transform: translate(-50%, -50%);
      border: 8px solid;
      border-color: `+this.colorPalette.sienna+`;
    `
    gameView.style= gameViewStyle;
    return gameView;
  }

  initBoardCanvas(gameView){
    let canvas = document.createElement("canvas");
    canvas.id = "boardCanvas";
    canvas.style="border:solid; border-width:1px; position:absolute; top:40px";
    canvas.height = this.boardCanvasHeight;
    canvas.width = this.boardCanvasWidth;
    gameView.append(canvas);
    return canvas;
  }

  initStatsCanvas(gameView){
    let canvas = document.createElement("canvas");
    canvas.id = "statsCanvas";
    canvas.style="border:solid; border-width:1px;position:absolute; top:0px";
    canvas.height = this.statsCanvasHeight;
    canvas.width = this.statsCanvasWidth;
    gameView.append(canvas);
    return canvas;

  }

  initGameCanvas(gameView){    
   
  }

  drawGameView(gameView, statsCanvas, gameCanvas){
   /*
    const ctx = gameCanvas.getContext("2d")
    ctx.font = "48px serif";
    ctx.fillText("Hello world", 10, 50);
  */
  }

  drawGameStatsView(gameCanvasContext){

  }
}