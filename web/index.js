window.addEventListener('DOMContentLoaded', (event) => {
  console.log('DOM loaded');
  window.appStart();
});

window.appStart = function(){
  ns.appState = new StateMachine(new AppController());
  ns.appState.transition("startApp");
}