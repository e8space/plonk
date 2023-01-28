window.addEventListener('DOMContentLoaded', (event) => {
  window.appStart();
});

window.appStart = function(){
  ns.pubSub = new PubSub();
  ns.appState = new StateMachine(new AppController());
  ns.appState.transition("startApp");
}