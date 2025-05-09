const audio = document.getElementById("bgm");
const titleDisplay = document.getElementById("music-title");
const currentTimeSpan = document.getElementById("currentTime");
const durationSpan = document.getElementById("duration");
const playPauseBtn = document.getElementById("playPauseBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const slider = document.getElementById("volumeSlider");
const muteIcon = document.getElementById("muteIcon");

const playlist = [
  { title: "愛にできることはまだあるかい", src: "ainidekirukotohamadaarukai.mp3" },
      { title: "スパークル", src: "supa-kuru.mp3" },
      { title: "ダーリン", src: "da-rin.mp3"},
      { title: "幾億光年", src: "ikuokukounenn.mp3"},
      { title: "bring-bang-bang-born", src: "bring.mp3"},
      { title: "タイムパラドックス", src: "taimuparadokkusu.mp3"},
      { title: "APT", src: "APT.mp3"},
      { title: "晩餐歌", src: "bansanka.mp3"},
          { title: "ライラック", src: "rairakku.mp3"},
  { title: "はいよろこんで", src: "haiyorokonnde.mp3"},
  { title: "最上級にかわいいの", src: "saijoukyuu.mp3"},
  { title: "怪獣の花唄", src: "kaijuunohanauta.mp3"},
  { title: "ドライフラワー", src: "doraifurawa-.mp3"},
  { title: "マリーゴールド", src: "mari-go-rudo.mp3"},
  { title: "アイドル", src: "aidoru.mp3"},
  { title: "life force", src: "lifeforce.mp3"},
  { title: "oiiacat", src: "oiiacat.mp3"},
  { title: "soranji", src: "soranji.mp3"},
  { title: "僕のこと", src: "bokunokoto.mp3"},
  { title: "残酷な天使のテーゼ", src: "zannkokunatennsinote-ze.mp3"},
  { title: "唱", src: "shou.mp3"},
  { title: "元彼女のみなさまへ", src: "motokanojonominasamahe.mp3"},
  { title: "勇者", src: "yuusha.mp3"},
  { title: "ケセラセラ", src: "keserasera.mp3"},
  { title: "鬼の宴", src: "oninoutage.mp3"},
  { title: "バニーガール", src: "bani-ga-ru.mp3"},
  { title: "", src: ""},
  { title: "", src: ""},
  { title: "", src: ""},
  { title: "", src: ""},
  { title: "", src: ""},
  { title: "", src: ""},
  { title: "", src: ""},
  { title: "", src: ""},
  { title: "", src: ""},
  { title: "", src: ""},
  { title: "", src: ""},
  { title: "", src: ""},
  { title: "", src: ""},
  { title: "", src: ""},
  { title: "", src: ""},
  { title: "", src: ""},
  { title: "", src: ""},
  { title: "", src: ""},
  { title: "", src: ""},
  { title: "", src: ""},
  { title: "", src: ""},
  { title: "", src: ""},
  { title: "", src: ""},
  { title: "", src: ""},
  { title: "", src: ""},
  { title: "", src: ""},
  { title: "", src: ""},
  { title: "", src: ""},
  { title: "", src: ""},
  { title: "", src: ""},
  { title: "", src: ""},
  { title: "", src: ""},
  { title: "", src: ""},
  { title: "", src: ""},
  { title: "", src: ""},
  { title: "", src: ""},
  { title: "", src: ""},
  { title: "", src: ""},
];

let currentIndex = 0;
let isPlaying = true;

function loadTrack(index) {
  const track = playlist[index];
  audio.src = track.src;
  titleDisplay.textContent = `♪ ${track.title}`;
  playPauseBtn.textContent = "⏸";
  isPlaying = true;

  audio.load();

  // ★ここで再生処理を canplaythrough に移動
  audio.addEventListener("canplaythrough", function onReady() {
    audio.play();
    // イベントの多重登録を防ぐ
    audio.removeEventListener("canplaythrough", onReady);
  });
}


function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s < 10 ? '0' + s : s}`;
}

audio.addEventListener("loadedmetadata", () => {
  durationSpan.textContent = formatTime(audio.duration);
});

audio.addEventListener("timeupdate", () => {
  currentTimeSpan.textContent = formatTime(audio.currentTime);
});

playPauseBtn.addEventListener("click", () => {
  if (!audio.paused) {
    audio.pause();
    playPauseBtn.textContent = "▶️";
    isPlaying = false;
  } else {
    audio.play();
    playPauseBtn.textContent = "⏸";
    isPlaying = true;
  }
});

nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % playlist.length;
  loadTrack(currentIndex);
});

prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + playlist.length) % playlist.length;
  loadTrack(currentIndex);
});

audio.addEventListener("ended", () => {
  nextBtn.click();
});

slider.addEventListener("input", () => {
  audio.volume = slider.value;
  muteIcon.className = slider.value === "0"
    ? 'bx bx-volume-mute volume-icon'
    : 'bx bx-volume-full volume-icon';
});

muteIcon.addEventListener("click", () => {
  if (audio.muted || audio.volume === 0) {
    audio.muted = false;
    audio.volume = slider.value = 1;
    muteIcon.className = 'bx bx-volume-full volume-icon';
  } else {
    audio.muted = true;
    slider.value = 0;
    audio.volume = 0;
    muteIcon.className = 'bx bx-volume-mute volume-icon';
  }
});






// 初期読み込み
window.addEventListener("DOMContentLoaded", () => {
  loadTrack(currentIndex);
});
