class Plonk extends GameObject {

  static Type = Object.freeze({
    "red": "red",
    "yellow": "yellow",
    "green" : "green",
    "blue" : "blue"
  })

  constructor(resources,type,position){
    console.log("plonk constructed");
    super(GameObject.Status.Created, position);
    super.images = resources.get("plonk");
    super.activeImage = type;
    super.type = type;
    super.status = GameObject.Status.Created;

    ns.pubSub.subscribe(payload=>{
      switch (payload.message) {
        case "gameLoopUpdate" : this.update(payload.content);
        break;
      }
    })
  }

  update =(content)=>{
    if (this.status === GameObject.Status.Activated){
      if ((this.position.y < 12) && (Board.fields[this.position.x][this.position.y+1] === Board.fieldState.free)){
        this.position.y = this.position.y +1;
      } else {
        Board.fields[this.position.x][this.position.y] = Board.fieldState.occupied;
        this.status = GameObject.Status.Settled;
        ns.pubSub.publish({message:"plonk settled", content:this.id})
      }
    }
  }
}