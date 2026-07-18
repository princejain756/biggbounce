(() => {
  const video = document.getElementById("trailer");
  const playBtn = document.getElementById("playBtn");
  if (!video || !playBtn) return;

  const hidePlay = () => playBtn.classList.add("is-hidden");
  const showPlay = () => playBtn.classList.remove("is-hidden");

  // Soft muted autoplay for atmosphere; tap unlocks sound.
  const tryAutoplay = async () => {
    try {
      video.muted = true;
      await video.play();
    } catch {
      // Autoplay blocked — wait for user tap.
    }
  };

  playBtn.addEventListener("click", async () => {
    try {
      video.muted = false;
      video.currentTime = 0;
      await video.play();
      hidePlay();
    } catch (err) {
      console.error(err);
    }
  });

  video.addEventListener("play", () => {
    if (!video.muted) hidePlay();
  });

  video.addEventListener("pause", () => {
    if (!video.ended) showPlay();
  });

  video.addEventListener("click", async () => {
    if (video.paused) {
      video.muted = false;
      await video.play();
      hidePlay();
    } else if (!video.muted) {
      video.pause();
      showPlay();
    } else {
      video.muted = false;
      hidePlay();
    }
  });

  tryAutoplay();
})();
