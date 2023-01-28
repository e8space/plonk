class GameObjectHandler{

   static gameObjects = {};
   static activeGameObjects = {};
   static lift = null;

  #gameObjectCounter = 0;

  constructor(resourceHandler, inputHandler){
    this.resourceHandler = resourceHandler;
    this.inputHandler = inputHandler;
    this.resources =  this.resourceHandler.getResources();
  }

  /**
   *
   */
  createPlonk(){
    const plonkTypes = Object.keys(Plonk.Type);
    const plonkType = Plonk.Type[plonkTypes[ plonkTypes.length * Math.random() << 0]];
    const startingPositionsX = Object.keys(GameObject.StartPositionX);
    const startingPositionX = GameObject.StartPositionX[startingPositionsX[startingPositionsX.length * Math.random() << 0]];
    const plonk = new Plonk (this.resources,plonkType,{x:startingPositionX,y:-1});
    GameObjectHandler.gameObjects[plonk.id]= plonk;
    return plonk;
  }

  /**
   *
   * @param type
   */
  createLift(type){
    const liftType = type || Lift.Type.classic;
    const startingPosition = {x:3,y:12};
    const lift = new Lift(this.resources, liftType, startingPosition, this.inputHandler);
    GameObjectHandler.lift = lift;
    GameObjectHandler.gameObjects[lift.id]= lift;
    return lift;
  }



  updateGameobjects = ()=>{
    
  }

  activateGameObject = (id)=>{
    GameObjectHandler.gameObjects[id].status = GameObject.Status.Activated;
    GameObjectHandler.activeGameObjects[id] = GameObjectHandler.gameObjects[id];
  }

  deactivateGameObject = (id)=>{
    delete GameObjectHandler.activeGameObjects[id];
  }

  destroyGameObject = (id)=>{
    GameObjectHandler.gameObjects.delete(id);
    GameObjectHandler.activeGameObjects.delete(id);

  }

  getGameObject =(id)=>{
    return GameObjectHandler.gameObjects[id];
  }
  getActiveGameObjects = ()=>{
    return GameObjectHandler.activeGameObjects;
  }
}