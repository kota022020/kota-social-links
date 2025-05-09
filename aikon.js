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
  { title: "愛にできることはまだあるかい", src: "愛にできることはまだあるかい.mp3" },
  { title: "スパークル", src: "スパークル.mp3" },
  { title: "ダーリン", src: "ダーリン.mp3" },
  { title: "幾億光年", src: "幾億光年.mp3" },
  { title: "bring-bang-bang-born", src: "bring-bang-bang-born.mp3"},
  { title: "タイムパラドックス", src: "タイムパラドックス.mp3"},
  { title: "APT", src: "APT.mp3"},
  { title: "晩餐歌", src: "晩餐歌.mp3"},
  { title: "ライラック", src: "ライラック.mp3"},
  { title: "はいよろこんで", src: "はいよろこんで.mp3"},
  { title: "最上級にかわいいの", src: "最上級にかわいいの.mp3"},
  { title: "怪獣の花唄", src: " 怪獣の花唄.mp3"},
  { title: "ドライフラワー", src: " ドライフラワー.mp3"},
  { title: "マリーゴールド", src: " マリーゴールド.mp3"},
  { title: "アイドル", src: "アイドル.mp3"},
  { title: "life force", src: " life force.mp3"},
  { title: "oiiacat", src: " oiiacat.mp3"},
  { title: "soranji", src: " soranji.mp3"},
  { title: "僕のこと", src: " 僕のこと.mp3"},
  { title: "残酷な天使のテーゼ", src: " 残酷な天使のテーゼ.mp3"},
  { title: "唱", src: " 唱.mp3"},
  { title: "元彼女のみなさまへ", src: " 元彼女のみなさまへ.mp3"},
  { title: "勇者", src: "勇者.mp3"},
  { title: "ケセラセラ", src: "ケセラセラ.mp3"},
  { title: "鬼の宴", src: " 鬼の宴.mp3"},
  { title: "バニーガール", src: " バニーガール.mp3"},
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
