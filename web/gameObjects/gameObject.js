class GameObject{

  static Status = Object.freeze({
    Created: Symbol("created"),
    Activated : Symbol("activated"),
    Settled: Symbol("settled"),
    Dropped: Symbol("dropped"),
    Deactivated: Symbol("deactivated"),
    Destroyed: Symbol("destroyed")
  })

  static StartPositionX = Object.freeze({
    "0" : 0,
    "1" : 1,
    "2" : 2,
    "3" : 3,
    "4" : 4,
    "5" : 5,
    "6" : 6
  })

  #id = null;
  #type = null;
  #status = null;
  #position = {
    x:null,
    y:null
  }
  #images = {};
  #activeImage = null;

  
  get id(){
    return this.#id;
  }

  get type(){
    return this.#type;
  }

  set type(type){
    this.#type = type;
  }

  /**
   *
   * @returns {null}
   */
  get activeImage(){
    return this.#activeImage;
  }

  /**
   *
   * @param index
   */
  set activeImage(index){
    this.#activeImage = index;
  }

  get images(){
    return this.#images;
  }

  /**
   * @param {images} images
   */
  set images(images){
    this.#images = images;
  }

  /**
   * @returns {Status}
   */
  get status(){
    return this.#status;
  }

  /**
   * @param {Status} status
   */
  set status (status){
    this.#status = status;
  }

  /**
   * @returns {{x: null, y: null}}
   */
  get position(){
    return this.#position;
  }
  
  /**
   * @param {position} position
   */
  set position(position){
    this.#position = position;
  }
 
  constructor(status,position){
    this.#id = self.crypto.randomUUID();
    this.#status = status;
    this.#position = position;
  }
}