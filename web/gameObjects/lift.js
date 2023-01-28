class Lift extends GameObject {

    #imagesInUse = ["red", "yellow", "green", "blue"]

    static State = Object.freeze({
        0 : "red",
        1 : "yellow",
        2 : "green",
        3 : "blue"
    })
    static Type = Object.freeze({
       "classic": "classic"
    })

    state = null;
    get state(){
        return this.state;
    }
    constructor(resources, type, position, inputHandler){
        super(GameObject.Status.Created, position);
        super.images = resources.get("lift");
        super.activeImage = this.#imagesInUse[0];
        super.type = type;
        this.state = Lift.State[0];
        inputHandler.subscribe(this.inputListener)
    }

    inputListener =(key)=> {
        if (GameController.GameStatus ==="running") {

            switch (key) {
                case "ArrowRight" : {
                    if (this.position.x < 6) {
                        this.position.x = this.position.x + 1;
                    }

                    break;
                }
                case "ArrowLeft" : {
                    if (this.position.x > 0) {
                        this.position.x = this.position.x - 1;
                    }
                    break;
                }
                case "ArrowDown" : {
                    if (this.position.y < 12) {
                        this.position.y = this.position.y + 1;
                    }
                    break;
                }
                case "ArrowUp": {
                    if (this.position.y > 0) {
                        this.position.y = this.position.y - 1;
                    }
                    break;
                }
                case " ": {
                    let imageIndex = this.#imagesInUse.indexOf(this.activeImage);
                    imageIndex++;

                    if (imageIndex > 3) imageIndex = 0;
                    this.state = Lift.State[imageIndex];
                    this.activeImage = this.#imagesInUse[imageIndex];
                    break;
                }
            }

        }
    }
}