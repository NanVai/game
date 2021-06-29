class Game{
    constructor(){

    }
    getState() {
        var gameStateRef = database.ref('gameState');
        gameStateRef.on("value", function (data) {
            gameState = data.val();
        })

    }

    update(state) {
        database.ref('/').update({
            gameState: state
        });
    }
    async start() {
            if (gameState === 0) {
                player = new Player();
                var playerCountRef = await database.ref('playerCount').once("value");
                if (playerCountRef.exists()) {
                    playerCount = playerCountRef.val();
                    player.getCount();
                }
                form = new Form()
                form.display();
            }
    player1 = createSprite(200,780);
    player1.addImage("player1",p1_img);
    player1.visible=true;
    player1.scale=0.6;
    player1.setCollider("circle",0,0,50);
   // player1.debug = true

    player2 = createSprite(800,780);
    player2.addImage("player2", p2_img);
    player2.scale=0.5;
    player2.setCollider("circle",0,0,50);
    //player2.debug = true
    players=[player1,player2];

        }
    
    play(){
        
                form.hide();

                Player.getPlayerInfo();
                 image(back_img, 0, 0, 1000, 800);
                 var x =100;
                 var y=200;
                 var index =0;
                 drawSprites();
                 for(var plr in allPlayers){
                    
                    
                     index = index+1;
                     x = 500-allPlayers[plr].distance;
                     y=500;
                     
                     players[index -1].x = x;
                     players[index - 1].y = y;
                       
                     if(index === player.index){
                         
                         fill("black");
                         textSize(25);
                         text(allPlayers[plr].name ,x-25,y+25);

                         
                     }
                    
                         textSize(25);
                         fill("white");
                         text("Player 1 :" +allPlayers.player1.score,50,50);
                        text("Player 2 :" + allPlayers.player2.score, 50, 100);
                 
                 }
                
                
                 

                if (keyIsDown(RIGHT_ARROW) && player.index !== null) {
                    player.distance -= 10
                    player.update();
                }
                if (keyIsDown(LEFT_ARROW) && player.index !== null) {
                    player.distance += 10
                    player.update();
                }
            
                 if (frameCount % 20 === 0) {
                     eggs = createSprite(random(100, 1000), 0, 100, 100);
                     eggs.velocityY = 6;
                     eggs.scale=0.2;
                     eggs.addImage("egg2", egg2_img);
                         
                         
                     eggGroup.add(eggs);
                     
                 }
                 
                  if (player.index !== null) {
                      for (var i = 0; i < eggGroup.length; i++) {
                          if (eggGroup.get(i).isTouching(players)) {
                              eggGroup.get(i).destroy();
                              player.score =player.score+1;
                              player.update();
                              
                          }
                          
                      }
                  }
                

         
         
        
         

    }

    end(){
       console.log("Game Ended");
    }
}