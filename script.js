// ===============================
// DATA SOAL DARI KAMU
// ===============================
let soal = [

{
  tanya:"√50+√18-√8 : √2 = ...",
  opsi:["3√2","5","6","7"],
  jawaban:"6"
},
{
  tanya:"√27-√12+√3 = ...",
  opsi:["2√3","3√3","4√3","5√3"],
  jawaban:"4√3"
},
{
  tanya:"Perjalanan 180 km ditempuh 60 km/jam lalu sisanya 90 km/jam. Total waktu 2,5 jam. Jarak saat 60 km/jam adalah ...",
  opsi:["90 km","100 km","120 km","150 km"],
  jawaban:"90 km"
},
{
  tanya:"Dua kota jarak 300 km. Mobil A berangkat 08.00 (60 km/jam) dan Mobil B 09.00 (80 km/jam). Mereka bertemu pukul ...",
  opsi:["10.30","11.00","11.30","12.00"],
  jawaban:"11.30"
},
{
  tanya:"(2x-3)² - (x+1)(x-5)=...",
  opsi:["3x² - 7x + 14","4x² - 7x + 14","3x² - 7x + 4","4x² - 7x + 4"],
  jawaban:"3x² - 7x + 14"
},
{
  tanya:"Jika 2x + 3y = 13, nilai x + y adalah ...",
  opsi:["3","4","5","6"],
  jawaban:"4"
},
{
  tanya:"Persamaan garis melalui (2,-1) dan (-4,5) adalah ...",
  opsi:["y = -x + 1","y = -x + 3","y = -x + 5","y = x + 1"],
  jawaban:"y = -x + 1"
},
{
  tanya:"Garis sejajar y = 3x − 7 dan melalui (1,4) adalah ...",
  opsi:["y = 3x + 1","y = 3x − 1","y = 3x + 4","y = 3x − 4"],
  jawaban:"y = 3x + 1"
},
{
  tanya:"Jika f(x)=2x²−3x+1, maka f(2a−1) = ...",
  opsi:["8a² − 14a + 6","8a² − 10a + 6","8a² − 14a + 4","4a² − 10a + 6"],
  jawaban:"8a² − 14a + 6"
},
{
  tanya:"Diketahui fungsi f(x)=2x+1. Jika f(a)=11 maka nilai a adalah ...",
  opsi:["4","5","6","7"],
  jawaban:"5"
}

];

// ===============================
// VARIABEL QUIZ
// ===============================
let index = 0;
let skor = 0;
let sudahJawab = false;

// ===============================
// MULAI QUIZ
// ===============================
function mulaiQuiz(){
  tampilSoal();
}

// ===============================
// TAMPILKAN SOAL
// ===============================
function tampilSoal(){

  if(index >= soal.length){
    document.querySelector(".box").style.display="none";
    document.getElementById("hasil").style.display="block";
    document.getElementById("nilai").innerHTML = "Skor kamu : " + skor;
    return;
  }

  sudahJawab = false;

  document.getElementById("nomor").innerHTML =
  "Soal " + (index+1) + " / " + soal.length;

  document.getElementById("pertanyaan").innerHTML =
  soal[index].tanya;

  let pilihanHTML="";
  soal[index].opsi.forEach(pil => {
    pilihanHTML += `<button onclick="jawab(this,'${pil}')">${pil}</button><br><br>`;
  });

  document.getElementById("nilai").innerHTML = "Skor kamu : " + skor;

// minta nama peserta
let nama = prompt("Masukkan nama kamu untuk leaderboard");

// kirim ke google sheet
fetch("PASTE_URL_WEB_APP_DISINI", {
  method: "POST",
  body: JSON.stringify({
    nama: nama,
    skor: skor
  })
});
}

// ===============================
// JAWAB SOAL
// ===============================
function jawab(btn, pilihan){

  if(sudahJawab) return;
  sudahJawab = true;

  if(pilihan == soal[index].jawaban){
    skor += 10;
    btn.style.background="green";
    btn.style.color="white";
  }else{
    skor -= 5;
    btn.style.background="red";
    btn.style.color="white";
  }

  setTimeout(()=>{
    index++;
    tampilSoal();
  },800);
}
