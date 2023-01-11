class ResourceLoader {

  statsFont = new FontFace('statsFont', 'url(./resources/fonts/Exo2-Bold.ttf)');
  resourcePath = "resources/sprites/"
  resources = new Map();
  gameObjectSprites = [
    "PlonkBlue.png", "PlonkGreen.png", "PlonkRed.png", "PlonkYellow.png",
    "Plonk.png"
  ]
  constructor(){
  }

  #loadImage = (path)=> {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.src = path
      img.onload = () => resolve(img)
    });
  }

  #loadFonts = new Promise((resolve,reject)=>{
    this.statsFont.load().then((font)=>{
      document.fonts.add(font);
      console.log("fonts loaded");
      resolve();
    }, ()=>{
      reject();
    });
  })
    
  #loadSprites = new Promise((resolve, reject)=>{
    const promises = this.gameObjectSprites.map(sprite => this.#loadImage(this.resourcePath+sprite))
    Promise.all(promises).then((images)=>{
      for (let i = 0; i < images.length; i++) {
        this.resources.set(this.gameObjectSprites[i], images[i])
      }
      resolve();
    }, ()=>{
      reject();
    })
  })

  loadResources = new Promise((resolve, reject)=> {
    Promise.all([this.#loadFonts, this.#loadSprites]).then(resolve, reject);
  })
}