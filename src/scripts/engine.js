const state = {
  view: {
    squares: document.querySelectorAll(".square"),
    enemy: document.querySelector(".enemy"),
    timeLeft: document.querySelector("#time-left"),
    score: document.querySelector("#score"),
    lives: document.querySelector("#lives"),
    restartBtn: document.querySelector("#restart"),
  },
  value: {
    timerId: null, // this could also work as an action by replacing the neeed of moveEnemy() function and use only: timerId: setInterval(randomSquare, 1000)
    gameVelocity: 500,
    hitPosition: 0,
    result: 0,
    currentTime: 10,
    numberLives: 3,
  },
  actions: {
    check: console.log("actions"),
    //timerId: setInterval(randomSquare, 1000), // enemy's location!
    countDownTimerId: setInterval(countDown, 1000),
    resultLives: setInterval(countLives, 1000),
  },
};

function countLives() {
  console.log("countLives");

  if (state.value.currentTime === 9 && state.value.result === 0) {
    state.value.numberLives--;
    state.view.lives.textContent = `x${state.value.numberLives}`;
  } else if (state.value.currentTime === 7 && state.value.result < 4) {
    state.value.numberLives--;
    state.view.lives.textContent = `x${state.value.numberLives}`;
  } else if (state.value.currentTime === 6 && state.value.result < 6) {
    state.value.numberLives--;
    state.view.lives.textContent = `x${state.value.numberLives}`;
  } else if (state.value.currentTime === 2 && state.value.result < 14) {
    if (state.value.numberLives > 0) {
      state.value.numberLives--;
      state.view.lives.textContent = `x${state.value.numberLives}`;
    }
  }

  if (state.value.currentTime <= 0) {
    clearInterval(state.actions.resultLives);
  }
}

function countDown() {
  console.log(state.value.currentTime);
  state.value.currentTime--;
  state.view.timeLeft.textContent = state.value.currentTime;

  if (state.value.currentTime <= 0) {
    if (state.value.numberLives === 0 && state.value.result < 18) {
      alert(
        `Game Over! O número de vidas é: ${state.value.numberLives} e seu score foi: ${state.value.result}`
      );
    } else if (state.value.numberLives >= 1) {
      alert(`Time's Over! Você venceu, o seu score foi: ${state.value.result}`);
    }

    // clear the intervals from memory to reset the calls
    clearInterval(state.actions.countDownTimerId);
    clearInterval(state.value.timerId); //will this work without making it an actions attribute?
  }
}

function moveEnemy() {
  state.value.timerId = setInterval(randomSquare, state.value.gameVelocity);
}

function randomSquare() {
  state.view.squares.forEach((square) => {
    square.classList.remove("enemy");
  });

  let randomNumber = Math.floor(Math.random() * 9);
  let randomSquare = state.view.squares[randomNumber];
  randomSquare.classList.add("enemy");
  state.value.hitPosition = randomSquare.id;
}

// function playSound() {
//   let audio = new Audio("./src/audios/audios/hit.m4a");
//   audio.volume = 0.2;
//   audio.play();
// }

// to make this function reusable (dynamic) in case there's more audios!
function playSound(audioName) {
  let audio = new Audio(`./src/audios/audios/${audioName}.m4a`);
  audio.volume = 0.2;
  audio.play();
}

function addListenerHitBox() {
  state.view.squares.forEach((square) => {
    square.addEventListener("mousedown", () => {
      if (square.id === state.value.hitPosition) {
        state.value.result++;
        state.view.score.textContent = state.value.result;
        state.value.hitPosition = null;
        playSound("hit");
      }
    });
  });
}

state.view.restartBtn.addEventListener("click", () => {
  window.location.reload();
});

function init() {
  moveEnemy();
  addListenerHitBox();
}

window.addEventListener("load", init);

// init();
// console.log("after init");
if (state.value.numberLives === 0) {
  console.log("here");
}
// while (state.value.numberLives) {
//   init();
// }
