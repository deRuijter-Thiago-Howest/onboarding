// #region ***  DOM references                           ***********
import * as lottie from 'lottie-web';
import welkom from '../lotties/frame-1.json';
import frame2 from '../lotties/frame-2.json';
import frame3 from '../lotties/frame-3.json';
import frame4 from '../lotties/frame-4.json';
import frame5 from '../lotties/frame-5.json';

let lottieAnimation2;
let lottieAnimation3;
let lottieAnimation4;
let lottieAnimation5;
let playedScreen1 = false;
let playedScreen2 = false;
let playedScreen3 = false;
let playedScreen4 = false;

// #endregion

// #region ***  Callback-Visualisation - show___         ***********
const updateBallIndicators = () => {
  const gsm = document.querySelector('.c-gsm');
  const currentScreen = Math.round(gsm.scrollLeft / gsm.clientWidth);

  const screens = document.querySelectorAll('.c-scherm-a');
  for (const screen of screens) {
    const balls = screen.querySelectorAll('.c-scherm-a__ball');
    let ballIndex = 0;
    for (const ball of balls) {
      ball.classList.toggle('c-scherm-a__ball--active', ballIndex === currentScreen - 1);
      ballIndex++;
    }
  }

  const navigation = document.querySelector('.c-scherm-a__btns');
  if (navigation) {
    if (currentScreen === 0) {
      navigation.style.opacity = '0';
      navigation.style.pointerEvents = 'none';
    } else if (currentScreen === 4) {
      navigation.style.opacity = '0';
      navigation.style.pointerEvents = 'none';
    } else {
      navigation.style.opacity = '1';
      navigation.style.pointerEvents = 'auto';
    }
  }

  if (currentScreen === 1 && !playedScreen1 && lottieAnimation2) {
    playedScreen1 = true;
    lottieAnimation2.play();
  } else if (currentScreen === 2 && !playedScreen2 && lottieAnimation3) {
    playedScreen2 = true;
    lottieAnimation3.play();
  } else if (currentScreen === 4 && !playedScreen4 && lottieAnimation5) {
    playedScreen4 = true;
    lottieAnimation5.play();
  } else if (currentScreen === 3 && !playedScreen3 && lottieAnimation4) {
    playedScreen3 = true;
    lottieAnimation4.play();
  }
};
// #endregion

// #region ***  Callback-No Visualisation - callback___  ***********
// #endregion

// #region ***  Data Access - get___                     ***********
// #endregion

// #region ***  Event Listeners - listenTo___            ***********
const nextButtonsListener = () => {
  const nextButtons = document.querySelectorAll('.js-next');
  for (const next of nextButtons) {
    next.addEventListener('click', (e) => {
      e.preventDefault();
      const gsm = document.querySelector('.c-gsm');
      gsm.scrollBy({
        left: gsm.clientWidth,
        behavior: 'smooth',
      });
      setTimeout(updateBallIndicators, 300);
    });
  }
};

const beforeButtonsListener = () => {
  const beforeButtons = document.querySelectorAll('.js-before');
  for (const before of beforeButtons) {
    before.addEventListener('click', (e) => {
      e.preventDefault();
      const gsm = document.querySelector('.c-gsm');
      gsm.scrollBy({
        left: -gsm.clientWidth,
        behavior: 'smooth',
      });
      setTimeout(updateBallIndicators, 300);
    });
  }
};
// #endregion

// #region ***  Init / DOMContentLoaded                  ***********
const init = () => {
  console.log('buttons.js loaded');
  nextButtonsListener();
  beforeButtonsListener();

  const gsm = document.querySelector('.c-gsm');
  gsm.addEventListener('scroll', updateBallIndicators);
  gsm.addEventListener('scrollend', updateBallIndicators);

  document.querySelector('.js-submit-animation--1').classList.remove('u-hidden');
  const lottieAnimation = lottie.loadAnimation({
    container: document.querySelector('.js-submit-animation--1'),
    animationData: welkom,
    renderer: 'svg',
    loop: true,
    autoplay: true,
  });
  lottieAnimation.play();

  document.querySelector('.js-submit-animation--2').classList.remove('u-hidden');
  lottieAnimation2 = lottie.loadAnimation({
    container: document.querySelector('.js-submit-animation--2'),
    animationData: frame2,
    renderer: 'svg',
    loop: true,
    autoplay: false,
  });

  document.querySelector('.js-submit-animation--3').classList.remove('u-hidden');
  lottieAnimation3 = lottie.loadAnimation({
    container: document.querySelector('.js-submit-animation--3'),
    animationData: frame3,
    renderer: 'svg',
    loop: true,
    autoplay: false,
  });

  document.querySelector('.js-submit-animation--5').classList.remove('u-hidden');
  lottieAnimation5 = lottie.loadAnimation({
    container: document.querySelector('.js-submit-animation--5'),
    animationData: frame5,
    renderer: 'svg',
    loop: true,
    autoplay: true,
  });
  document.querySelector('.js-submit-animation--4').classList.remove('u-hidden');
  lottieAnimation4 = lottie.loadAnimation({
    container: document.querySelector('.js-submit-animation--4'),
    animationData: frame4,
    renderer: 'svg',
    loop: true,
    autoplay: true,
  });

  const navigation = document.querySelector('.c-scherm-a__btns');
  if (navigation) {
    navigation.style.opacity = '0';
    navigation.style.pointerEvents = 'none';
  }
};

document.addEventListener('DOMContentLoaded', init);
// #endregion
