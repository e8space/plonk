window.addEventListener('DOMContentLoaded', (event) => {
  console.log('DOM loaded');
  window.appStart();
});

window.appStart = function(){
  ns.gameView = new GameView();
}