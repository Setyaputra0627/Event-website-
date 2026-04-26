// ================= LOGIN =================
function login(){
let user=document.getElementById("username").value;

if(user.trim()==""){
alert("Isi username dulu!");
return;
}

localStorage.setItem("username",user);

// cek admin
let admin=confirm("Apakah kamu admin?");
if(admin){
let pass=prompt("Masukkan password admin:");
if(pass==="Admin#123"){
localStorage.setItem("admin","yes");
location.href="admin.html";
return;
}
}

location.href="welcome.html";
}

function nextPage(){ location.href="events.html"; }

// ================= TIMER =================
let time=0;
let timer;

function startTimer(){
timer=setInterval(()=>{
time++;
let t=document.getElementById("timer");
if(t) t.innerText=time+" detik";
},1000);
}

// keluar tab = auto submit
document.addEventListener("visibilitychange",()=>{
if(document.hidden && document.getElementById("quiz")){
finishQuiz();
}
});
// aktifkan warning hanya saat halaman quiz
if(document.getElementById("quiz")){
window.onbeforeunload = function () {
return "Keluar dari quiz?";
};
}

// ================= DATA SOAL FULL =================
const questions=[
["Aljabar\nJika 3x + 7 = 25, maka nilai x adalah ...","6","14","-6","A"],
["Pecahan\nHasil dari (3/4) + (5/6) adalah ...","1 7/13","4 6/9","9 8/9","A"],
["SPLDV\nx + y = 18\nx − y = 4\nNilai x dan y adalah ...","x=11 y=7","x=11 y=-7","x=8 y=7","A"],
["Perbandingan\nUmur Ani : Budi = 3 : 5.\nBudi 15 tahun.\nUmur Ani adalah ...","10 tahun","9 tahun","13 tahun","B"],
["Luas Segitiga\nAlas 12 cm & tinggi 8 cm.\nLuas = ...","78 cm²","34 cm²","48 cm²","C"],
["Bilangan Bulat\n(-7)+15-9 = ...","-9","-7","-1","C"],
["Pangkat\n2⁴ + 2⁵ = ...","128","57","67","A"],
["Keliling Lingkaran\nr=7 cm, π=22/7\nKeliling = ...","44 cm","89 cm","59 cm","A"],
["SPLDV Cerita\nJumlah 20 selisih 4\nBilangan terbesar = ...","11","12","13","B"],
["Statistika\nRata-rata 6,8,7,9,10 = ...","8","67","35","A"]
];

// ================= GENERATE QUIZ =================

let score=0;
let answeredQuestions={};

if(document.getElementById("quiz")){
startTimer();

let html="";
questions.forEach((q,i)=>{
html+=`
<div class="soal" id="soal${i}">
<p style="white-space:pre-line"><b>${i+1}. ${q[0]}</b></p>

<button onclick="answer(${i},this,'A','${q[4]}')">A. ${q[1]}</button>
<button onclick="answer(${i},this,'B','${q[4]}')">B. ${q[2]}</button>
<button onclick="answer(${i},this,'C','${q[4]}')">C. ${q[3]}</button>
</div><br>
`;
});

document.getElementById("quiz").innerHTML=html;
}

// ================= PILIH JAWABAN =================
function answer(index,btn,choice,correct){

// kalau soal sudah dijawab → ga bisa klik lagi
if(answeredQuestions[index]) return;
answeredQuestions[index]=true;

let box=document.getElementById("soal"+index);
let buttons=box.querySelectorAll("button");

// warnai semua tombol
buttons.forEach(b=>{
if(b.innerText[0]===correct){
b.style.background="#00c853"; // hijau benar
}else{
b.style.background="#ff5252"; // merah salah
}
});

// tambah score kalau benar
if(choice===correct) score+=10;
}

// ================= FINISH QUIZ =================
function finishQuiz(){
clearInterval(timer);

let user=localStorage.getItem("username");
let data=JSON.parse(localStorage.getItem("leaderboard")||"[]");

data.push({user:user,score:score,time:time});

// ranking: score terbesar + waktu tercepat
data.sort((a,b)=> b.score-a.score || a.time-b.time);

localStorage.setItem("leaderboard",JSON.stringify(data));

alert("SELAMAT ANDA TELAH MENGIKUTI EVENT PERTAMA!\nTunggu nilai di grup ya!");
location.href="events.html";
}

// ================= LEADERBOARD ADMIN =================
if(document.getElementById("leaderboard")){
if(localStorage.getItem("admin")!=="yes"){
location.href="index.html";
}

let data=JSON.parse(localStorage.getItem("leaderboard")||"[]");
let html="<h2>🏆 LEADERBOARD EVENT 1</h2><br>";

data.forEach((d,i)=>{
html+=`${i+1}. ${d.user} | Score: ${d.score} | Time: ${d.time}s <br><br>`;
});

document.getElementById("leaderboard").innerHTML=html;
  }

function resetLeaderboard(){
if(confirm("Yakin hapus semua score?")){
localStorage.removeItem("leaderboard");
alert("Leaderboard berhasil dihapus!");
location.reload();
}
}
