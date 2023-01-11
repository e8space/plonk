class StateMachine{
    constructor(appController) {
      this.appController = appController;
      this.currentState = new AppOffState(this);
    }
  
    transition(event) {
      const newState = this.currentState.transitions.get(event);
      if (newState) {
        console.log("exit", this.currentState.constructor.name)
        this.currentState.exit();
        this.currentState = new newState(this);
        console.log("enter", this.currentState.constructor.name)
        this.currentState.enter();
        
      }
    }
  }

  class GameEndedState {
    constructor(stateMachine) {
      this.stateMachine = stateMachine;
      this.transitions = new Map([
        ['startGame', GameStartedState]
      ]);
    }
    enter() {
      this.stateMachine.appController.endGame();
    }
    exit() {
      // Perform any necessary cleanup
    }
  }

  class GameStartedState {
    constructor(stateMachine) {
      this.stateMachine = stateMachine;
      this.transitions = new Map([
        ['endGame', GameEndedState],
        ['pauseGame', GamePausedState],
      ]);
    }
    enter() {
      this.stateMachine.appController.startGame();
    }
    exit() {
      // Perform any necessary cleanup
    }
  }

  class GamePausedState {
    constructor(stateMachine) {
      this.stateMachine = stateMachine;
      this.transitions = new Map([
        ['endGame', GameEndedState],
        ['resumeGame', GameResumedState],
      ]);
    }
    enter() {
      this.stateMachine.appController.pauseGame();
    }
    exit() {
      // Perform any necessary cleanup
    }
  }

  class GameResumedState {
    constructor(stateMachine) {
      this.stateMachine = stateMachine;
      this.transitions = new Map([
        ['endGame', GameEndedState],
        ['pauseGame', GamePausedState],
      ]);
    }
    enter() {
      this.stateMachine.appController.resumeGame();
    }
    exit() {
      // Perform any necessary cleanup
    }
  }

  class AppOnState {
    constructor(stateMachine) {
      this.stateMachine = stateMachine;
      this.transitions = new Map([
        ['stopApp', AppOffState],
        ['startGame', GameStartedState],
      ]);
    }
    enter() {
      this.stateMachine.appController.startApp();
    }
    exit() {
      // Perform any necessary cleanup
    }
  }
  
  class AppOffState {
    constructor(stateMachine) {
      this.stateMachine = stateMachine;
      this.transitions = new Map([
        ['startApp', AppOnState],
      ]);
    }
    enter() {
      this.stateMachine.appController.stopApp();
    }
    exit() {
      // Perform any necessary cleanup
    }
  }