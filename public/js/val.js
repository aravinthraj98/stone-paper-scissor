 const socket=io();
 
 const {username,room}=Qs.parse(location.search,{
    ignoreQueryPrefix:true
})
const ranuser=room.split('-');
if(ranuser[0]==='random'){
    socket.emit('randomroom',room)
    socket.on('roomalot',message=>{
        window.location.href=`play.html?username=${username}&room=${message}`;
      });
      
}
else{
 socket.on('message',message=>{
    document.getElementById('wel').innerHTML+='<br>'+message;
 });
socket.on('opp-join',message=>{
 document.getElementById('opp').innerHTML=message;
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
 socket.on('result',message=>{
     document.getElementById('opponent').innerHTML=`opponent has choosen${message.ochoose}`;
     var wins='opponent';
 if(message.winner===username){
   var wins='you';
 }
 else if(message.winner==='both'){
    wins='both'
 }
 document.getElementById('restart').style.display='';
 document.getElementById('result').innerHTML=`${wins} won the game`;
 });

 function choosen(value){
     console.log(value);
     let button=document.getElementById('stone');

     button.disabled=true;
     let button1=document.getElementById('paper');
     button1.disabled=true;
     let button2=document.getElementById('scissor');
     button2.disabled=true;
    document.getElementById('you').innerHTML=`you have choosen ${value}`
     //button.disabled;
     console.log(value);

socket.emit('choice',{room,value});
 }
 function restart(){
    let button=document.getElementById('stone');

    button.disabled=false;
    let button1=document.getElementById('paper');
    button1.disabled=false;
    let button2=document.getElementById('scissor');
    button2.disabled=false;
    document.getElementById('restart').style.display='none';
    document.getElementById('result').innerHTML=``;
    document.getElementById('you').innerHTML=``;
    document.getElementById('opponent').innerHTML=``;





 }
}