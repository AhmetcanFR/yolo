const logger = require("rages-node.js-logger");

function writer() {
    //nothin
    this.a = 0;
};

writer.prototype = {
    //write ( val, offset );
    firstConnect: function(playersNum, serverVer) {
        var buf = new Buffer(7);
        buf.writeUInt8(1, 0); //type  0
        buf.writeUInt8(0, 1); //game mode
        buf.writeUInt8(0, 2); //game state
        buf.writeUInt16BE(playersNum, 3, false); //game state  3,4
        buf.writeUInt16BE(serverVer, 5, false); //game state  5,6
        return buf;


    },

    sendJoin: function(zoom) {
        var buf = new Buffer(13);
        buf.writeUInt8(3, 0); //type 3
        buf.writeUInt8(1, 1); //spectating 
        buf.writeUInt16BE(2000, 2, false); //game width
        buf.writeUInt16BE(2000, 4, false); //game height
        buf.writeUInt8(0, 6); //game mode
        buf.writeUInt16BE(0, 7, false); //cam x
        buf.writeUInt16BE(0, 9, false); //cam y
        buf.writeUInt16BE(zoom, 11, false); //cam zoom
        return buf;
    },

    choice: function() {
		let choicetest = new Buffer(7);
		choicetest.writeUInt8(24,0); 
		choicetest.writeUInt8(0,1); 
		choicetest.writeUInt8(15,2); 
		choicetest.writeUInt8(100,3); 
		choicetest.writeUInt8(14,4); 
		choicetest.writeUInt8(0,5); 
		choicetest.writeUInt8(1,6);
	//

        return choicetest;
	},

    isAlive: function() {
        var buf = new Buffer(1); //spawned
        buf.writeUInt8(6, 0);
		return buf;

	},

    joinResponse: function() {
        var buf = new Buffer(3);
        buf.writeUInt8(2, 0);
        buf.writeUInt8(1, 1);
        buf.writeUInt8(0, 2);
		return buf;

    },



    removeplayer: function(id) {
	var buf = new Buffer(3)	
	buf.writeUInt16BE(id, 0, true); //delete objects count
},

	
    encode_utf8: function(s) {
        return unescape(encodeURIComponent(s));
    },

    

	


    leaderboard: function(youRank, arr) {
        var realLen = 0;
        for (var o = 0; o < arr.length; o++) {
            realLen += 2; //rank
            realLen += 2; //name length
            let val = this.encode_utf8(arr[o].name);
            var len = val.length;
            for (var ind = 0; ind < len; ind++) { //name as string in charcodes
                realLen++;
            };
            realLen += 4;
        };
		
        var off = 0;
        var buf = new Buffer(4 + realLen);
        buf.writeUInt8(8, off); //type 8
        off++;
        buf.writeUInt16BE(youRank, off, false); //own rank
        off += 2;
        buf.writeUInt8(arr.length, off); //num players on board
        off++;

        for (let i = 0; i < arr.length; i++) {

            buf.writeUInt16BE(arr[i].rank, off, false); //rank
            off += 2;

            let val = this.encode_utf8(arr[i].name);
            var len = val.length;

            buf.writeUInt16BE(len, off, false); //name length
            off += 2;

            for (var ind = 0; ind < len; ind++) { //name as string in charcodes
                buf.writeUInt8(val.charCodeAt(ind), off);
                off++;
            };

            //score
            buf.writeUInt32BE(arr[i].score, off, false);
            off += 4;

        };

        return buf;


		
    },



	
	worldUpdate: function(x, y, zoom, xp, barType, species, entityes_1s, entities_upd){
		var realOff = 0;
		 
		
   

		
		for(var i = 0; i < entityes_1s.length; i++){
			var ent = entityes_1s[i];
			
			//buf.writeUInt8(ent.type, off); //entity type
			realOff++;
			//buf.writeUInt8(ent.secondaryType, off); //entity secondary type
			realOff++;
			
			//buf.writeUInt32BE(ent.id, off, false); //id
			realOff+=4;
			//buf.writeUInt16BE(ent.radius, off, false); //radius
			realOff+=2;
			//buf.writeUInt16BE(ent.x*4, off, false); //x client registers /4
			realOff+=2;
			//buf.writeUInt16BE(ent.y*4, off, false); //y
			realOff+=2;
			
			//buf.writeUInt8(ent.biome, off); //current animal biome
			realOff++;
			
			//bit group & flags
			//buf.writeUInt8(1, off); //spawned from id(object)  bit index starts at 1
			realOff++;
			//buf.writeUInt8(ent.isBiome, off); //is rectangle obj (biome) -  set to 1 if not /-/-/ since starting bit == 1
			realOff++;
		//	buf.writeUInt8(ent.isBiome == true ? 2 : 4, off); //sends angle - angle of it is updatable not static
			realOff++;
		

			
			if(!ent.isBiome){
				//angle update
			//	buf.writeUInt8(ent.angle, off); //angle in degrees but: / 3;
			    realOff++;
			};
			
			// CUSTOM DATA
			if(!ent.isBiome){
				
				var val = this.encode_utf8(ent.name);
                var len = val.length;
				
              //  buf.writeUInt16BE(val.length, off, false);
				realOff += 2;
				
                for (var ind = 0; ind < len; ind++) {
                 //   buf.writeUInt8(val.charCodeAt(ind), off);
					realOff++;
					
                };
				
				//buf.writeUInt8(0, off);
				realOff++;
			
			};
			
			
			
			
		};
		


       




		//buf.writeUInt16BE(entities_upd.length, off, false); //count of objects to update
		    realOff += 2;
			
			for(let i = 0; i < entities_upd.length; i++){
			
			let obj = entities_upd[i];
			
			//buf.writeUInt32BE(obj.id, off, false); //objects id
			realOff += 4;
			
			
			
			//buf.writeUInt16BE(obj.x, off, false); //x *4
			realOff += 2;
			
			//buf.writeUInt16BE(obj.y, off, false); //y *4
			realOff += 2;
			
			//buf.writeUInt16BE(obj.radius, off, false); //radius *10
			realOff += 2;
			
			
			//buf.writeUInt8(0, off); //specType
			realOff++;
			
			//buf.writeUInt8((upd.hp != null)? 1:0, off); //send Hp
			realOff++;
			
			//buf.writeUInt8(upd.hurt, off); //is hurt
			realOff++;
			
			if(1 == 1){
				//buf.writeUInt8(upd.hp, off) //hp %
				realOff++;
			};
			
			realOff++;//angle
			
			//buf.writeUInt8(0, off) //spectype 1
			realOff++;
				
		    //buf.writeUInt8(0, off) //spectype 2
		    realOff++;
			
			
			//buf.writeUInt8(upd.angle, off) //angle
		    realOff++;
			
			
			//buf.writeUInt8(upd.flags, off) //flags, bleeding , biome-...... on fire...
		    realOff++;
			
		};
		
		
		realOff+=2;
		
		
		
		


		var buf = new Buffer(17 + realOff);
		//Player info  -  own player
		buf.writeUInt8(4, 0);  //type 4
		buf.writeUInt16BE(x, 1, false); //cam x
		buf.writeUInt16BE(y, 3, false); //cam y
		buf.writeUInt16BE(zoom, 5, false); //zoom
		buf.writeUInt8(0, 7); //isDevMode??? what does that mean?
		buf.writeUInt8(100, 8); //bar percentage
		buf.writeUInt8(barType, 9); //bar type:   0-WATER    1-AIR  2-LAVA  3-ICE
		buf.writeUInt32BE(xp, 10, false); //xp
        buf.writeUInt8(0, 14); //xp per_n
		
		//FIRSTSEEN OBJECTS START
		
		//Entity info
		buf.writeUInt16BE(entityes_1s.length, 15, false);
		
		var off = 17;
		
		for(var i = 0; i < entityes_1s.length; i++){
			var ent = entityes_1s[i];
			
			buf.writeUInt8(ent.type, off); //entity type
			off++;
			buf.writeUInt8(ent.secondaryType, off); //entity secondary type
			off++;
			
			buf.writeUInt32BE(ent.id, off, false); //id
			off+=4;
			buf.writeUInt16BE(ent.radius, off, false); //radius
			off+=2;
			buf.writeUInt16BE(ent.x*4, off, false); //x client registers /4
			off+=2;
			buf.writeUInt16BE(ent.y*4, off, false); //y
			off+=2;
			
			buf.writeUInt8(ent.biome, off); //current animal biome
			off++;
			
			//bit group & flags
			buf.writeUInt8(0, off); //spawned from id(object)  0 = false 1 = true
			off++;		
			
			buf.writeUInt8(ent.isBiome == true ? 1 : 0, off); //is rectangle obj (biome) -  set to 1 if not /-/-/ since starting bit == 1
			off++;

			buf.writeUInt8(ent.isBiome == true ? 0 : 1, off); //sends angle - angle of it is updatable not static
			off++;
			
			if(!ent.isBiome){
				//angle update
				buf.writeUInt8(ent.angle/3, off); //angle in degrees but: * 3;
			    off++;
			};
			
			// CUSTOM DATA
			if(ent.name.length > 0){
				
				var val = this.encode_utf8(ent.name);
                var len = val.length;
				//console.log(off)
                buf.writeUInt16BE(val.length, off, false);
				off += 2;
				
                for (var ind = 0; ind < len; ind++) {
                    buf.writeUInt8(val.charCodeAt(ind), off);
					off++;
					
                };
				
				
				
				buf.writeUInt8(species, off); //species - rarity
				off++;
			
			};
			
			
		
			
		};
		
		//FIRSTSEEN OBJECTS END
		
			
		
		
		
		
		//Update seen objects
		
		
		buf.writeUInt16BE(entities_upd.length, off, false); //count of objects to update
		off += 2;
		
		for(let i = 0; i < entities_upd.length; i++){
			
			let obj = entities_upd[i];
			
			buf.writeUInt32BE(obj.id, off, false); //objects id
			off += 4;
			
			
			
			buf.writeUInt16BE(obj.x*4, off, false); //x *4
			off += 2;
			
			buf.writeUInt16BE(obj.y*4, off, false); //y *4
			off += 2;
			
			buf.writeUInt16BE(obj.radius, off, false); //radius *10
			off += 2;
			
			
			buf.writeUInt8(0, off); //specType
			off++;
			
			buf.writeUInt8(1, off); //send Hp
			off++;
			
			buf.writeUInt8(obj.hurt, off); //is hurt
			off++;
			
			if(1 == 1){ //obj.hp if
				buf.writeUInt8(obj.hp, off) //hp %
				off++;
			};
			
			buf.writeUInt8(obj.angle/3, off) //angle *3
			off++;
			
			
			buf.writeUInt8(0, off) //spectype 1
			off++;
				
		    buf.writeUInt8(0, off) //spectype 2
		    off++;
			
			
			buf.writeUInt8(obj.angle/2, off) //look angle  - original /6
		    off++;
			
			
			buf.writeUInt8(obj.flags, off) //flags, bleeding , biome-...... on fire...
		    off++;
		//	console.log(off)
		};
		
		buf.writeUInt16BE(0, off, false); //delete objects count
			off+=2;
		
		//end of update seen objects
		
		return buf;
	},

};

/*
var o_biome_land = 1,
  o_animal = 2,
  o_hill = 3,
  o_waterSpot = 4,
  o_hidingHole = 5,
  o_hidingBush = 6,
  o_mudSpot = 7,
  o_rockHill = 8,
  o_bigHidingHole = 9,
  o_lake = 10,
  o_lakeIsland = 11,
  o_biome_ocean = 12,
  o_hidingHoleOcean = 13,
  o_abilityGObj = 14,
  o_fruitTree = 15,
  o_biome_arctic = 16,
  o_arcticIce = 17,
  o_fireBall = 18,
  o_snowBall = 19,
  o_berry = 20,
  o_water = 21,
  o_mushroom = 22,
  o_lillypad = 23,
  o_bigMushroom = 24,
  o_bigMushroomBush = 25,
  o_plankton = 26,
  o_berryBush = 27,
  o_planktonBush = 28,
  o_banana = 29,
  o_coconut = 30,
  o_raspberry = 31,
  o_pear = 32,
  o_beach = 33,
  o_biome_ocean_extraWater = 34,
  o_seaweed = 35,
  o_starfish = 36,
  o_kelp = 37,
  o_clam = 38,
  o_conchShell = 39,
  o_river = 40,
  o_volcano = 42,
  o_lava = 43,
  o_lavaLake = 44,
  o_healingStone = 46,
  o_biome_volcano = 47,
  o_arcticNut = 48,
  o_carrot = 49,
  o_watermelon = 50,
  o_watermelonSlice = 51,
  o_meatSmall = 52,
  o_meatMedium = 53,
  o_meatLarge = 54,
  // poison biome
  o_biome_poison = 55,
  o_poisonBerry = 56,
  o_spiderWeb = 57,
  o_bog = 58,
  o_poisonBall = 59,
  o_cloudBerry = 60,
  o_flock = 61,
  o_flockspot = 62,
  o_egg = 63,
  o_sleigh = 64,
  o_quill = 65,
  o_ostrichEgg = 66,
  o_waterDrop = 67,
  o_beeHive = 68,
  o_honeyComb = 69,
  o_fire = 70,
  o_fireTornado = 71,
  o_sinkHole = 72,
  o_DangerAreaCircle = 73,
  o_animalCarcass = 74,
  o_chilli = 75,
  o_safeArea = 76,
  o_spawnEgg = 77,
  o_teamStone = 78,
  o_biome_desert = 79;
*/

logger("info", "Writer loaded!");

module.exports = writer;