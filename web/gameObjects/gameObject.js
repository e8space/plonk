class GameObject{

  static Status = Object.freeze({
    Active : Symbol("active"),
    Created: Symbol("created")
  })

  static Type = Object.freeze({
    Yellow : Symbol("yellow"),
    Green: Symbol("green"),
    Red : Symbol ("red"),
    Blue : Symbol ("blue"),
    PLonk : Symbol("plonk")
  })

  position = {
    x:null,
    y:null
  }

  image = null;

  set image(image){
    this.image = image;
  }

  get position(){
    return this.position;
  }
  
  set position(position){
    this.position = position;
  }
  constructor(type){
    this.type = type;
  }

  update(){

  }

  draw(){

  }
}