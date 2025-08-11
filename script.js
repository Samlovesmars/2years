window.onload = () => {
  const mainLantern = document.getElementById('mainLantern');
  const message = document.getElementById('message');
  const sky = document.getElementById('sky');
  const water = document.getElementById('water');
  const usedPositions = [];

  // Trigger the main lantern glow
  setTimeout(() => {
    mainLantern.style.opacity = 1;
    setTimeout(() => {
      message.style.opacity = 1;
    }, 10000);
  }, 1000);

  // Generate unique random X position
  function getUniqueX() {
    let x;
    do {
      x = Math.floor(Math.random() * 80) + 10;
    } while (usedPositions.includes(x));
    usedPositions.push(x);
    return x;
  }

  function spawnLantern(delay) {
    setTimeout(() => {
      const x = getUniqueX();

      // Lantern in sky
      const lantern = document.createElement('div');
      lantern.className = 'lantern bg-lantern';
      lantern.style.left = `${x}%`;
      lantern.style.bottom = '0%';
      sky.appendChild(lantern);

      // Reflection in water
      const reflection = document.createElement('div');
      reflection.className = 'lantern lantern-reflection';
      reflection.style.left = `${x}%`;
      reflection.style.bottom = '0%';
      water.appendChild(reflection);
    }, delay);
  }

  // Add 8 lanterns staggered over ~12s
  const intervals = [0, 1500, 3500, 5500, 7000, 8500, 10000, 12000];
  intervals.forEach((t) => spawnLantern(t));
};

window.addEventListener("load", () => {
  const audio = document.getElementById("bgMusic");
  const message = document.getElementById("message");

  audio.volume = 1;
  audio.muted = true; // start muted so autoplay works
  audio.currentTime = 104; // start at 1:44

  setTimeout(() => {
    audio.play().then(() => {
      // Unmute just after it starts
      setTimeout(() => { audio.muted = false; }, 200);
    }).catch(err => console.warn("Autoplay blocked:", err));
  }, 4000); // start 4s after page load
  audio.addEventListener("timeupdate", () => {
    // Stop at 1:53
    
    if (audio.currentTime >= 118) {
      audio.pause();
    }
    // Show message at 1:50
    if (audio.currentTime >= 110 && message.style.opacity === "0") {
      message.style.opacity = 1;
    }
  });
});