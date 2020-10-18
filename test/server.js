const WebSocket = require('ws');
const logger    = require("rages-node.js-logger");
const vector    = require('victor');

const writer1 = require("./writer.js");
const writer = new writer1();
const reader = require("./reader.js");
const player = require("./entity/player.js");


const wss = new WebSocket.Server({
    port: 7020
});

let oldDate = Date.now();









const nPlayers = 0;
const serverVer = 219;
const zoom = 2.021*1000;

let playersNum = 1;
let players = {};
let entities = {};

let board = [
    {score: 9999, name: "test ", rank: 1},
];


function randomNumber(min, max) {
	return Math.random() * (max - min) + min;
  }	


wss.on('connection', function connection(ws) {
    logger("log", "Player connected");
	
	ws.binaryType = 'arraybuffer';
	
	ws.seen = [];
	ws.canSend = false;
	ws.time = 0;
	
	ws.lastLen = 0;
	
	



	//ws.send(writer.choice());
	
	ws.send(writer.sendJoin(zoom)); //connection has been opened


    ws.on('message', function incoming(message) {
	   
		let data = new DataView(message);
   //     console.log(new Buffer(message));

        let MsgReader = new reader(data);

        let msgType = MsgReader.readUInt8();
		
		boostingtest = function(speedtestX, speedtestY) {

speedX = speedtestX
speedY = speedtestY

		};




		//let key = MsgReader.readUInt8();
	    mousedetect = function() {
			//boosting = false;
      


			let mouseX = MsgReader.readInt16();
		let mouseY = MsgReader.readInt16();

			
			let mwd = MsgReader.readInt16();


			let target = new vector(mouseX, mouseY);
			let clone = new vector(ws.player.pos.x, ws.player.pos.y);
	
			clone.subtract(target);
			clone.normalize();
			clone.multiply(new vector(speedX, speedY));
		  
		
			
	
		    
			 //console.log(clone);
			
			ws.player.pos.subtract(clone);
	
	
	
			ws.player.updateAngle({
				x:mouseX,
				y:mouseY,
			});
	 
			 
			players[ws.player.id] = ws.player;
			//console.log(mouseX + ":" + mouseY + ":" + mwd);
		//	console.log(players[ws.player.id].angle)
			
			entities[ws.player.id] = ws.player;
		
	}
	
		


 

        switch (msgType) {

            case 2:
			ws.time++;
			if(ws.time < 2) return;
	
			

             

			//spawn + name
                MsgReader.offsetPlus(1);
                let nameLen = MsgReader.readUInt8();

                console.log("NameLen: " + nameLen);
                let name = MsgReader.readName(nameLen);

                let canvasW = MsgReader.readUInt16();
                let canvasH = MsgReader.readUInt16();
				
				let isSpectator = MsgReader.readUInt8();
			    

				
                console.log(name + ":" + canvasW + ":" + canvasH + ":" + isSpectator);
				
				/*let id = OFbject.keys(players).length + Math.random()*10;
				if(players[id]){
					id = Object.keys(players).length + Math.random()*10;
				};*/
				
				let id = playersNum+Math.random()*10000;
				playersNum++;
			

const posxr = randomNumber(250,300)
const posyr = randomNumber(250,300)

const randomspecies = randomNumber(0,2)
  const randomsize = randomNumber(500,1250)
  let species = randomspecies


  
 //let radius = randomsize;
 let radius = 500
				let pos = new vector(posxr, posyr); // spawn pos
                  
			    let hp = 100;
              		     
				

        
				ws.player = new player(id, radius, species ,pos, name, hp);
				
			///	ws.entity = new entity(id, pos2);

            
				entities[id] = ws.player.getStats();
				             
				players[id] = ws.player;
				             
			
			

				var first = [];
			


		


				Object.keys(entities).forEach(function(da){
					first.push(entities[da]);
				});
				
				ws.lastLen = first.length;
				
				
				
				
                
				
				ws.send(writer.isAlive());

				ws.send(writer.joinResponse());
				

				ws.send(writer.leaderboard(3, board));
			
				ws.send(writer.worldUpdate(ws.player.pos.x, ws.player.pos.y, 2.021*1000, ws.player.xp, 2, ws.player.species, first, []));  //x, y, zoom, xp, barType
				//ws.send(writer.volcano_biome_minimap());
				
			
			//  console.log(first);

				Object.keys(entities).forEach(elN => ws.seen.push(elN));
				ws.canSend = true;
			
				
				
				 //can recieve update packets
				//ws.canSend = false;

			
	

			
			
                break;
			
			case 5:
			    //movement
				boostingtest(3,3);

				mousedetect();
				
   ws.on('close', function close() {
	writer.removeplayer([ws.player.id]);
	delete players[ws.player.id]
    delete entities[ws.player.id]
	
	ws.canSend = false;

	//removes player
   });


 
			break;

			

				case 19: 
                
                let msgLen = MsgReader.readUInt16();
                let msgData = MsgReader.readName(msgLen);
                
          //      console.log(msgLen, msgData, data);
               
                let chatBuf = Buffer.alloc(msgData.length + 1 + 4 + 2 + 1);
                chatBuf.writeUInt8(19, 0); //Opcode
                chatBuf.writeUInt32BE(ws.player.id, 1); //Player id
                
                //Write message text data
                chatBuf.writeUInt16BE(msgData.length, 5);
                
                for(let i = 0; i < msgData.length; i++){
                    chatBuf.writeUInt8(msgData.charCodeAt(i), 7+i);
                    
                    (i == msgData.length-1) && chatBuf.writeUInt8(0, 7+i+1); //Null terminator
                };
			 console.log( 'USER CHAT: ' + ws.player.name + 'ID: ' + ws.player.id + ': ' + msgData)
				if(this.msgData == 'a '){
					logger("log", "Player test");
				
				}
				
                //Send to all
                wss.clients.forEach(function each(client) {
                    if (client.readyState === WebSocket.OPEN) {
                        client.send(chatBuf);
                    };
                });
			  
			
				break;
				case 10:
				let server = Buffer.alloc(7);
				server.writeUInt8(10, 0);
					server.writeUInt16BE(10, 1);
					server.writeUInt16BE(0, 3);
					server.writeUInt16BE(0, 5);
		ws.send(server)
					break;
	          case 21:
				boostingtest(9,9);
			  let boost = MsgReader.readUInt8();
				
				if (boost == '1') {
					
					console.log('boosted!')
				}
					break;
				
        };
	

    });





	ws.sendMove = function(){
		if (ws.readyState === 3) {
			logger("log", "Player disconnected");
			ws.send(writer.removeplayer([ws.player.id]));
			delete players[ws.player.id]
			delete entities[ws.player.id]
		   
		ws.canSend = false;
	
	}
		if (ws.readyState === 2) {
			logger("log", "Player disconnected");
	
		
		ws.canSend = false;
		}
	//	if(!ws.canSend) return;
		if(ws.lastLen != Object.keys(entities).length){
	      	var first = [];
				
		    Object.keys(entities).forEach(function(da){
				first.push(entities[da]);
			});
		
			ws.send(writer.worldUpdate(ws.player.pos.x, ws.player.pos.y, 2.021*1000, ws.player.xp, 2,ws.player.species, first, []));  //x, y, zoom, xp, barType
        
			//	ws.send(writer.worldUpdate(ws.entity.pos2.x, ws.entity.pos2.y , 2*1000, ws.entity.xp ,0, 1, first, []));
	      
			
			ws.lastLen = first.length;
			

			Object.keys(entities).forEach(function(elN){
				
				ws.seen.push(elN)
			});
		};
	
	
	for(var i = 0; i < 3; i++){ //3x
		if(!ws.canSend) return;
			if(ws.player.pos.x < 50){
					ws.player.pos.x = 50.1;
				};
				
				if(ws.player.pos.x > 1950){
					ws.player.pos.x = 1949.9;
				};
				
				if(ws.player.pos.y < 50){
					ws.player.pos.y = 50.1;
				};
				
				if(ws.player.pos.y > 1950){
					ws.player.pos.y = 1949.9;
				};
            

				entities[ws.player.id].x = ws.player.pos.x;
				entities[ws.player.id].y = ws.player.pos.y;
				
				players[ws.player.id] = ws.player;
	

				//players[ws.player.id].angle++;
			  // logger("log",ws.player.pos.y + ":" + ws.player.pos.x)


				var newPak = [];
				

				Object.keys(entities).forEach(function(num){
				
					if(ws.seen.includes(num)){
					
						newPak.push(entities[num]);
					};
				});
				//console.log(newPak)
				//console.log(newPak)
			//	console.log(Date.now()-oldDate);
			//	oldDate = Date.now();
		

			ws.send(writer.worldUpdate(ws.player.pos.x*4, ws.player.pos.y*4, 2.021*1000, ws.player.xp, 2,ws.player.species, [], newPak));  //x, y, zoom, xp, barType
		//	ws.send(writer.worldUpdate(200*4,200*4, 2.021*1000, 10, 0, 5, [], 3,0,1000000,500,1030,900,0,false,0,' ', 100 , 0 , 27));
			};
		
		  };
		

	
				


    ws.send(writer.firstConnect(playersNum, serverVer));
	
	 setInterval(function(){
		if(!ws.canSend) return;
					ws.sendMove();
			
					
				},100);
			});


	
logger("log", "Server on!")

