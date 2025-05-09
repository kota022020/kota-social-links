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
 
{ title: "APT", src: "https://files.catbox.moe/7og375.mp3"},
{ title: "bring-barn-barn-born", src: "https://files.catbox.moe/4skosa.mp3" },
{ title: "oiiacat", src: "https://files.catbox.moe/1u877v.mp3" },
{ title: "唱", src: "https://files.catbox.moe/f5ybg6.mp3" },
{ title: "lifeforce", src: "https://files.catbox.moe/nnqc6d.mp3" },
{ title: "soranji", src: "https://files.catbox.moe/p03bwe.mp3" },
{ title: "アイドル", src: "https://files.catbox.moe/ovghrt.mp3" },
{ title: "ケセラセラ", src: "https://files.catbox.moe/zzx0eo.mp3" },
{ title: "スパークル", src: "https://files.catbox.moe/aq6hmo.mp3" },
{ title: "ダーリン", src: "https://files.catbox.moe/twx49t.mp3" },
{ title: "マリーゴールド", src: "https://files.catbox.moe/06tu01.mp3" },
{ title: "バニーガール", src: "https://files.catbox.moe/9g6xtz.mp3" },
{ title: "はいよろこんで", src: "https://files.catbox.moe/juzvle.mp3" },
{ title: "ドライフラワー", src: "https://files.catbox.moe/lutp5e.mp3" },
{ title: "タイムパラドックス", src: "https://files.catbox.moe/gux4j3.mp3" },
{ title: "ライラック", src: "https://files.catbox.moe/bosyu8.mp3" },
{ title: "愛にできることはまだあるかい", src: "https://files.catbox.moe/wpuuli.mp3" },
{ title: "怪獣の花唄", src: "https://files.catbox.moe/92ao5a.mp3" },
{ title: "幾億光年", src: "https://files.catbox.moe/399ebq.mp3" },
{ title: "鬼の宴", src: "https://files.catbox.moe/2mlbox.mp3" },
{ title: "僕のこと", src: "https://files.catbox.moe/4su14j.mp3" },
{ title: "晩餐歌", src: "https://files.catbox.moe/0334i5.mp3" },
{ title: "残酷な天使のテーゼ", src: "https://files.catbox.moe/5ly1sp.mp3" },
{ title: "最上級に可愛いの", src: "https://files.catbox.moe/wbz7ni.mp3" },
{ title: "元彼女の皆様へ", src: "https://files.catbox.moe/y42ml5.mp3" },
{ title: "勇者", src: "https://files.catbox.moe/uvq7ux.mp3" },

];

let currentIndex = 0;
let isPlaying = true;

function loadTrack(index) {
  const track = playlist[index];
  audio.src = track.src;
  titleDisplay.textContent = `♪ ${track.title}`;
  playPauseBtn.textContent = "⏸";
  isPlaying = true;

  // 多重登録防止
  audio.removeEventListener("canplaythrough", onReady);

  function onReady() {
    audio.play().catch(err => {
      console.warn("再生失敗:", err);
    });
    audio.removeEventListener("canplaythrough", onReady);
  }

  audio.addEventListener("canplaythrough", onReady);
  audio.load();
}

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s < 10 ? "0" + s : s}`;
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
    audio.play().catch(err => {
      console.warn("再生失敗:", err);
    });
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
    ? "bx bx-volume-mute volume-icon"
    : "bx bx-volume-full volume-icon";
});

muteIcon.addEventListener("click", () => {
  if (audio.muted || audio.volume === 0) {
    audio.muted = false;
    audio.volume = slider.value = 1;
    muteIcon.className = "bx bx-volume-full volume-icon";
  } else {
    audio.muted = true;
    slider.value = 0;
    audio.volume = 0;
    muteIcon.className = "bx bx-volume-mute volume-icon";
  }
});

// 初期読み込み
window.addEventListener("DOMContentLoaded", () => {
  loadTrack(currentIndex);
});

// 🔍 検索処理
const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");

searchInput.addEventListener("input", () => {
  const keyword = searchInput.value.toLowerCase();
  searchResults.innerHTML = "";

  if (keyword.trim() === "") return;

  playlist.forEach((track, index) => {
    if (track.title.toLowerCase().includes(keyword)) {
      const li = document.createElement("li");
      li.textContent = track.title;
      li.style.cursor = "pointer";
      li.style.padding = "5px";
      li.style.borderBottom = "1px solid #ccc";
      li.addEventListener("click", () => {
        currentIndex = index;
        loadTrack(currentIndex);
        searchResults.innerHTML = "";
        searchInput.value = "";
      });
      searchResults.appendChild(li);
    }
  });
});
