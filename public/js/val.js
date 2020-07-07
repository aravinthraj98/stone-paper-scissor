 const socket=io();
 const {username,room}=Qs.parse(location.search,{
    ignoreQueryPrefix:true
})
 socket.on('message',message=>{
     console.log(message);
 });
 socket.emit('joinroom',{username,room});
 socket.on('roomfull',message =>{
      alert(message);
      window.location.href='index.html';
 });
 socket.on('username',message=>{
     console.log(message);
 });
 socket.on('userleft',message=>{
     console.log(message);
 });
 function choosen(value){
     console.log(value);
     let button=document.getElementById('stone');

     button.disabled=true;
     let button1=document.getElementById('paper');
     button1.disabled=true;
     let button2=document.getElementById('scissor');
     button2.disabled=true;

     //button.disabled;
     console.log(value);

socket.emit('choice',{room,value});
 }