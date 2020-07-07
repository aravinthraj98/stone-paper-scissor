const express=require('express');
const app=express();
const http=require('http')
const server=http.createServer(app);
const path=require('path');
const socketio=require('socket.io');
app.use(express.static(path.join(__dirname,'public')))
const io=socketio(server);
const {user,playarea,playerchoice,winner,userleft}=require('./utils/user')
io.on('connection',socket=>{
  
    socket.emit('message','hiii');
    socket.on('joinroom',({username,room})=>{
        const userf=user(username,room,socket.id);
        const playr=playarea(room);

        if(socket.id===playr.p1id || socket.id===playr.p2id ){
        socket.join(room);
        socket.emit('message','welcome to game room');
        if(socket.id===playr.p1id){
        socket.emit('username',playr.player1);}
        else{
            socket.emit('username',playr.player2); 
        }
        socket.broadcast.to(room).emit('message',`${username} has joined the game`);
    }
        else{
            socket.emit('roomfull','sry the room is currently full');
        }
        if(playr.player2.length >=3){
            socket.emit('message',`${playr.player1} in the game`);
        }

       /* console.log(userf);
        console.log(userf);
        console.log(playr);*/
    });
    socket.on('choice',({room,value})=>{
        const pchoice=playerchoice(room,value,socket.id);
        console.log(pchoice);
        if(pchoice.both=='yes'){
            const win=winner(pchoice.choice1,pchoice.choice2,room)
            const winning={'player1':pchoice.choice1,'player2':pchoice.choice2,'winner':win.winner};
            io.to(win.room).emit('result',winning)
            console.log(win);
        }
       
    })
    socket.on('disconnect',() =>{
    const left=userleft(socket.id);
    console.log(left);
       io.emit('userleft',`a user ${left} left`);

       
    });
});

server.listen(8080,()=>{
    console.log('jjj');
});
