const express=require('express');
const app=express();
const http=require('http')
const server=http.createServer(app);
const path=require('path');
const socketio=require('socket.io');
app.use(express.static(path.join(__dirname,'public')))
const io=socketio(server);
const {user,playarea,playerchoice,winner}=require('./utils/user')
io.on('connection',socket=>{
  
    socket.emit('message','hiii');
    socket.on('joinroom',({username,room})=>{
        const userf=user(username,room,socket.id);
        const playr=playarea(room);
        socket.join(room);
        socket.emit('message','welcome to game room');
        socket.broadcast.to(room).emit('message',`${username} has joined the game`)
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
            const winning={'player1':pchoice.choice1,'player2':pchoice.choice2};
            console.log(win);
        }
       
    })
});

server.listen(8080,()=>{
    console.log('jjj');
});
