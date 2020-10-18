class obj {
    constructor(id, radius, x, y, type, secondaryType, biome,rectW,rectH) {
        this.id = id;
        this.radius = radius;
        this.x = x;
        this.y = y;
        this.type = type; //object type (animal. hill bush)
        this.secondaryType = secondaryType; //mouse - animal species
        this.biome = biome;
        this.isBiome = false;
        this.angle = 0;
        this.hp = 100;
        this.hurt = 0;
        this.flags = 27;
        this.rectW = rectW;
        this.rectH = rectH
      
    };
    
  
  
    }
  
  module.exports = obj;