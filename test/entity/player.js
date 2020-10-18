const logger = require("rages-node.js-logger");

function player(id, radius,species, pos, name, hp) {

    this.id = id;

    this.radius = radius;
    this.xp = 1000000;
    this.pos = pos;
    this.name = name;
this.species = species;
    this.type = 2; //object type (animal. hill bush)
    this.secondaryType = 46; //mouse - animal species
    this.biome = 0;
    this.isBiome = false;

    this.angle = 0;
    this.hp = hp;

    this.hurt = 0;
    this.flags = 0;   // 0 = land // 1 = water //2 = arctic //25 = lava
};


player.prototype = {

    //player functions here
    getStats: function() {

        return {
            type: this.type, //animal
            secondaryType: this.secondaryType, //animal species (mouse, rabbit, pig)
            id: this.id,
            radius: this.radius,
            x: this.x,
            y: this.y,
            biome: this.biome,
            isBiome: this.isBiome,
            angle: this.angle,
            name: this.name,
            hp: this.hp,
            hurt: this.hurt,
            flags: this.flags,
        };

    },

















	updateAngle: function(target){

		var dy = this.pos.y - target.y;
  var dx = this.pos.x - target.x;

// console.log(dx + ':'+dy)

if (dx + dy > 3){


  var theta = Math.atan2(dy, dx); // range (-PI, PI]
  theta *= 180 / Math.PI; // rads to degs, range (-180, 180]
  if (theta < 0) theta = 360 + theta; // range [0, 360)
  this.angle = theta;


}  
if (dx + dy < -3){


    var theta = Math.atan2(dy, dx); // range (-PI, PI]
    theta *= 180 / Math.PI; // rads to degs, range (-180, 180]
    if (theta < 0) theta = 360 + theta; // range [0, 360)
    this.angle = theta;
  
  
  }  
 
     
},
    


};

logger('info','Player Module Loaded')

module.exports = player;