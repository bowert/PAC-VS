	var timer;
	
	var start = false;
	var pacman = new player();
	var ghost1 = new player();
	var ghost2 = new player();
	var ghost3 = new player();
	var ghost4 = new player();
	
	var isPac = false;
	var moving = false;
	var powerup = false;
	
	var currentGhost = 1;
	var offsetConv = 0;
	var pelletsEaten = 0;
	var powerpelletsEaten = 0;
	
	var globalMazeGrid = [
			"0000000000000000000",
			"0911c111709111c1170",
			"0100100010100010010",
			"0d11e111a1a111e11b0",
			"0100101000001010010",
			"0811b081709160d1160",
			"0000100010100010000",
			"00001091a1a17010000",
			"0000101000001010000",
			"q111e1b0   0d1e111p",
			"0000101000001010000",
			"000010d11111b010000",
			"0000101000001010000",
			"0911e1b17091b1e1170",
			"0100100010100010010",
			"0870d1c1a1a1c1b0960",
			"0010101000001010100",
			"09a1608170916081a70",
			"0100000010100000010",
			"08111111a1a11111160",
			"0000000000000000000",
		];
		
	var pelletMazeGrid = [
			"0000000000000000000",
			"0pppppppp0pppppppp0",
			"0b00p000p0p000p00b0",
			"0ppppppppppppppppp0",
			"0p00p0p00000p0p00p0",
			"0pppp0ppp0ppp0pppp0",
			"0000p000x0x000p0000",
			"0000p0xxxxxxx0p0000",
			"0000p0x00000x0p0000",
			"xxxxpxx0xxx0xxpxxxx",
			"0000p0x00000x0p0000",
			"0000p0xxxxxxx0p0000",
			"0000p0x00000x0p0000",
			"0pppppppp0pppppppp0",
			"0p00p000p0p000p00p0",
			"0bp0ppppppppppp0pb0",
			"00p0p0p00000p0p0p00",
			"0pppp0ppp0ppp0pppp0",
			"0p000000p0p000000p0",
			"0ppppppppppppppppp0",
			"0000000000000000000",
		];
	
	
	newgame();
	main();

	
	function moveChar(nm, nmchar){
		document.onkeydown = checkKey;

		with(nm) {
			
			if(offsetConv == 1){
				if (ibuffer == 1) { //left
					if(isClear(1)){
						dir = 1;
						dx = -1;
						dy = 0;
					}
				}
				else if (ibuffer == 2) { //up
					if(isClear(2)){
						dir = 2;
						dy = -1;
						dx = 0;
					}
				}
				else if (ibuffer == 3) { //right
					if(isClear(3)){
						dir = 3;
						dx = 1;
						dy = 0;
					}
				}
				else if (ibuffer == 4) { //down
					if(isClear(4)){
						dir = 4;
						dy = 1;
						dx = 0;
					}
				}
			}
			
			if (ofx + ofy == 0) 
				move();
			if (moving){
				//adjust deltas	
			}	
			drawMap();
			
			if(moving){
				if(offsetConv > 26){
					oldofx = ofx;
					oldofy = ofy;
				}
				console.log(nmchar);
				switch(dx) {
				case 1:
					var mazeI = mazeGrid[y].charAt(x);
					if(mazeI == '0'){
						dir = 0;
						dx = 0;
						dy = 0;
					}
					else{
						//console.log(mazeI);
						ofx++;
						if (offsetConv > 26){	
							x++;
						}
					}
					break;
				case -1:
					var mazeI = mazeGrid[y].charAt(x-2);
					if(mazeI == '0'){
						dir = 0;
						dx = 0;
						dy = 0;
					}
					else{
						ofx--;
						if (offsetConv > 26){
							x--;
						}
						break;
					}
						default:
						// not supposed to happen
						
				}
				switch(dy) {
					case 1:
						var mazeY = globalMazeGrid[y+1].charAt(x-1);
						if(mazeY == '0'){
							dir = 0;
							dx = 0;
							dy = 0;
						}
						else{
							if (offsetConv > 26){
								y++;
							}
							ofy++;

						}
						break;
					case -1:
						var mazeY = mazeGrid[y-1].charAt(x-1);
						if(mazeY == '0'){
							dir = 0;
							dx = 0;
							dy = 0;
						}
						else{
							if (offsetConv > 26){
								y--;
							}
							ofy--;
						}
						break;
					default:
						// not supposed to happen
				}
				
				if(offsetConv > 26){
					telePac(x, y, nmchar);
					offsetConv = 0;
						var mazeI = globalMazeGrid[y].charAt(x-1);
						var pmazeI = pelletMazeGrid[y].charAt(x-1);
						if (pmazeI == 'p'){
							pelletsEaten++;
							pelletMazeGrid[y] = pelletMazeGrid[y].substr(0, x-1) + 'x' + pelletMazeGrid[y].substr(x);

						}
						else if(pmazeI == 'b'){
							powerpelletsEaten++;
							pelletMazeGrid[y] = pelletMazeGrid[y].substr(0, x-1) + 'x' + pelletMazeGrid[y].substr(x);
							powerup = true;	
						}
						if(mazeI == 'q'){
							teleport(nm, 'q');
						}
						else if(mazeI == 'p'){
							teleport(nm, 'p');
						}
				}
				//telePac(x, y, nmchar);
				offsetConv++;
					
			}
			if(pelletsEaten == 147){	//Victory condition
				console.log("victory!");
			}
			//drawChar(x, y, nmchar);
			drawCharSpec(ofx, ofy, nmchar);
		}
	}
	
	function teleport(user, entr){
		with(user){
			console.log(x);
			if (((dir == 1) && (entr == 'q')) || (x < 0)){
				x = 20;
			}
			if (((dir == 3) && (entr == 'p')) || (x > 20)){
				x = 0;
			}
		}
	}
	
	function isClear(newDir){
		var isClear = true;
		with(pacman){
		switch(newDir) {
				case 1:
					var mazeI = mazeGrid[y].charAt(x-2);
					if(mazeI == '0'){
						isClear = false;
					}
					else{
						isClear = true;
					}
					break;
				case 2:
					var mazeI = mazeGrid[y-1].charAt(x-1);
					if(mazeI == '0'){
						isClear = false;
					}
					else{
						isClear = true;
					}
					break;
				case 3:
					var mazeI = mazeGrid[y].charAt(x);
					if(mazeI == '0'){
						isClear = false;
					}
					else{
						isClear = true;
					}
					break;
				case 4:
					var mazeI = mazeGrid[y+1].charAt(x-1);
					if(mazeI == '0'){
						isClear = false;
					}
					else{
						isClear = true;
					}
					break;
			}
		}
		return isClear;
	}
	
	function telePac (row, col, nm) {
		with(pacman){

			ofx = 374+(26*x)+13;
			ofy = (26*(y))+13;
			/*
			switch(dir) {
				case 1:
					ofx = 374+(26*x)+13;
					break;
				case 2:
					ofy = (26*(y))+13;
					break;
				case 3:
					ofx = 374+(26*x)+13;
					break;
				case 4:
					ofy = (26*(y))+13;
					break;
		}
		*/
		
		//drawCharSpec(ofx, ofy, nm);
		//drawChar(x, y, nm);
	}
	}
	
	function drawChar (row, col, nm){
		drawSprite(374+(26*row), (26*col), nm);
	}
	
	function drawCharSpec (x, y, nm){
		drawSprite(x-13, y-13, nm);
	}
	
	function drawSprite(x, y, nm){
		var canvas = document.getElementById("map");
		var ctx = canvas.getContext("2d");
		var img = document.getElementById(nm);
		

		ctx.drawImage(img, x, y);

	}
	
	function drawTile(x,y){
		this.context.fillRect(x * this.tileSize, y * this.tileSize,
			this.tileSize, this.tileSize);
	}
	
	function drawMap(){
		var canvas = document.getElementById("map");
		var ctx = canvas.getContext("2d");
		var i;
		var mazeGrid = [
			"0000000000000000000",
			"0911c111709111c1170",
			"0100100010100010010",
			"0d11e111a1a111e11b0",
			"0100101000001010010",
			"0811b081709160d1160",
			"0000100010100010000",
			"00001091a1a17010000",
			"0000101000001010000",
			"q111e1b0   0d1e111p",
			"0000101000001010000",
			"000010d11111b010000",
			"0000101000001010000",
			"0911e1b17091b1e1170",
			"0100100010100010010",
			"0870d1c1a1a1c1b0960",
			"0010101000001010100",
			"09a1608170916081a70",
			"0100000010100000010",
			"08111111a1a11111160",
			"0000000000000000000",
		];
		
		for (i = 0; i < (mazeGrid.length); i++) {
			var o;
			for(o = 0; o < 19; o++) {
				var mazeI = mazeGrid[i].charAt(o);
				var pmazeI = pelletMazeGrid[i].charAt(o);
				if (mazeI == '0'){
					ctx.fillStyle = "#2121DE";
					ctx.fillRect(400+o*26, i*26, 26, 26);
				}
				else if ((mazeI == '1') || (mazeI == '9') || (mazeI == '8') || (mazeI == '6') || (mazeI == '7') || (mazeI == 'a') || (mazeI == 'p') || (mazeI == 'q') || 
				(mazeI == 'b') || (mazeI == 'c') || (mazeI == 'd') || (mazeI == 'e')){
					ctx.fillStyle = "#000000";
					ctx.fillRect(400+o*26, i*26, 26, 26);
				}
				if(pmazeI == 'p'){
					var img = document.getElementById("pellet");
					ctx.drawImage(img, 400+o*26, i*26);		
				}
				else if(pmazeI == 'b'){
					var img = document.getElementById("powerpellet");
					ctx.drawImage(img, 400+o*26, i*26);		
				}
				
				
			}
			
			
		}
	}
	
	function newgame(){
		start = true;
		drawMap();
		resetPac();
		resetGhost(ghost1, "ghost1");
		moving = true;
		pelletsEaten = 0;
	}	
	
	function resetPac() {
		with(pacman){
			drawChar(10, 11, "pacman");
			x = 10; //647
			y = 11; //299
			dx = 0;
			dy = 0;
			ofx = 647;
			oldofx = 647;
			ofy = 299;
			oldofy = 299;
		}
	}
	function resetGhost(nm, nm2){
		with(nm){
			drawChar(10, 11, nm2);
			x = 10; //647
			y = 7; //299
			dx = 0;
			dy = 0;
			ofx = 647;
			oldofx = 647;
			ofy = 182;
			oldofy = 182;
		}
	}
		
		
	
	
	function player() {
			this.x = 0;
			this.y = 0;
			this.dir = 0;
			this.dx = 0;
			this.dy = 0;
			this.ofx = 0;
			this.ofy = 0;
			this.ofy = 0;
			this.oldofy = 0;
			this.alive = true;
			this.ibuffer = 0;
	}
	
	function checkKey(e) {
		e = e || window.event;
		var pname;
		var pnameChar;
		if(isPac){
				pname = pacman;
				pnameChar = "pacman";
			}else{
				if(currentGhost == 1){
					pname = ghost1;
					pnameChar = "ghost1";
				}else if(currentGhost == 2){
					pname = ghost2;
					pnameChar = "ghost2";
				}else if(currentGhost == 3){
					pname = ghost3;
					pnameChar = "ghost3";
				}else if(currentGhost == 4){
					pname = ghost4;
					pnameChar = "ghost4";
				}
			}
		
		with(pname){
			if (e.keyCode == '37') { //left
				ibuffer = 1;
			}
			else if (e.keyCode == '38') { //up
				ibuffer = 2;
			}
			else if (e.keyCode == '39') { //right
				ibuffer = 3;
			}
			else if (e.keyCode == '40') { //down
				ibuffer = 4;
			}
		}
		
	}

	
	function main(){

		if(timer) clearTimeout(timer);
		
			
			if(isPac){
				moveChar(pacman, "pacman");
			}else{
				if(currentGhost == 1){
					moveChar(ghost1, "ghost1");
				}else if(currentGhost == 2){
				
				}else if(currentGhost == 3){
				
				}else if(currentGhost == 4){
				
				}
			}
		//if (gameOn) {
			pacTimer= setTimeout("main()", 6);
		//}
	}