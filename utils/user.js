users=[];
player=[];
choicearr=[];

function user(username,room,id){
    users.push({username,
        room,
        id});
   /* return {
        username,
        room,
        id
    }*/
    let usercheck=player.findIndex(user=> user.room===room);
    if(usercheck !==-1){
        const insert=player.find(user=> user.room === room);
        if(insert['no']!==2){
            if(insert['player1']==username){
                username=username+'2';
            }

      
        //const insert1={'player1':insert['player1'],'player2':username,'p1id':insert['p1id'],'p2id':id,'room':room};
        insert['p2id']=id;
        insert['player2']=username;
        insert['no']=2;

        //player.push(insert);
    }
        
    }
    else{
    
    let players={'player1':username,'player2':'','p1id':id,'p2id':'','room':room,'no':1};
    player.push(players);
}
    
    return users.find(user=> user.id===id);
}
function playarea(room){
  return player.find(user=> user.room===room)
}
function playerchoice(room,choice,id){
    let checkchoice=choicearr.findIndex(user => user.room===room);
    if(checkchoice === -1){
        const choices={'choice1':'','choice2':'','room':room,'both':'no'};
        choicearr.push(choices);
    }
    const findp=player.find(user => user.room===room);
    const choices=choicearr.find(user=>user.room===room);
    if(findp['p1id']===id){
       
      choices['choice1']=choice;
      if(choices['choice2'].length>=2){
          choices['both']='yes';
          return choices;
      }
    }
    else{
        choices['choice2']=choice;
        if(choices['choice1'].length>=2){
            choices['both']='yes';
        return choices;}
    }
    return choices;
}
function winner(choice1,choice2,room){
    const insert=player.find(user=> user.room === room);

    const choiceempty=choicearr.find(user=>user.room===room);
    choiceempty['choice1']='';
    choiceempty['choice2']='';
    choiceempty['both']='no';
    if(choice1===choice2){
        return {'winner':'both','room':room,'wchoice':choice1,'lchoice':choice2};
    }
    else if((choice1=='stone' && choice2=='paper' || choice1=='paper' && choice2=='stone')||(choice1=='scissor' && choice2=='paper' || choice1=='paper' && choice2=='scissor' ) ){
        let element= 'stone';
        let element1='scissor';
        if(choice1==element){
            return {'winner':insert['player2'],'room':room,'lchoice':choice1,'wchoice':choice2};
        }
        
        if(choice1==element1){
           return  {'winner':insert['player1'],'room':room,'lchoice':choice2,'wchoice':choice1}
       }
       else if(choice1=='paper' && choice2=='scissor'){
        return {'winner':insert['player2'],'room':room,'lchoice':choice1,'wchoice':choice2};

       }
        else{
            return {'winner':insert['player1'],'room':room,'lchoice':choice2,'wchoice':choice1};
                    }
    }
    else if(choice1=='stone' && choice2 == 'scissor' || choice1=='scissor' && choice2 == 'stone'){
        let element= 'stone';
        if(choice1==element ){
            return  {'winner':insert['player1'],'room':room,'lchoice':choice2,'wchoice':choice1}

        }
        else{
            return {'winner':insert['player2'],'room':room,'lchoice':choice1,'wchoice':choice2};

                    }
    }
}
function userleft(id){
    const user=users.findIndex(user => user.id===id);
    if(user !==-1){
        const userf=users.splice(user,1);
      
    
   
    const playera=player.find(user => user.room ===userf[0].room);
 
    if(playera['p1id']===id){
       const leftname2= playera["player2"];
        playera["player1"]= playera["player2"];
        playera["p1id"]=playera["p2id"];
        playera["player2"]='';
        playera["p2id"]='';
        playera["no"]=1;
        
        if(playera['player1'].length===0){
            let index=player.find(user => user.room ===userf[0].room);
            const remove= player.splice(index,1);
            return  playera;
        }
        
       
        return playera;
    }
    else{
        playera['player2']='';
        playera['p2id']='';
        playera['no']=1;
    }
    return playera;
}
}
module.exports={ user,
    playarea,playerchoice,winner,userleft};
   
