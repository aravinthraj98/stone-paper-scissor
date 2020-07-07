 const socket=io();
 const {username,room}=Qs.parse(location.search,{
    ignoreQueryPrefix:true
})
 socket.on('message',message=>{
     console.log(message);
 });
 socket.emit('joinroom',{username,room});
 function choosen(value){
     console.log(value);
socket.emit('choice',{room,value});
 }