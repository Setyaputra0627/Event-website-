function login(){
let user=username.value;
let pass=password.value;

if(user=="Admin Gabut" && pass=="Admin#123"){
window.location="menu.html";
return;
}

localStorage.setItem("peserta",user);
window.location="welcome.html";
}

function saveScore(eventName,score){
let user=localStorage.getItem("peserta");
let data=JSON.parse(localStorage.getItem("leaderboard")||"{}");
if(!data[user]) data[user]={event1:0,event2:0,event3:0};
data[user][eventName]=score;
localStorage.setItem("leaderboard",JSON.stringify(data));
alert("Score tersimpan!");
}
