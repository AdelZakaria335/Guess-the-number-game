const slider = document.querySelector(".start input");
const emojies = document.querySelectorAll(".start .emoji");
const difficulties = document.querySelectorAll(".start .difficulty"); 
const hide = document.querySelectorAll(".start *");
const start = document.querySelector(".start");
const typing = new Audio("sounds/typing.mp3");
const flicker = new Audio("sounds/flicker.mp3");
const scream = new Audio("sounds/scream.mp3");
const jumpscare = document.createElement("video");
jumpscare.src = "videos/jumpscare.mp4";
jumpscare.muted = true;
jumpscare.loop = false;
jumpscare.autoplay = true;
const music = new Audio("sounds/music.mp3");
music.loop = true;
let lives;
let games;
let victories;
function rotate() {
  if (window.innerHeight > window.innerWidth) {
    let warning = document.createElement("div");
    warning.classList.add("warning");
    warning.style.cssText = "display: flex; justify-content: center; align-items: center; flex-direction: column; width:   100vw; height: 100vh; background: gray; z-index: 1000000; position: absolute; top: 0; left: 0";
    let icon = document.createElement("i");
    icon.className = "fa-solid fa-mobile-screen-button";
    icon.style.cssText = "font-size: 50px; color: white; animation: rotate 2s infinite linear"
    warning.appendChild(icon);
    let warningHead = document.createElement("h1");
    warningHead.style.color = "#eee";
    warningHead.style.fontFamily = "'Comic Neue"
    let warningTxt = document.createTextNode("Please rotate your mobile");
    warning.appendChild(warningHead);
    warningHead.appendChild(warningTxt);
    document.body.appendChild(warning);
  } else {
    if (document.querySelector(".warning")) { document.querySelector(".warning").remove() }
  }
}
if (/Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent)) {
  rotate()
  window.addEventListener("resize", () => {
    rotate()
  })
}
if (localStorage.getItem("games")) {
  games = +localStorage.getItem("games");
  document.getElementById("games").textContent = localStorage.getItem("games");
} else {games = 0}
if (localStorage.getItem("victories")) {
  victories = +localStorage.getItem("victories");
  document.getElementById("victories").textContent = localStorage.getItem("victories");
} else {victories = 0}

function sliderControl(array) {
  array.forEach((e) => {
    if (slider.value == e.dataset.num) {
      array.forEach((e) => {
        e.style.display = "none";
      })
      e.style.display = "inline-block";
    }
  })
}
function typeWriter(text, parent) {
  const element = document.createElement("h1");
  element.style.color = "green";
  parent.appendChild(element);
  
  let i = 0;
  
  function write() {
    if (i < text.length) {
      element.textContent += text[i];
      if (typing.currentTime > 0) {
        typing.pause();
        typing.currentTime = 0;
      }
      typing.play();
      i++;
      setTimeout(write, 50);
    }
  }
  
  write();
}
sliderControl(emojies);
sliderControl(difficulties);
switch (slider.value) {
  case '1':
    slider.style.accentColor = "green"
    break;
  case '2':
    slider.style.accentColor = "yellow"
    break;
  case '3':
    slider.style.accentColor = "red"
    break;
}

slider.oninput = () => {
  sliderControl(emojies);
  sliderControl(difficulties);
  switch (slider.value) {
    case '1':
      slider.style.accentColor = "green"
      break;
    case '2':
      slider.style.accentColor = "yellow"
      break;
    case '3':
      slider.style.accentColor = "red"
      break;
  }
}
difficulties.forEach(e => {
  e.onclick = () => {
    games += 1;
    localStorage.setItem("games", games);
    start.style.transform = "translateX(60%)"
    hide.forEach(e => {
      e.style.transition = "1.5s";
      e.style.opacity = "0";
      setTimeout(() => {e.remove()}, 1500);
    })
    music.play();
    music.pause();
    flicker.play();
    flicker.pause();
    flicker.currentTime = 1.5;
    setTimeout(() => {start.style.cssText = "transform: translateX(0); transition: 1s"}, 3000);
    setTimeout(() => {typeWriter("Wait... something isn't right, is it?", start)}, 4000);
    setTimeout(() => {typeWriter("I'm ... scared.", start)}, 5850);
    setTimeout(() => {
      start.style.transition = "none";
      document.querySelectorAll(".start h1").forEach((e) => {e.style.cssText = "color: red; font-family: 'creepster'"});
      start.classList.add("horror")}, 7100);
      setTimeout(() => {flicker.play()}, 7100)
      setTimeout(() => {
      document.querySelectorAll(".start h1").forEach((e) => {e.style.cssText = "color: green; font-family: 'Comic Neue'"});
      start.classList.remove("horror")}, 7750);
      setTimeout(() => {
      start.style.transition = "none";
      document.querySelectorAll(".start h1").forEach((e) => {e.style.cssText = "color: red; font-family: 'Creepster'"});
      start.classList.add("horror")}, 7900);
      setTimeout(() => {document.querySelectorAll(".start h1").forEach((e) => {
        e.remove()});
        flicker.pause();
        document.querySelector(".world").remove();
      }, 9000)
      setTimeout(() => {
        start.style.transition = "4s ease";
        start.style.opacity = "0";
        music.play();
        music.volume = .3;
        music.playbackRate = .7;
      }, 9100)
      setTimeout(() => {start.remove();
      }, 13100);
      lives = +e.dataset.lives;
      document.getElementById("lives").textContent = lives;
  }
});
const input = document.querySelector("input[type='number']");
const hints = document.querySelector(".hints");
const random = Math.floor(Math.random() * 100 + 1);
const containers = document.querySelectorAll(".container");
const eye = document.querySelector(".eye");

document.addEventListener("mousemove", (e) => {
  containers.forEach((c) => {
    const cRect = c.getBoundingClientRect();
    const centerx = cRect.left + cRect.width / 2;
    const centery = cRect.top + cRect.height / 2;
    const angle = Math.atan2(e.clientY - centery, e.clientX - centerx);
    const distance = Math.min(eye.offsetWidth / 6, Math.sqrt(Math.pow(e.clientY - centery, 2) + Math.pow(e.clientX - centerx, 2)));
    const movex = Math.cos(angle) * distance;
    const movey = Math.sin(angle) * distance;
    document.querySelector(`.eye${c.dataset.class}`).style.transform = `translate(-50%, -50%) translate(${movex}px, ${movey}px)`;
  })
})
input.oninput = () => {
  if (+input.value > 100) {
    input.value = "100";
  }
}
input.onblur = () => {
  scream.play();
  scream.pause();
  let x = +document.getElementById("lives").textContent;
  if (input.value == 0 || input.value === "") {
    input.focus()
    input.style.transform = "rotate(10deg)";
    setTimeout( () => {input.style.transform = "rotate(-10deg)"}, 100);
    setTimeout( () => {input.style.transform = "rotate(10deg)"}, 200);
    setTimeout( () => {input.style.transform = "rotate(-10deg)"}, 300);
    setTimeout( () => {input.style.transform = "rotate(0deg)"}, 400);
  } else if (+input.value > random) {
    if (1 - music.volume < .3) {
      music.volume += 1 - music.volume;
    } else {music.volume += .3};
    if (music.playbackRate !== 1.3) {
      music.playbackRate += .1;
    }
    let hint = document.createElement("p");
    let hintTxt = document.createTextNode("Lower ️👇");
    hint.appendChild(hintTxt);
    document.querySelector(".hints").appendChild(hint);
    x--;
    document.getElementById("lives").textContent = x;
    if (x === 0) {
      const darkness = document.createElement("div");
      document.body.appendChild(darkness);
      const light = document.querySelector(".light");
      let hint = document.createElement("p");
      let hintTxt = document.createTextNode("You died 💀");
      hint.appendChild(hintTxt);
      document.querySelector(".hints").appendChild(hint);
      hint.style.color = "gray";
      setTimeout( () => {darkness.style.cssText = "width: 100vw; height: 100vh; position: absolute; top: 0; left: 0; background: black; z-index: 1000";
      light.style.opacity = "0";
        flicker.play();
      }, 1000)
      setTimeout( () => {darkness.style.opacity = "0";
        light.style.opacity = ".5";
      }, 1200)
      setTimeout(() => {
        darkness.style.opacity = "1";
        light.style.opacity = "0";
      }, 1400);
      setTimeout(() => {
        darkness.style.opacity = "0";
        light.style.opacity = ".5";
      }, 1600)
      setTimeout(() => {
        darkness.style.transition = "2s";
        light.style.transition = "2s";
        darkness.style.opacity = "1";
        light.style.opacity = "0";
      }, 2000);
      setTimeout(() => {flicker.pause();
        darkness.appendChild(jumpscare);
        jumpscare.style.cssText = "width: 80vw; position: absolute; bottom: 5%; left: 10vw";
      }, 4200)
      setTimeout(() => {scream.play().then(console.log("Done")).catch(e => console.log(e))}, 5200);
      setTimeout(() => {jumpscare.remove()}, 6200);
      setTimeout(() => {location.reload()}, 7200);
    }
  } else if (+input.value < random) {
    if (1 - music.volume < .3) {
    music.volume += 1 - music.volume;
    } else { music.volume += .3 };
    if (music.playbackRate !== 1.3) {
      music.playbackRate += .2;
     }
    let hint = document.createElement("p");
    let hintTxt = document.createTextNode("Higher 👆");
    hint.appendChild(hintTxt);
    document.querySelector(".hints").appendChild(hint);
    hint.style.color = "orange";
    x--;
    document.getElementById("lives").textContent = x;
    if (x === 0) {
      const darkness = document.createElement("div");
      document.body.appendChild(darkness);
      const light = document.querySelector(".light");
      let hint = document.createElement("p");
      let hintTxt = document.createTextNode("You died 💀");
      hint.appendChild(hintTxt);
      document.querySelector(".hints").appendChild(hint);
      hint.style.color = "gray";
      setTimeout( () => {darkness.style.cssText = "width: 100vw; height: 100vh; position: absolute; top: 0; left: 0; background: black; z-index: 1000";
      light.style.opacity = "0";
        flicker.play();
      }, 1000)
      setTimeout( () => {darkness.style.opacity = "0";
        light.style.opacity = ".5";
      }, 1200)
      setTimeout(() => {
        darkness.style.opacity = "1";
        light.style.opacity = "0";
      }, 1400);
      setTimeout(() => {
        darkness.style.opacity = "0";
        light.style.opacity = ".5";
      }, 1600)
      setTimeout(() => {
        darkness.style.transition = "2s";
        light.style.transition = "2s";
        darkness.style.opacity = "1";
        light.style.opacity = "0";
      }, 2000);
      setTimeout(() => {flicker.pause();
        darkness.appendChild(jumpscare);
        jumpscare.style.cssText = "width: 80vw; position: absolute; bottom: 5%; left: 10vw";
      }, 4200)
      setTimeout(() => {scream.play()}, 5200);
      setTimeout(() => {jumpscare.remove()}, 6200);
      setTimeout(() => {location.reload()}, 7200);
    }
  } else if (+input.value === random) {
    victories += 1;
    localStorage.setItem("victories", victories);
    let hint = document.createElement("p");
    let hintTxt = document.createTextNode("Correct ✔");
    hint.appendChild(hintTxt);
    document.querySelector(".hints").appendChild(hint);
    hint.style.color = "green";
    let end = document.createElement("div");
    document.body.appendChild(end);
    setTimeout(() => {
      end.style.cssText = "opacity: 0; background: lightblue; width: 100%; height: 100%; position: absolute; z-index: 1000; transition: .5s; top: 0; left: 0; display: flex; justify-content: center; align-items: center; flex-direction: column;";
    }, 1500);
    setTimeout(() => {end.style.opacity = "1";
      end.style.fontFamily = "comicNueue";
    }, 1600);
    setTimeout(() => {typeWriter("You survived this time", end)}, 2000);
    setTimeout(() => {typeWriter("But now ... you're free", end)}, 3200);
    setTimeout(() => {location.reload()}, 4900);
  }
  input.value = "";
  document.querySelector(".hints").scrollTop = document.querySelector(".hints").scrollHeight;
}
