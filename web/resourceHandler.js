class ResourceHandler {

  #resourcePathRoot = "resources/";
  #resourcePathSprites = "sprites/";
  #resourcePathFonts = "fonts/";

  #statsFont = new FontFace('statsFont', 'url(./'+this.#resourcePathRoot+this.#resourcePathFonts+'Exo2-Bold.ttf)');
  #resources = {
    "lift": {
      "up":{
        "filename":"up.png",
        "image": null   
      },
      "left":{
        "filename":"left.png",
        "image": null 
      },
      "down":{
        "filename":"down.png",
        "image": null     
      },
      
      "right": {
        "filename":"right.png",
        "image": null 
      },
      "red":{
        "filename":"red.png",
        "image": null   
      },
      "blue":{
        "filename":"blue.png",
        "image": null 
      },
      "yellow":{
        "filename":"yellow.png",
        "image": null     
      },
      
      "green": {
        "filename":"green.png",
        "image": null 
      }
   
    },
    "plonk":{
      "red": {
        "filename":"red.png",
        "image": null 
      },
      "yellow": {
        "filename":"yellow.png",
        "image": null 
      },
      "green": {
        "filename":"green.png",
        "image": null 
      },
      "blue": {
        "filename":"blue.png",
        "image": null 
      }
    }
  };
  
  #resourcesMap = new Map(Object.entries(this.#resources));

  constructor(){
  }

  getResources = ()=>{
    console.log("resources:", this.#resourcesMap);
    return this.#resourcesMap;
  }
  /*
  getResource = (category, key)=>{
    const categorys = this.#resourcesMap.get(category);
    console.log("category", categorys);
    //@ToDo return 
  }
*/
  #loadImage = (path, category, key)=> {
    return new Promise((resolve, reject) => {
        const img = new Image()
        img.src = path
        img.category = category;
        img.id = key;
        img.onload = () => resolve(img);
        img.onerror = () => reject();
    })
  }

  #loadFonts = async()=> {
    await this.#statsFont.load().then((font)=>{
      document.fonts.add(font);
    })
  }
    
  #loadSprites = async()=>{
    const promises = [];
    this.#resourcesMap.forEach((value,category)=>{
      for (const [key, valu] of Object.entries(value)) {
        promises.push(this.#loadImage(this.#resourcePathRoot+this.#resourcePathSprites+category+"/"+valu.filename, category, key))
      }
    })
    await Promise.all(promises).then((images)=>{
      for (let i=0, len = images.length; i<len;i++){
        this.#resources[images[i].category][images[i].id]["image"]= images[i];
      }
    })
  }

  loadResources=async()=>{
    await this.#loadSprites();
    await this.#loadFonts();
  }
}