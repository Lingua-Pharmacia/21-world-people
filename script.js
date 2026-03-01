const splash = document.getElementById('splash-screen'), instr = document.getElementById('instructions-screen'),
      app = document.getElementById('main-app'), grid = document.getElementById('stations-grid'),
      playerZone = document.getElementById('player-zone'), audio = document.getElementById('audio-player'),
      transcript = document.getElementById('transcript-box'), popup = document.getElementById('translation-popup'),
      gameZone = document.getElementById('game-zone'), gameBoard = document.getElementById('game-board'),
      feedbackArea = document.getElementById('quiz-feedback-area'), ptsVal = document.getElementById('points-val');

// PERSISTENCE (Specific to Cultures App)
let lifetimeScore = parseInt(localStorage.getItem('culturesScore')) || 0;
let completedLessons = JSON.parse(localStorage.getItem('completedCulturesLessons')) || [];
if(ptsVal) ptsVal.innerText = lifetimeScore;

let wordBucket = []; let currentQ = 0; let attempts = 0; let totalScore = 0; let firstCard = null;

// STATIONS (Matching the exact Colab audio output)
const stations = [
    {file:"01_Ainu.mp3", title:"Ainu"},
    {file:"02_Badjao.mp3", title:"Badjao"},
    {file:"03_Basque.mp3", title:"Basque"},
    {file:"04_Bedouin.mp3", title:"Bedouin"},
    {file:"05_Berbers.mp3", title:"Berbers/Amazigh"},
    {file:"06_Copts.mp3", title:"Copts"},
    {file:"07_Dogon.mp3", title:"Dogon"},
    {file:"08_Gauchos.mp3", title:"Gauchos"},
    {file:"09_Hadza.mp3", title:"Hadza"},
    {file:"10_Himba.mp3", title:"Himba"},
    {file:"11_HuliWigmen.mp3", title:"Huli Wigmen"},
    {file:"12_Kalash.mp3", title:"Kalash"},
    {file:"13_KazakhNomads.mp3", title:"Kazakh Nomads"},
    {file:"14_Khasi.mp3", title:"Khasi"},
    {file:"15_LappsSami.mp3", title:"Lapps/Sami"},
    {file:"16_Maasai.mp3", title:"Maasai"},
    {file:"17_Quechua.mp3", title:"Quechua"},
    {file:"18_Sherpa.mp3", title:"Sherpa"},
    {file:"19_Toraja.mp3", title:"Toraja"},
    {file:"20_Tuareg.mp3", title:"Tuareg"},
    {file:"21_Zulu.mp3", title:"Zulu"}
];

stations.forEach((s, i) => {
    const btn = document.createElement('div'); btn.className = 'station-tile';
    if(completedLessons.includes(s.file)) btn.classList.add('completed');
    btn.innerHTML = `<b>${i + 1}</b> ${s.title}`;
    btn.onclick = () => { 
        grid.classList.add('hidden'); playerZone.classList.remove('hidden'); 
        document.getElementById('now-playing-title').innerText = s.title; 
        audio.src = s.file; wordBucket = []; 
    };
    grid.appendChild(btn);
});

document.getElementById('btn-start').onclick = () => { splash.classList.add('hidden'); instr.classList.remove('hidden'); };
document.getElementById('btn-enter').onclick = () => { instr.classList.add('hidden'); app.classList.remove('hidden'); };
document.getElementById('btn-back').onclick = () => { location.reload(); };

document.getElementById('ctrl-play').onclick = () => audio.play();
document.getElementById('ctrl-pause').onclick = () => audio.pause();
document.getElementById('ctrl-stop').onclick = () => { audio.pause(); audio.currentTime = 0; };
document.getElementById('btn-blind').onclick = () => { transcript.classList.add('hidden'); gameZone.classList.add('
