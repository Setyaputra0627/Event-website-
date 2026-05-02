// ================= LOGIN CEK =================
function cekLogin(){
  if(localStorage.getItem("username") == null){
    window.location = "index.html";
  }
}

// ================= DATA SOAL =================
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
  tanya:"Diketahui fungsi f(x)=2x+1
Jika f(a)=11,maka nilai a adalah?=... ...",
  opsi:["4","5","6","7"],
  jawaban:"5"
}

];

// ================= MULAI QUIZ =================
function mulaiQuiz(){
  tampilSoal();
}

function tampilSoal(){
  let q = soal[no];
  document.getElementById("q").innerHTML = "Soal " + (no+1);

  let pilihanHTML = "";
  for(let i=0;i<q.opsi.length;i++){
    pilihanHTML += `<button onclick="jawab(this,'${q.opsi[i]}')">${q.opsi[i]}</button><br><br>`;
  }
  document.getElementById("pilihan").innerHTML = pilihanHTML;
}

// ================= JAWAB =================
function jawab(btn, pilihanUser){
  let jawabanBenar = soal[no].jawaban;
  let semuaTombol = document.querySelectorAll("#pilihan button");

  // matikan semua tombol biar ga bisa klik ulang
  semuaTombol.forEach(b => b.disabled = true);

  // tombol yang dipilih selalu jadi HIJAU (tanda sudah dijawab)
  btn.style.background = "green";
  btn.style.color = "white";

  // hitung skor
  if(pilihanUser == jawabanBenar){
    score += 10;
  }else{
    score -= 5;
  }

  // pindah soal setelah 1 detik
  setTimeout(()=>{
    no++;
    if(no < soal.length){
      tampilSoal();
    }else{
      selesaiQuiz();
    }
  },1000);
}

// ================= SELESAI =================
function selesaiQuiz(){
  document.getElementById("quiz").style.display = "none";
  document.getElementById("hasil").style.display = "block";

  let nilaiAkhir = score;
  document.getElementById("nilai").innerHTML =
  "Skor kamu : <b>" + nilaiAkhir + "</b>";
}

// ================= KIRIM KE GOOGLE SHEET =================
function kirimSkor(nama, skor){
  fetch("PASTE_URL_WEB_APP_KAMU_DISINI", {
    method: "POST",
    body: JSON.stringify({ nama:nama, skor:skor })
  })
  .then(res => res.json())
  .then(data => alert("Skor berhasil masuk leaderboard!"));
}

function kirimDanSelesai(){
  let namaUser = localStorage.getItem("username");
  kirimSkor(namaUser, score);
}